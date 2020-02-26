# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_02_25_201813) do

  create_table "locations", force: :cascade do |t|
    t.float "lon"
    t.float "lat"
    t.integer "weather_id"
    t.string "weather_main"
    t.string "weather_description"
    t.string "weather_icon"
    t.string "base"
    t.float "main_temp"
    t.float "main_feels_like"
    t.float "main_temp_min"
    t.float "main_temp_max"
    t.integer "main_pressure"
    t.integer "main_humidity"
    t.integer "visibility"
    t.float "wind_speed"
    t.integer "wind_deg"
    t.integer "clouds_all"
    t.datetime "dt"
    t.integer "sys_type"
    t.integer "sys_id"
    t.float "sys_message"
    t.string "sys_country"
    t.datetime "sys_sunrise"
    t.datetime "sys_sunset"
    t.integer "timezone"
    t.integer "api_id"
    t.string "name"
    t.integer "cod"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
