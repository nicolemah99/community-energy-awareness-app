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
        @dieselTP = 100 - @solarTP - @windTP #rounded to make 100%

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
end