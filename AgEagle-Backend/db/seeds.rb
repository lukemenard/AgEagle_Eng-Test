require 'json'
require 'rest-client'

Location.destroy_all

response = RestClient.get('api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=f82c4965f651abb24cb1a9ea409d1a74')
weather_data = JSON.parse(response)
# binding.pry
# weather_data.each do |weather|
    Location.create(
        lon: weather_data["coord"]["lon"],
        lat: weather_data["coord"]["lat"],
        weather_id: weather_data["weather"][0]["id"],
        weather_main: weather_data["weather"][0]["main"],
        weather_description: weather_data["weather"][0]["description"],
        weather_icon: weather_data["weather"][0]["icon"],
        base: weather_data["base"],
        main_temp: weather_data["main"]["temp"],
        main_feels_like: weather_data["main"]["feels_like"],
        main_temp_min: weather_data["main"]["temp_min"],
        main_temp_max: weather_data["main"]["temp_max"],
        main_pressure: weather_data["main"]["pressure"],
        main_humidity: weather_data["main"]["humidity"],
        visibility: weather_data["visibility"],
        wind_speed: weather_data["wind"]["speed"],
        wind_deg: weather_data["wind"]["deg"],
        clouds_all: weather_data["clouds"]["all"],
        dt: weather_data["dt"],
        sys_type: weather_data["sys"]["type"],
        sys_id: weather_data["sys"]["id"],
        sys_message: weather_data["sys"]["message"],
        sys_country: weather_data["sys"]["country"],
        sys_sunrise: weather_data["sys"]["sunrise"],
        sys_sunset: weather_data["sys"]["sunset"],
        timezone: weather_data["timezone"],
        api_id: weather_data["id"],
        name: weather_data["name"],
        cod: weather_data["cod"]
    )
# end

