require 'date'

class MainController < ApplicationController
    
    def index
        current_time = DateTime.now
        current_hour = current_time.strftime "%2021-%m-%d %H:00:00"
        past_hour = (current_time - (1.0/24)).strftime "%2021-%m-%d %H:00:00"

        # Generation Breakdown
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
        
        #updatedTime
        @last_updated = convertTime(@current_record_breakdown)
        
        # Community Usage
        start_of_day = current_time.strftime "%2021-%m-%d 00:00:00"
        end_of_day= current_time.strftime "%2021-%m-%d 23:00:00"
        #can access in Javascript files
        gon.hourly_kwh_usage = GenerationBreakdown.where(dateTime: start_of_day..end_of_day).select(:total, :id).order(:id)


        # Battery Information
        @current_record_battery = Battery.find_by timestamp: current_hour
        @pastB = Battery.find_by timestamp: past_hour
        @charge = @current_record_battery.charge
        @chargep = @pastB.charge

        if @chargep < @charge
            @state = "Charging"
        elsif @chargep > @charge
            @state = "Discharging"
        else
            @state = "Not charging"
        end
        # 12-14 kwH per gallon
        # diesel savings
        kwHpergallon = 13.00
        dieselprice = 5.00
        @monthsavingArray = Array.new
        @months = current_time.month
        i = 0
        @collected = GenerationBreakdown.where(dateTime: "2021-01-01 00:00:00"..current_hour)


        @savingsdate = []
        @savings = []
        
        # cycle through all dates
        @collected.each do |obs|
            
            reading_time = obs.dateTime.strftime('%Y-%m-%d %H:%M')
            # day and month 
            reading_time_formatted = obs.dateTime.strftime("%e %b")
            @savingsdate.push reading_time_formatted
            dollar_savings = (obs.year_total_non_renew/kwHpergallon)*dieselprice
            savings_temp = {:x => reading_time_formatted, :y => dollar_savings}
            @savings.push savings_temp
            #@savings.push dollar_savings

        end
        gon.completesavingdates = @savingsdate
        gon.completesavings = @savings

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
