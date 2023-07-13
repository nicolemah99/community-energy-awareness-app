# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
pin_all_from "app/javascript/custom", under: "custom", preload: true

# Add the import mapping for all files in indexSpecific folder
Dir.glob(Rails.root.join("app/javascript/indexSpecific/**/*.js")).each do |file_path|
  relative_path = Pathname.new(file_path).relative_path_from(Rails.root.join("app/javascript")).to_s
  module_name = File.basename(file_path, ".js")
  pin module_name, to: relative_path
end
