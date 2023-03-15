Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "main#index"

  get "diesel-savings", to: "savings#index", as: :savings

  get "battery-page", to: "battery#index", as: :battery
end
