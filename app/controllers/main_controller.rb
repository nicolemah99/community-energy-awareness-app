require 'date'

class MainController < ApplicationController
    
    def index
        current_time = DateTime.now
        cdt = current_time.strftime "%2021-%m-%d %H:00:00"
        pdt = (current_time - (1.0/24)).strftime "%2021-%m-%d %H:00:00"

        @current = GenerationBreakdown.find_by dateTime: cdt
        @solarP = @current.solarP * 100
        @windP = @current.windP * 100
        @renewP = @current.renewP * 100
        @nonRenewP = @current.nonRenewP * 100
        @curr_savings = @current.year_total_non_renew

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

        # diesel savings
        price = 5.00
        @monthsavingArray = Array.new
        @months = current_time.month
        i = 0

        while i < @months do
            savingsdate = current_time.strftime "%2021-#{i+1}-01 00:00:00"
            @currentS = GenerationBreakdown.find_by dateTime: savingsdate
            savings = @currentS.year_total_non_renew * price
            @monthsavingArray.push savings
            i = i + 1
        end
        @monthsavingArray.push (@curr_savings*price)

        @heyArray = [1,2,3,4]     

    end
end
