# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_04_17_191938) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "batteries", force: :cascade do |t|
    t.datetime "timestamp"
    t.float "charge"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "generation_breakdowns", force: :cascade do |t|
    t.datetime "dateTime", precision: nil
    t.float "total"
    t.float "nonRenew"
    t.float "renew"
    t.float "wind"
    t.float "solar"
    t.float "renewP"
    t.float "nonRenewP"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "year_total_renew"
  end

  create_table "master", id: false, force: :cascade do |t|
    t.datetime "date_time", precision: nil
    t.decimal "total_kw"
    t.decimal "total_non_renew_kw"
    t.decimal "total_renew_kw"
    t.decimal "total_wind_kw"
    t.decimal "total_solar_kw"
    t.decimal "percent_wind"
    t.decimal "percent_solar"
  end

end
