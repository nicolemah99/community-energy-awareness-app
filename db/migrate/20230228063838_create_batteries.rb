class CreateBatteries < ActiveRecord::Migration[7.0]
  def change
    create_table :batteries do |t|
      t.datetime :timestamp
      t.float :charge

      t.timestamps
    end
  end
end
