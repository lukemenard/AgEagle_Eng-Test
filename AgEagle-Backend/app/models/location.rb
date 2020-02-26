class Location < ApplicationRecord

    def self.get_weather_data(lon, lat)
        response = RestClient.get("api.openweathermap.org/data/2.5/weather?lat=#{lat}&lon=#{lon}&appid=f82c4965f651abb24cb1a9ea409d1a74")
        weather_data = JSON.parse(response)
    end


end
