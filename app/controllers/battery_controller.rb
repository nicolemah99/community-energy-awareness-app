require 'date'

class BatteryController < ApplicationController
    def index
        current_time = DateTime.now
        cdt = current_time.strftime "%2021-%m-%d %H:00:00"

        @current = Battery.find_by timestamp: cdt
        @charge = @current.charge
    end
end