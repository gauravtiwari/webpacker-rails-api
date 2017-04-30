require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
# require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
# require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module WebpackerRailsApi
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # Setup public/app directory as base directory
    config.middleware.insert_before(
      ::ActionDispatch::Static,
      ::ActionDispatch::Static,
      "#{root}/public/app"
    )

    # Setup CORS
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'localhost:8080'
        resource '*', headers: :any, credentials: true, methods: [:get, :post, :options, :delete, :put, :patch]
      end
    end

    config.api_only = true
  end
end
