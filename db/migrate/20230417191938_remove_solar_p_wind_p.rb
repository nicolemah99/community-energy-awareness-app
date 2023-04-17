class RemoveSolarPWindP < ActiveRecord::Migration[7.0]
  def change
    remove_column :generation_breakdowns, :solarP
    remove_column :generation_breakdowns, :windP
  end
end
