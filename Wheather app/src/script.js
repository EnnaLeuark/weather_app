// current date
let now = new Date();
let day = now.getUTCDate();
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

function showWeather(response) {
  //Temperature
  let temperature = Math.round(response.data.main.temp);
  let tempMin = Math.round(response.data.main.temp_min);
  let tempMax = Math.round(response.data.main.temp_max);
  let temperatureElement = document.querySelector("#degreeTemp");
  temperatureElement.innerHTML = temperature;
  let tempMinElement = document.querySelector("#currentTemp_min");
  tempMinElement.innerHTML = `${tempMin}°C`;
  let tempMaxElement = document.querySelector("#currentTemp_max");
  tempMaxElement.innerHTML = `${tempMax}°C`;
  let location = document.querySelector(".cityName");
  location.innerHTML = response.data.name;

  //description
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#currentDescription");
  descriptionElement.innerHTML = description;

  //rain

  //windspeed
  let windspeed = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#windspeed");
  windElement.innerHTML = `${windspeed} `;
  console.log(response);
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
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
/* function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degreeTemp");
  temperatureElement.innerHTML = "48";
}

let temperature = document.querySelector("#FahrenheitLink");
temperature.addEventListener("click", convertToFahrenheit);

// Fahrenheit to Celsius
//°F = °C * 1,8 + 32 (von Celsius nach Fahrenheit)
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degreeTemp");
  temperatureElement.innerHTML = "9";
}

let celsius = document.querySelector("#CelsiusLink");
celsius.addEventListener("click", convertToCelsius); */
