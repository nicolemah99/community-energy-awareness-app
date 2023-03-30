require 'date'

class MainController < ApplicationController
    
    def index
        current_time = DateTime.now
        cdt = current_time.strftime "%2021-%m-%d %H:00:00"
        pdt = (current_time - (1.0/24)).strftime "%2021-%m-%d %H:00:00"

        #generation breakdown
        @current = GenerationBreakdown.find_by dateTime: cdt
        @solarP = @current.solarP * 100
        @windP = @current.windP * 100
        @renewP = @current.renewP * 100

        @solarTP = (@current.solar/@current.total * 100).round(1)
        @windTP = (@current.wind/@current.total * 100).round(1)
        @dieselTP = (100 - @solarTP - @windTP).round(1) #rounded to make 100%

        #updatedTime
        @lastUpdated = convertTime(@current)
        
        # Community Usage
        start_of_day = current_time.strftime "%2021-%m-%d 00:00:00"
        end_of_day= current_time.strftime "%2021-%m-%d 23:00:00"
        #can access in Javascript files
        gon.hourly_kwh_usage = GenerationBreakdown.where(dateTime: start_of_day..end_of_day).select(:total, :id).order(:id)


        # battery information
        @currentB = Battery.find_by timestamp: cdt
        @pastB = Battery.find_by timestamp: pdt
        @charge = @currentB.charge
        @chargep = @pastB.charge

        if @chargep < @charge
            @state = "Charging"
        elsif @chargep > @charge
            @state = "Discharging"
        else
            @state = "Not charging"
        end
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