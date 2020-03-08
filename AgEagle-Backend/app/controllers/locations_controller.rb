class LocationsController < ApplicationController
  
  def index
    locations = Location.all
    render json: locations, except: [:updated_at, :created_at]
  end

  def create
    location = Location.create(
      lon: params[:lon],
      lat: params[:lat],
      weather_id: params[:weather_id],
      weather_main: params[:weather_main],
      weather_description: params[:weather_description],
      weather_icon: params[:weather_icon],
      base: params[:base],
      main_temp: params[:main_temp],
      main_feels_like: params[:main_feels_like],
      main_temp_min: params[:main_temp_min],
      main_temp_max: params[:main_temp_max],
      main_pressure: params[:main_pressure],
      main_humidity: params[:main_humidity],
      visibility: params[:visibility],
      wind_speed: params[:wind_speed],
      wind_deg: params[:wind_deg],
      clouds_all: params[:clouds_all],
      dt: params[:dt],
      sys_type: params[:sys_type],
      sys_id: params[:sys_id],
      sys_message: params[:sys_message],
      sys_country: params[:sys_country],
      sys_sunrise: params[:sys_sunrise],
      sys_sunset: params[:sys_sunset],
      timezone: params[:timezone],
      api_id: params[:api_id],
      name: params[:name],
      cod: params[:cod]
    )
    render json: location, except: [:updated_at, :created_at]
  end

  def show
    location = Location.find_by(id: params[:id])
    render json: location, except: [:updated_at, :created_at]
  end

  def destroy
    location = Location.find_by(id: params[:id])
    location.delete
    render json: location, except: [:updated_at, :created_at]
  end


  private

  def location_params
    params.require(:location).permit(
      :lon,
      :lat,
      :weather_id,
      :weather_main,
      :weather_description,
      :weather_icon,
      :base,
      :main_temp,
      :main_feels_like,
      :main_temp_min,
      :main_temp_max,
      :main_pressure,
      :main_humidity,
      :visibility,
      :wind_speed,
      :wind_deg,
      :clouds_all,
      :dt,
      :sys_type,
      :sys_id,
      :sys_message,
      :sys_country,
      :sys_sunrise,
      :sys_sunset,
      :timezone,
      :api_id,
      :name,
      :cod
    )
  end


end
