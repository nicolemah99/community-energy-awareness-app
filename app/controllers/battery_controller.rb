require 'date'

class BatteryController < ApplicationController
    def index
        current_time = DateTime.now
        cdt = current_time.strftime "%2021-%m-%d %H:00:00"
        pdt = (current_time - (1.0/24)).strftime "%2021-%m-%d %H:00:00"

        @current = Battery.find_by timestamp: cdt
        @past = Battery.find_by timestamp: pdt
        @charge = @current.charge
        @chargep = @past.charge

        if @chargep < @charge
            @state = "Charging"
        elsif @chargep > @charge
            @state = "Discharging"
        else
            @state = "Not charging"
        end
        @state= "Charging"
    end
end