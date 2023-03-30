class CreateGenerationBreakdowns < ActiveRecord::Migration[7.0]
  def change
    create_table :generation_breakdowns do |t|
      t.timestamp :dateTime
      t.float :total
      t.float :nonRenew
      t.float :renew
      t.float :wind
      t.float :solar
      t.float :windP
      t.float :solarP
      t.float :renewP
      t.float :nonRenewP
      t.timestamps
    end
  end
end
