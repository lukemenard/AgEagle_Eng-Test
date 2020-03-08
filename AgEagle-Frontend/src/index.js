const BASE_URL = "http://localhost:3000"
const LOCATIONS_URL = `${BASE_URL}/locations`
const RANDOM_NUM_URL = "https://api.random.org/json-rpc/2/invoke"

document.getElementById("num-form").addEventListener("submit", (event) => retrieveUserInput(event))

const retrieveUserInput = async (event) => {
    event.preventDefault()
    let userNumInput = parseInt(event.target.children[1].value)
    let lats = await fetchRandomLats(userNumInput).then(
      randomLats =>  {return randomLats}
    )
    let lons = await fetchRandomLons(userNumInput).then(
      randomLons => {return randomLons}
    )

    let weatherData = await createLocations(lats, lons).then(
      data => {return data}
    )

    await weatherData.forEach(data => parseWeatherData(data))
    location.reload()
}

const numConfig = (number, min, max) => {
    let config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        "jsonrpc": "2.0",
        "method": "generateIntegers",
        "params": {
            "apiKey": "3f132ce8-7a35-47fa-8fd7-3899aea11260",
            "n": `${number}`,
            "min": `${min}`,
            "max": `${max}`,
            "replacement": true
        },
        "id": 71390
      })
  }
  return config
}

const weatherConfig = (lon, lat, weather_id, weather_main, weather_description, weather_icon, base, main_temp, main_feels_like, main_temp_min, main_temp_max, main_pressure, main_humidity, visibility, wind_speed, wind_deg, clouds_all, dt, sys_type, sys_id, sys_message, sys_country, sys_sunrise, sys_sunset, timezone, api_id, name, cod) => {
  let config = {
    method: "POST",
    headers: {
       "Content-Type": "application/json",
       "Accept": "application/json"
    },
    body: JSON.stringify({lon, lat, weather_id, weather_main, weather_description, weather_icon, base, main_temp, main_feels_like, main_temp_min, main_temp_max, main_pressure, main_humidity, visibility, wind_speed, wind_deg, clouds_all, dt, sys_type, sys_id, sys_message, sys_country, sys_sunrise, sys_sunset, timezone, api_id, name, cod})
  } 
  return config
} 

const deleteConfig = () => {
  let config = {
    method: "DELETE"
  }
  return config
}

const fetchRandomLats = async (number) => {
    let response = await fetch(RANDOM_NUM_URL, numConfig(number, -90, 90))
    let data = await response.json()
    return data.result.random.data
}

const fetchRandomLons = async (number) => {
  let response = await fetch(RANDOM_NUM_URL, numConfig(number, -180, 80))
  let data = await response.json()
  return data.result.random.data
}

const postWeatherData = async (lon, lat, weather_id, weather_main, weather_description, weather_icon, base, main_temp, main_feels_like, main_temp_min, main_temp_max, main_pressure, main_humidity, visibility, wind_speed, wind_deg, clouds_all, dt, sys_type, sys_id, sys_message, sys_country, sys_sunrise, sys_sunset, timezone, api_id, name, cod) => {
  let response = await fetch(LOCATIONS_URL, weatherConfig(lon, lat, weather_id, weather_main, weather_description, weather_icon, base, main_temp, main_feels_like, main_temp_min, main_temp_max, main_pressure, main_humidity, visibility, wind_speed, wind_deg, clouds_all, dt, sys_type, sys_id, sys_message, sys_country, sys_sunrise, sys_sunset, timezone, api_id, name, cod))
  let data = await response.json()
  return data
}

const deleteWeatherData = async(id) => {
  await fetch(LOCATIONS_URL + `/${id}`, deleteConfig())
}

const createLocations = async (latArray, lonArray) => {
  let i = 0
  let weatherData = []
  while (i < latArray.length) {
    let data = await fetchWeatherData(latArray[i], lonArray[i])
    weatherData.push(data)
    i++
  }
  return weatherData
}

