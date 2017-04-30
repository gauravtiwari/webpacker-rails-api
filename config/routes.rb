Rails.application.routes.draw do
  namespace :api do
    resources :posts
  end
end
