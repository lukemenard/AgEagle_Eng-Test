### Using this Repository
1. Install [ruby](https://www.ruby-lang.org/en/documentation/installation/). 
   - See if Ruby is already installed locally by running `Ruby -v` in your command line. If it is installed, you will see a version number.

2. Navigate to 'AgEagle-Backend' within the directory in your terminal, and run each of the following commands to create and populate a database with current wildfire point data and run a backend rails server:
   - `bundle`
   - `rails db:create`
   - `rails db:migrate`
   - `rails s`
 
 3. In a new terminal window, navigate to 'AgEagle-Frontend' in the directory and run the followiing commands to install and deploy lite-server locally:
    - `npm install -g lite-server`
    - `lite-server`


# Eng-Test

Thank you for participating in the ageagle engineering test. We would like you to build an application that has the following features:

API: 

* Create a REST api that returns a number of random lat and long points with weather data. 
	* The consumer of the api should be able to specifty the number of returned points
	* Weather data can be pulled via an api from [Open Weather Map](https://openweathermap.org/current) 
	* Random numbers should be retreived from an outside source ie: [Random.org api](https://www.random.org/clients/http/)

Webapp: 

* Create a webapp that consumes the api that you created and displays the data.

Notes:

* We do not require that the web application be separate from the API in terms of servers. We do, however, want to see separate endpoints for getting the data and rendering the data
* Do this test in what ever language(s) and way you feel comfortable in. Ideally the UI portion is a webframework of some form
* Use this test as a showcase of good development practices
* Please include instructions on how to run your application as a part of submitting

Helpful Hints:

* [Mapbox](https://docs.mapbox.com/mapbox-gl-js/overview/) is a great tool to use  for rendering maps
* Dont forget there are only certian valid numbers for a lat / long 

Submitting:

* Email careers@ageagle.com with a link to a public git repositry
