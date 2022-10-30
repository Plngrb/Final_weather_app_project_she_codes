function currentDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[date.getDay()];
  let hours = date.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours} : ${minutes}`;
}

function displayLiveData(response) {
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let temperatureElement = document.querySelector("#temperature");
  let dateElement = document.querySelector("#date");
  let weatherIconElement = document.querySelector("#weather-icon");
  temperatureInCelsius = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  temperatureElement.innerHTML = Math.round(temperatureInCelsius);
  dateElement.innerHTML = currentDate(response.data.dt);
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "d2f1ee1358def379d685af37a2ea3c2a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayLiveData);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-search");
  let city = document.querySelector("#city");
  search(searchInput.value);
  city.innerHTML = `${searchInput.value}`;
}

function convertTemperatureInFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(temperatureInCelsius * (9 / 5) + 32);
  //Remove the active class of the celsius link
  celsiusUnit.classList.remove("active");
  //Add the active class on the fahrenheit link
  fahrenheitUnit.classList.add("active");
}

function convertTemperatureInCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(temperatureInCelsius);
  celsiusUnit.classList.add("active");
  fahrenheitUnit.classList.remove("active");
}

let temperatureInCelsius = null;

let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleSubmit);

let fahrenheitUnit = document.querySelector("#unit-fahrenheit-element");
fahrenheitUnit.addEventListener("click", convertTemperatureInFahrenheit);

let celsiusUnit = document.querySelector("#unit-celsius-element");
celsiusUnit.addEventListener("click", convertTemperatureInCelsius);

search("paris");
