class FixColumnName < ActiveRecord::Migration[7.0]
  def change
    rename_column :generation_breakdowns, :year_total_non_renew, :year_total_renew
  end
end
