Rails.application.routes.draw do
  resources :locations

  post '/locations', to: 'locations#create'
  delete '/locations/:id', to: 'locations#destroy'

end
