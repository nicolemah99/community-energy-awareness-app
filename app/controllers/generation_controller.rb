require 'date'

class GenerationController < ApplicationController
    
    def index
        current_time = DateTime.now
        cdt = current_time.strftime "%2021-%m-%d %H:00:00"

        @current = GenerationBreakdown.find_by dateTime: cdt
        @solarP = @current.solarP * 100
        @windP = @current.windP * 100
        @renewP = @current.renewP * 100
        @nonRenewP = @current.nonRenewP * 100

    end
    
end
