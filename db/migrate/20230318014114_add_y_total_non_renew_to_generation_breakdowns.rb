class AddYTotalNonRenewToGenerationBreakdowns < ActiveRecord::Migration[7.0]
  def change
    add_column :generation_breakdowns, :year_total_non_renew, :float
  end
end
