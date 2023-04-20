# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
#
require 'csv'

batt_csv_text = File.read(Rails.root.join('seed-data', 'batteries.csv'))
batt_csv = CSV.parse(batt_csv_text, headers:true)

batt_csv.each do |row|
  data = row.to_h
  print 'b'
  Battery.create!(data)
end

puts "----"

gen_csv_text = File.read(Rails.root.join('seed-data', 'generation_breakdowns.csv'))
gen_csv = CSV.parse(gen_csv_text, headers:true)
gen_csv.each do |row|
  data = row.to_h
  print 'g'
  data["dateTime"] = DateTime.strptime(data["dateTime"], "%m/%d/%Y %l:%M:%S %p")
  GenerationBreakdown.create!(data)
end

puts "----"
