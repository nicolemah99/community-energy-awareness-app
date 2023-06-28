Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'main#index'
  get '/about', to: 'main#about'
  get "modals/com_usage_modal"
  get "modals/elec_gen_modal"
  get "modals/savingsmodal"
  get "modals/batterymodal"
end
