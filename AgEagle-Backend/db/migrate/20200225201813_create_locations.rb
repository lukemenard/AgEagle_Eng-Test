class CreateLocations < ActiveRecord::Migration[6.0]
  def change
    create_table :locations do |t|
      t.float :lon
      t.float :lat
      t.integer :weather_id
      t.string :weather_main
      t.string :weather_description
      t.string :weather_icon
      t.string :base
      t.float :main_temp
      t.float :main_feels_like
      t.float :main_temp_min
      t.float :main_temp_max
      t.integer :main_pressure
      t.integer :main_humidity
      t.integer :visibility
      t.float :wind_speed
      t.integer :wind_deg
      t.integer :clouds_all
      t.datetime :dt
      t.integer :sys_type
      t.integer :sys_id
      t.float :sys_message
      t.string :sys_country
      t.datetime :sys_sunrise
      t.datetime :sys_sunset
      t.integer :timezone
      t.integer :api_id
      t.string :name
      t.integer :cod

      t.timestamps
    end
  end
end
