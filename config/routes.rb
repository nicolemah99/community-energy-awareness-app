Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "main#index"

  get "electricity-generation", to: "generation#index", as: :generation

  get "diesel-savings", to: "savings#index", as: :savings

  get "community-usage", to: "usage#index", as: :usage

  get "about-page", to: "about#index", as: :about
end
