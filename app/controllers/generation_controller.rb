require 'date'

class GenerationController < ApplicationController
    
    def index
        current_time = DateTime.now
        cdt = current_time.strftime "%Y-%m-%d %H:00:00"
    end
    
end