const fetchWeatherData = async (lat, lon) => {
  let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f82c4965f651abb24cb1a9ea409d1a74`)
  let data = await response.json()
  return data
}

const parseWeatherData = async (weatherData) => {
  let lon = weatherData["coord"]["lon"]
  let lat = weatherData["coord"]["lat"]
  let weather_id = weatherData["weather"][0]["id"]
  let weather_main = weatherData["weather"][0]["main"]
  let weather_description = weatherData["weather"][0]["description"]
  let weather_icon = weatherData["weather"][0]["icon"]
  let base = weatherData["base"]
  let main_temp = weatherData["main"]["temp"]
  let main_feels_like = weatherData["main"]["feels_like"]
  let main_temp_min = weatherData["main"]["temp_min"]
  let main_temp_max = weatherData["main"]["temp_max"]
  let main_pressure = weatherData["main"]["pressure"]
  let main_humidity = weatherData["main"]["humidity"]
  let visibility = weatherData["visibility"]
  let wind_speed = weatherData["wind"]["speed"]
  let wind_deg = weatherData["wind"]["deg"]
  let clouds_all = weatherData["clouds"]["all"]
  let dt = weatherData["dt"]
  let sys_type = weatherData["sys"]["type"]
  let sys_id = weatherData["sys"]["id"]
  let sys_message = weatherData["sys"]["message"]
  let sys_country = weatherData["sys"]["country"]
  let sys_sunrise = weatherData["sys"]["sunrise"]
  let sys_sunset = weatherData["sys"]["sunset"]
  let timezone = weatherData["timezone"]
  let api_id = weatherData["id"]
  let name = weatherData["name"]
  let cod = weatherData["cod"]

  await postWeatherData(lon, lat, weather_id, weather_main, weather_description, weather_icon, base, main_temp, main_feels_like, main_temp_min, main_temp_max, main_pressure, main_humidity, visibility, wind_speed, wind_deg, clouds_all, dt, sys_type, sys_id, sys_message, sys_country, sys_sunrise, sys_sunset, timezone, api_id, name, cod)
}

function initMap() {
    let map = new google.maps.Map(
      document.getElementById('map'), {
        zoom: 4,
        styles: [
              {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
              {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
              },
              {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
              },
              {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
              }
            ]
      })

    let currentLocation = new google.maps.InfoWindow;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        currentLocation.setPosition(pos);
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, currentLocation, map.getCenter());
      });
    } else {
      handleLocationError(false, currentLocation, map.getCenter());
    }

    getLocations()

    function getLocations(){
        fetch(LOCATIONS_URL)
        .then(response => response.json())
        .then(response => response.forEach(renderLocationCard))
    }

    function renderLocationCard(location){
        let card = createCard()
        let title = createCardName(location)
        let coords = createCoordHeader()
        let lat = createCardLat(location)
        let lon = createCardLon(location)
        let weather = createWeatherHeader()
        let weather_main = createWeatherMain(location)
        let weather_desc = createWeatherDesc(location)
        let cond = createCondHeader()
        let temp = createTemp(location)
        let feelsLike = createFeelsLike(location)
        let minTemp = createMinTemp(location)
        let maxTemp = createMaxTemp(location)
        let humidity = createHumidity(location)
        let pressure = createPressure(location)
        let windSpeed = createWindSpeed(location)
        let windDeg = createWindDeg(location)
        let date = createDateHeader()
        let dateTime = createDateTime(location)
        let timezone = createTimezone(location)
        let sunrise = createSunrise(location)
        let sunset = createSunset(location)
  
        card.append(
            title,
            coords,
            lat,
            lon,
            weather,
            weather_main,
            weather_desc,
            cond,
            temp,
            feelsLike,
            minTemp,
            maxTemp,
            humidity,
            pressure,
            windSpeed,
            windDeg,
            date,
            timezone,
            dateTime,
            sunrise,
            sunset,
        )
        setCoords(location, card)
        return card
    }

    function createCard(){
        card = document.createElement('div')
        card.classList.add("card")
        return card
    }

    function createCardName(location){
        let name = document.createElement('h2')
        name.innerText = `${location.name}, ${location.sys_country}`
        name.classList.add("card-name")
        return name
    }

    function createCoordHeader(){
        let coords = document.createElement('h3')
        coords.innerText = 'Coordinates'
        coords.classList.add("card-header")
        return coords
    }

    function createCardLat(location){
        let lat = document.createElement('p')
        lat.innerText = `Latitude: ${location.lat}`
        lat.classList.add('lat')
        return lat
    }

    function createCardLon(location){
        let lon = document.createElement('p')
        lon.innerText = `Longitude: ${location.lon}`
        lon.classList.add('lon')
        return lon
    }

    function createWeatherHeader(){
        let weather = document.createElement('h3')
        weather.innerText = 'Weather'
        weather.classList.add("card-header")
        return weather
    }

    function createWeatherMain(location){
        let weather_main = document.createElement('p')
        weather_main.innerText = `Main: ${location.weather_main}`
        weather_main.classList.add('weather-main')
        return weather_main
    }

    function createWeatherDesc(location){
        let weather_desc = document.createElement('p')
        weather_desc.innerText = `Description: ${location.weather_description}`
        weather_desc.classList.add('weather-desc')
        return weather_desc
    }

    function createCondHeader(){
        let cond = document.createElement('h3')
        cond.innerText = 'Conditions'
        cond.classList.add("card-header")
        return cond
    }

    function createTemp(location){
        let temp = document.createElement('p')
        temp.innerText = `Temperature: ${location.main_temp}`
        temp.classList.add('temp')
        return temp
    }

    function createFeelsLike(location){
        let feelsLike = document.createElement('p')
        feelsLike.innerText = `Feels Like: ${location.main_feels_like}`
        feelsLike.classList.add('feels-like')
        return feelsLike
    }

    function createMinTemp(location){
        let minTemp = document.createElement('p')
        minTemp.innerText = `Min Temp: ${location.main_temp_min}`
        minTemp.classList.add('min-temp')
        return minTemp
    }

    function createMaxTemp(location){
        let maxTemp = document.createElement('p')
        maxTemp.innerText = `Max Temp: ${location.main_temp_max}`
        maxTemp.classList.add('max-temp')
        return maxTemp
    }

    function createPressure(location){
        let pressure = document.createElement('p')
        pressure.innerText = `Pressure: ${location.main_pressure}`
        pressure.classList.add('pressure')
        return pressure
    }

    function createHumidity(location){
        let humidity = document.createElement('p')
        humidity.innerText = `Humidity: ${location.main_humidity}`
        humidity.classList.add('humidity')
        return humidity
    }

    function createWindSpeed(location){
        let windSpeed = document.createElement('p')
        windSpeed.innerText = `Wind Speed: ${location.wind_speed}`
        windSpeed.classList.add('wind-speed')
        return windSpeed
    }

    function createWindDeg(location){
        let windDeg = document.createElement('p')
        windDeg.innerText = `Wind Deg: ${location.wind_deg}`
        windDeg.classList.add('wind-deg')
        return windDeg
    }

    function createDateHeader(){
        let date = document.createElement('h3')
        date.innerText = 'Date/Time'
        date.classList.add("card-header")
        return date
    }

    function createTimezone(location){
        let timezone = document.createElement('p')
        timezone.innerText = `Timezone: ${location.timezone}`
        timezone.classList.add('timezone')
        return timezone
    }

    function createDateTime(location){
        let date = document.createElement('p')
        let dateTime = new Date(location.dt)
        date.innerText = `Recorded Date: ${dateTime}`
        date.classList.add('datetime')
        return date
    }

    function createSunrise(location){
        let sunrise = document.createElement('p')
        let rise = new Date(location.sys_sunrise)
        sunrise.innerText = `Sunrise: ${rise}`
        sunrise.classList.add('sunrise')
        return sunrise
    }

    function createSunset(location){
        let sunset = document.createElement('p')
        let set = new Date(location.sys_sunset)
        sunset.innerText = `Sunset: ${set}`
        sunset.classList.add('sunset')
        return sunset
    }

    function createDelete(location, marker) {
      let deleteButton = document.createElement('button')
      deleteButton.innerText = "Delete Location"
      deleteButton.classList.add('deleteButton')

      createDeleteEvent(location, deleteButton, marker)

      return deleteButton
    }

    function createDeleteEvent(location, deleteButton, marker){
      deleteButton.addEventListener('click', function(event){
        deleteLocation(location, event, marker)
      })
    }

    function deleteLocation(location, event, marker){
      marker.setMap(null)
      let id = location.id
      deleteWeatherData(id)
    }

    function setCoords(location, card){
        let latitude = location.lat
        let longitude = location.lon
        let latLng = new google.maps.LatLng(latitude, longitude)
        let marker = new google.maps.Marker({
          position: latLng,
          map: map,
          draggable: false
        })
        addMarkerListener(marker, card, location)
    }

    function addMarkerListener(marker, card, location){
        marker.addListener('click', function(){
          let locationInfo = new google.maps.InfoWindow({
            content: card
          })
          locationInfo.open(map, marker)
  
          let deleteButton = createDelete(location, marker)
          card.append(deleteButton)
        })
    }


}