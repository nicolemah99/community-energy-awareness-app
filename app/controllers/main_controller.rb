require 'date'
require 'active_support/core_ext' 

class MainController < ApplicationController
    
    def index
        current_time = DateTime.now
        current_hour = current_time.strftime "%2021-%m-%d %H:00:00"
        past_hour = (current_time - (1.0/24)).strftime "%2021-%m-%d %H:00:00"

        ## Generation Breakdown
        @current_record_breakdown = GenerationBreakdown.find_by dateTime: current_hour
        @total_kwh = @current_record_breakdown.total.round(1)
        @renew_kwh = @current_record_breakdown.renew.round(1)
        @solar_kwh = gon.solar_kwh = @current_record_breakdown.solar.round(1)
        @wind_kwh = gon.wind_kwh = @current_record_breakdown.wind.round(1)
        @non_renew_kwh = @diesel_kwh = gon.diesel_kwh = @current_record_breakdown.nonRenew.round(1)

        @renew_percent = (@renew_kwh / @total_kwh * 100).round(2)
        @non_renew_percent = (@non_renew_kwh / @total_kwh * 100).round(2)
        @solar_percent = gon.solar_percent = (@solar_kwh / @total_kwh * 100).round(2)
        @wind_percent = gon.wind_percent = (@wind_kwh / @total_kwh * 100).round(2)
        @diesel_percent = gon.diesel_percent = (@non_renew_kwh / @total_kwh * 100).round(2)

        @curr_savings = @current_record_breakdown.year_total_non_renew
        @last_updated = convertTime(@current_record_breakdown)
        
        ## Community Usage
        start_of_day = current_time.strftime "%2021-%m-%d 00:00:00"
        end_of_day = current_time.strftime "%2021-%m-%d 23:00:00"
        #can access in Javascript files
        gon.hourly_kwh_usage = GenerationBreakdown.where(dateTime: start_of_day..end_of_day).select(:total, :id).order(:id)

        
        ## Battery Information
        current_record_battery = Battery.find_by timestamp: current_hour
        past_hour_record_battery = Battery.find_by timestamp: past_hour
        #rounding to make charge lay within 0.1 when deciding the state
        @current_charge = current_record_battery.charge.round(1)
        @past_charge = past_hour_record_battery.charge.round(1)

        if @past_charge < @current_charge
            @state = "Charging"
        elsif @past_charge > @current_charge
            @state = "Discharging"
        else
            @state = "Not charging"
        end

        # 12-14 kwH per gallon
        ## Diesel savings
        kwh_per_gallon = 13.00
        diesel_price = 5.00
        @savings_date = []
        savings_date_and_amount = []
        collected_data = GenerationBreakdown.where(dateTime: "2021-01-01 00:00:00"..current_hour)
        current_month = Date.today.strftime("%m")
        @current_month_str = Date.today.strftime("%B")
        @current_day = Date.today.strftime("%d")
        # Value when we get real time data
        #@current_year = Date.today.strftime("%Y")
        @current_year = "2021"

        # current monthly savings
        current_month_data = GenerationBreakdown.where(dateTime: "2021-#{current_month}-01 00:00:00"..current_hour)
        current_month_kwh_savings = (current_month_data.last().year_total_non_renew) - (current_month_data.first().year_total_non_renew)
        @current_month_dollar_savings = (current_month_kwh_savings/kwh_per_gallon)*diesel_price

        #daily savings
        current_daily_data = GenerationBreakdown.where(dateTime: "2021-#{current_month}-#{@current_day} 00:00:00"..current_hour)
        current_daily_kwh_savings = (current_daily_data.last().year_total_non_renew) - (current_daily_data.first().year_total_non_renew)
        @current_daily_dollar_savings = (current_daily_kwh_savings/kwh_per_gallon)*diesel_price

        # cycle through all dates - data for the savings chart
        collected_data.each do |record|
            # day and month 
            reading_time = record.dateTime.strftime("%e %b")
            @savings_date.push reading_time
            @dollar_savings = (record.year_total_non_renew/kwh_per_gallon)*diesel_price
            savings_formatted = {:x => reading_time, :y => @dollar_savings}
            savings_date_and_amount.push savings_formatted

        end
        gon.completesavingdates = @savings_date
        gon.completesavings = savings_date_and_amount

    end

    #convert to 12hr clock
    def convertTime(time) 
        hour = time.dateTime.strftime("%H").to_i
        if hour == 0
            updatedHour = 12
            meridiem = "am"

        elsif hour < 12
            updatedHour = hour.to_i
            meridiem = "am"

        elsif hour == 12
            updatedHour = 12
            meridiem = "pm"

        elsif 12< hour and hour < 24
            updatedHour = hour - 12
            meridiem = "pm"
        else
            return "An error occured determining the time."
        end
        return time.dateTime.strftime("%B #{time.dateTime.day.ordinalize}, %Y at #{updatedHour}:00#{meridiem} AKST")

    end

end
