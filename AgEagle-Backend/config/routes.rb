Rails.application.routes.draw do
  resources :locations

  post '/locations', to: 'locations#create'

end
