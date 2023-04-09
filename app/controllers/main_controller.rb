require 'date'

class MainController < ApplicationController

    KWH_PER_GALLON = 13.00
    DIESEL_PRICE = 5.00
    
    def index
        current_time = DateTime.now
        current_hour = current_time.strftime "%2021-%m-%d %H:00:00"
        past_hour = (Time.parse(current_hour) - 60 * 60).strftime "%2021-%m-%d %H:00:00"
        @last_updated = current_time.strftime("%B #{current_time.day.ordinalize}, %Y at %l:00 %P AKST")

        ## Generation Breakdown Feature

        #Query database for data from the current hour
        @current_record_breakdown = GenerationBreakdown.find_by dateTime: current_hour
        @total_kwh = @current_record_breakdown.total.round(1)
        @renew_kwh = gon.renew_kwh = @current_record_breakdown.renew.round(1)
        @solar_kwh = gon.solar_kwh = @current_record_breakdown.solar.round(1)
        @wind_kwh = gon.wind_kwh = @current_record_breakdown.wind.round(1)
        @non_renew_kwh = @diesel_kwh = gon.diesel_kwh = @current_record_breakdown.nonRenew.round(1)

        #Calculate percentage of each energy source
        @renew_percent = calculatePercentage(@renew_kwh, @total_kwh)
        @non_renew_percent = calculatePercentage(@non_renew_kwh, @total_kwh)
        @solar_percent = gon.solar_percent = calculatePercentage(@solar_kwh, @total_kwh)
        @wind_percent = gon.wind_percent = calculatePercentage(@wind_kwh, @total_kwh)
        @diesel_percent = gon.diesel_percent = calculatePercentage(@non_renew_kwh, @total_kwh)


        ## Community Usage Feature
        start_of_day = current_time.strftime "%2021-%m-%d 00:00:00"
        ### FOR 1 OFF PROBLEM??
        yesterday = Time.now - 86400 # (1 day in seconds)
        yesterday = yesterday.strftime "2021-%m-%d 23:00:00"

        gon.hourly_kwh_usage = GenerationBreakdown.where(dateTime: start_of_day..current_hour).select(:total, :id).order(:id)
        
        ## Battery Information Feature
        @current_record_battery = Battery.find_by timestamp: current_hour
        @past_hour_record_battery = Battery.find_by timestamp: past_hour
        current_charge = @current_record_battery.charge
        past_charge = @past_hour_record_battery.charge

        if past_charge < current_charge
            @battery_state = "Charging"
        elsif past_charge > current_charge
            @battery_state = "Discharging"
        else
            @battery_state = "Not charging"
        end

        ## Diesel Savings Feature
        @savings_dates = []
        savings_date_and_amount = []
        collected_data = GenerationBreakdown.where(dateTime: "2021-01-01 00:00:00"..current_hour)
        @curr_savings = @current_record_breakdown.year_total_non_renew
        
        # cycle through all dates
        collected_data.each do |record|
            # day and month 
            reading_time = record.dateTime.strftime("%e %b")
            @savings_dates.push reading_time
            dollar_savings = (record.year_total_non_renew / KWH_PER_GALLON) * DIESEL_PRICE
            savings_formatted = {:x => reading_time, :y => dollar_savings}
            savings_date_and_amount.push savings_formatted

        end
        gon.complete_savings_dates = @savings_dates
        gon.complete_savings = savings_date_and_amount

    end

    def calculatePercentage(numerator, denominator)
        percent = ((numerator/denominator) * 100).round(2)
        return percent

    end

end
