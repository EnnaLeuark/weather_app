// current date
let now = new Date();
let day = now.getUTCDate();
if (day < 10) {
  day = `0${day}`;
}
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let monthNumber = months[now.getMonth()];
let year = now.getFullYear();

let currentDate = document.querySelector("#currentDate");
currentDate.innerHTML = ` ${day}.${monthNumber}.${year}`;

// current time
let hour = now.getHours();
if (hour < 10) {
  hour = ` 0${hour}`;
}
let min = now.getMinutes();
if (min < 10) {
  min = `0${min}`;
}

let currentTime = document.querySelector("#currentTime");
currentTime.innerHTML = ` ${hour}:${min}`;

// City Search & current Temperature
let apiKey = "689f4f9c85431deeb4c8640074154109";
let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=";
//Beispiel URL:"https://api.openweathermap.org/data/2.5/weather?q=Sydney"

// to access Current and forecast weather data:
//let apiURL2="https://api.openweathermap.org/data/2.5/onecall?lat=52.3989&lon=13.0657&exclude=minutely,hourly";

function showWeather(response) {
  //Temperature
  let temperature = Math.round(response.data.main.temp);
  let tempMin = Math.round(response.data.main.temp_min);
  let tempMax = Math.round(response.data.main.temp_max);

  let temperatureElement = document.querySelector("#degreeTemp");
  temperatureElement.innerHTML = `${temperature}°C`;
  let tempMinElement = document.querySelector("#currentTemp_min");
  tempMinElement.innerHTML = `${tempMin}°`;
  let tempMaxElement = document.querySelector("#currentTemp_max");
  tempMaxElement.innerHTML = `${tempMax}°`;
  let location = document.querySelector(".cityName");
  location.innerHTML =
    `${response.data.name}, ${response.data.sys.country}`.toUpperCase();

  let IconElement = document.querySelector("#currentIcon");
  IconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  IconElement.setAttribute("alt", response.data.weather[0].description);

  //description
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#currentDescription");
  descriptionElement.innerHTML = description;

  //feels like
  let feelsLike = Math.round(response.data.main.feels_like);

  let feelsLikeElement = document.querySelector("#feelsLike");
  feelsLikeElement.innerHTML = `${feelsLike}°C`;

  //Humidity
  let Humidity = response.data.main.humidity;
  let HumidityElement = document.querySelector("#humidity");
  HumidityElement.innerHTML = ` ${Humidity} %`;

  //windspeed
  let windspeed = Math.round(response.data.wind.speed * 3.6);
  let windElement = document.querySelector("#windspeed");
  windElement.innerHTML = `${windspeed} km/h `;

  //convert to Fahrenheit
  let fahrenheitTemp = document.querySelector("#fahrenheitLink");
  fahrenheitTemp.addEventListener("click", function displayFahrenheitTemp() {
    let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);
    let displayTemperature = document.querySelector("#degreeTemp");
    displayTemperature.innerHTML = `${fahrenheitTemperature}°F`;
    let feelsLike = document.querySelector("#feelsLike");
    let feelsLikeTemp = Math.round(
      (response.data.main.feels_like * 9) / 5 + 32
    );
    feelsLike.innerHTML = `${feelsLikeTemp} °F`;
    let wind = document.querySelector("#windspeed");
    let showWind = Math.round(response.data.wind.speed * 2.237);
    wind.innerHTML = `${showWind} mph`;
  });

  //Convert to Celsius
  let celsiusTemp = document.querySelector("#celsiusLink");
  celsiusTemp.addEventListener("click", function displayCelsiusTemp() {
    let displayTemperature = document.querySelector("#degreeTemp");
    displayTemperature.innerHTML = `${temperature}°C`;
    let feelsLike = document.querySelector("#feelsLike");
    let feelsLikeTemp = Math.round(response.data.main.feels_like);
    feelsLike.innerHTML = `${feelsLikeTemp} °C`;
    let wind = document.querySelector("#windspeed");
    let showWind = Math.round(response.data.wind.speed * 3.6);
    wind.innerHTML = `${showWind} km/h`;
  });

  // time of sunrise and sunset
  function formatTime(timestamp) {
    let time = new Date(timestamp);
    let hours = time.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = time.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
  }

  let sunrise = document.querySelector("#sunriseTime");
  sunrise.innerHTML = formatTime(response.data.sys.sunrise * 1000);

  let sunset = document.querySelector("#sunsetTime");
  sunset.innerHTML = formatTime(response.data.sys.sunset * 1000);

  getForecast(response.data.coord);
}

//weather forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showWeatherForecast(response) {
  console.log(response);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
         <p class="forecastDay">${formatDay(forecastDay.dt)}</p>
              <img
                class="forecastIcon"
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="cloudy icon"
              />
              <span class="forecast-Temp_min">${Math.round(
                forecastDay.temp.min
              )}°</span>/
              <span class="forecast-Temp_max">${Math.round(
                forecastDay.temp.max
              )}°</span>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "689f4f9c85431deeb4c8640074154109";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherForecast);
}

//current Temperature in Potsdam
axios(`${apiURL}Potsdam&appid=${apiKey}&units=metric`).then(showWeather);

//City Search and change of Temperature
function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");
  let newCity = document.querySelector(".cityName");
  newCity.innerHTML = cityInput.value.toUpperCase();

  axios(`${apiURL}${cityInput.value}&appid=${apiKey}&units=metric`).then(
    showWeather
  );
}

let city = document.querySelector("button");
city.addEventListener("click", changeCity);

let cityInputElement = document.querySelector("#formInput");
cityInputElement.addEventListener("submit", changeCity);

//Current Location button

function showPositionWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "0acaa1de783699a7c805c0e5bad91ab8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q&lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositionWeather);
}

let LocationButton = document.querySelector("#currentLocationButton");
LocationButton.addEventListener("click", getCurrentPosition);
