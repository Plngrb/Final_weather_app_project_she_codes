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

function formatTimestamp(timestamp) {
  let date = new Date(timestamp * 1000);
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = weekDays[date.getDay()];
  return day;
}

function getForecast(coordinates) {
  let apiKey = "bfaea905c0a0ddc23bt84531317o8165";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayLiveData(response) {
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let temperatureElement = document.querySelector("#temperature");
  let dateElement = document.querySelector("#date");
  let weatherIconElement = document.querySelector("#weather-icon");
  temperatureInCelsius = response.data.temperature.current;

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  temperatureElement.innerHTML = Math.round(temperatureInCelsius);
  dateElement.innerHTML = currentDate(response.data.time);
  weatherIconElement.setAttribute("src", `${response.data.condition.icon_url}`);
  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "bfaea905c0a0ddc23bt84531317o8165";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayLiveData);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-search");
  let city = document.querySelector("#city");
  search(searchInput.value);
  city.innerHTML = `${searchInput.value}`;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2 p-6">  
        <ul>
            <span class="weather_forecast_day">${formatTimestamp(
              forecastDay.time
            )}
            </span></ul>
        <ul><img src="${
          forecastDay.condition.icon_url
        }" alt="cloud" width="80px"></ul>
        <ul>
            <span class="weather_forecast_temperature_max">
            ${Math.round(forecastDay.temperature.maximum)}°</span>
            <span>&nbsp;</span>
            <span class="weather_forecast_temperature_min">${Math.round(
              forecastDay.temperature.minimum
            )}°</span></ul>
        
    </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleSubmit);

search("paris");
