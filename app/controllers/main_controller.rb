require 'date'
require 'active_support/core_ext' 

class MainController < ApplicationController

    KWH_PER_GALLON = 13.00
    DIESEL_PRICE = 5.00
    
    def index
        current_time = DateTime.now
        current_hour = current_time.strftime "2021-%m-%d %H:00:00"
        past_hour = (Time.parse(current_hour) - 60 * 60).strftime "%2021-%m-%d %H:00:00"
        @last_updated = current_time.strftime("%B #{current_time.day.ordinalize}, %Y at %l:00 %P AKST")

        ## Generation Breakdown Feature

        #Query database for data from the current hour
        @current_record_breakdown = GenerationBreakdown.find_by dateTime: past_hour
        @total_kwh = @current_record_breakdown.total.round(1)
        @renew_kwh = gon.renew_kwh = @current_record_breakdown.renew.round(1)
        @solar_kwh = gon.solar_kwh = @current_record_breakdown.solar.round(1)
        @wind_kwh = gon.wind_kwh = @current_record_breakdown.wind.round(1)
        @non_renew_kwh = @diesel_kwh = gon.diesel_kwh = @current_record_breakdown.nonRenew.round(1)

        #Calculate percentage of each energy source
        @renew_percent = calculatePercentage(@renew_kwh, @total_kwh)
        @non_renew_percent = calculatePercentage(@non_renew_kwh, @total_kwh)
        @solar_percent = gon.solar_percent = calculatePercentage(@solar_kwh, @total_kwh, true)
        @wind_percent = gon.wind_percent = calculatePercentage(@wind_kwh, @total_kwh)
        @diesel_percent = gon.diesel_percent = calculatePercentage(@non_renew_kwh, @total_kwh)


        ## Community Usage Feature
        start_of_day = current_time.strftime "%2021-%m-%d 00:00:00"
        gon.hourly_kwh_usage = GenerationBreakdown.where(dateTime: start_of_day..past_hour).select(:total, :id).order(:id)
        
        ## Battery Information Feature
        current_record_battery = Battery.find_by timestamp: current_hour
        past_hour_record_battery = Battery.find_by timestamp: past_hour
        #rounding to make charge lay within 0.1 when deciding the state
        @current_charge = current_record_battery.charge.round(1)
        @past_charge = past_hour_record_battery.charge.round(1)

        if @past_charge < @current_charge
            @battery_state = "Charging"
        elsif @past_charge > @current_charge
            @battery_state = "Discharging"
        else
            @battery_state = "Not charging"
        end

        ## Diesel Savings Feature
        @savings_dates = []
        savings_date_and_amount = []
        collected_data = GenerationBreakdown.where(dateTime: "2021-01-01 00:00:00"..past_hour)
        @curr_savings = @current_record_breakdown.year_total_renew
        
        # cycle through all dates
        collected_data.each do |record|
            # day and month 
            reading_time = record.dateTime.strftime("%e %b")
            @savings_dates.push reading_time
            @dollar_savings = (record.year_total_renew / KWH_PER_GALLON) * DIESEL_PRICE
            savings_formatted = {:x => reading_time, :y => @dollar_savings}
            savings_date_and_amount.push savings_formatted
        end
        gon.complete_savings_dates = @savings_dates
        gon.complete_savings = savings_date_and_amount

        @current_year = Date.today.strftime("%Y")

        # current monthly savings
        current_month = Date.today.strftime("%m")
        @current_month_str = Date.today.strftime("%B")
        current_month_data = GenerationBreakdown.where(dateTime: "2021-#{current_month}-01 00:00:00"..past_hour)
        current_month_kwh_savings = (current_month_data.last().year_total_renew) - (current_month_data.first().year_total_renew)
        @current_month_dollar_savings = (current_month_kwh_savings/KWH_PER_GALLON)*DIESEL_PRICE

        #daily savings
        @current_day = Date.today.strftime("%d")
        current_daily_data = GenerationBreakdown.where(dateTime: "2021-#{current_month}-#{@current_day} 00:00:00"..past_hour)
        current_daily_kwh_savings = (current_daily_data.last().year_total_renew) - (current_daily_data.first().year_total_renew)
        @current_daily_dollar_savings = (current_daily_kwh_savings/KWH_PER_GALLON)*DIESEL_PRICE
        @day_format = current_time.strftime("%B #{current_time.day.ordinalize}")

    end

    def calculatePercentage(numerator, denominator, renew = false)
        if renew
            percent = ((numerator/denominator) * 100).round(3)
        else
            percent = ((numerator/denominator) * 100).round(2)
        end

        return percent

    end

    #This function is bad and needs to not repeat code from above, just using to work on displaying chart data in dashboardCharts.js
    def chartData
        current_time = DateTime.now
        current_hour = current_time.strftime "2021-%m-%d %H:00:00"
        past_hour = (Time.parse(current_hour) - 60 * 60).strftime "%2021-%m-%d %H:00:00"

        @current_record_breakdown = GenerationBreakdown.find_by dateTime: past_hour
        solar_kwh = @current_record_breakdown.solar.round(1)
        wind_kwh = @current_record_breakdown.wind.round(1)
        diesel_kwh = @current_record_breakdown.nonRenew.round(1)

        @savings_dates = []
        savings_date_and_amount = []
        collected_data = GenerationBreakdown.where(dateTime: "2021-01-01 00:00:00"..past_hour)
        @curr_savings = @current_record_breakdown.year_total_renew
        
        # cycle through all dates
        collected_data.each do |record|
            # day and month 
            reading_time = record.dateTime.strftime("%e %b")
            @savings_dates.push reading_time
            @dollar_savings = (record.year_total_renew / KWH_PER_GALLON) * DIESEL_PRICE
            savings_formatted = {:x => reading_time, :y => @dollar_savings}
            savings_date_and_amount.push savings_formatted
        end

        respond_to do |format|
        format.json {
            render json: {wind_kwh: wind_kwh, solar_kwh: solar_kwh, diesel_kwh: diesel_kwh, labels: @savings_dates, savingsData: savings_date_and_amount}
        }
    end
end


end
