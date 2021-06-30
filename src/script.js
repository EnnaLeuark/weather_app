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
currentTime.innerHTML = ` ${hour}:${min} (CET)`;

// City Search & current Temperature
let apiKey = "689f4f9c85431deeb4c8640074154109";
let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=";
//Beispiel URL:"https://api.openweathermap.org/data/2.5/weather?q=Sydney"

// to access Current and forecast weather data:
//let apiURL2="https://api.openweathermap.org/data/2.5/onecall?lat=52.3989&lon=13.0657&exclude=minutely,hourly";

function showWeather(response) {
  //Temperature
  console.log(response);
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
  console.log(response);

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
    wind.innerHTML = `${showWind} Miles/Hr`;
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
}

//current Temperature in Potsdam
axios(`${apiURL}Potsdam&appid=${apiKey}&units=metric`).then(showWeather);

//City Search and change of Temperature
function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inlineFormInputGroupUsername");
  let newCity = document.querySelector(".cityName");
  newCity.innerHTML = cityInput.value;

  axios(`${apiURL}${cityInput.value}&appid=${apiKey}&units=metric`).then(
    showWeather
  );
}

let city = document.querySelector("button");
city.addEventListener("click", changeCity);

// Bonus Feature: Current Location button

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

//Celsius to Fahrenheit Conversion
//°C = (°F - 32) * 5/9 (von Fahrenheit in Celsius)
/* function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degreeTemp");
  //temperatureElement.innerHTML = "48";
  let fahrenheitTemp = (temperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${fahrenheitTemp}°F`;
}

let temperature = document.querySelector("#fahrenheitLink");
temperature.addEventListener("click", displayFahrenheitTemp);

// Fahrenheit to Celsius
//°F = °C * 1,8 + 32 (von Celsius nach Fahrenheit)
function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degreeTemp");
  temperatureElement.innerHTML = "9";
}

let celsius = document.querySelector("#CelsiusLink");
celsius.addEventListener("click", displayCelsiusTemp); */
