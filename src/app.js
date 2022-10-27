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
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = response.data.wind.speed;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  dateElement.innerHTML = currentDate(response.data.dt);
}

let apiKey = "d2f1ee1358def379d685af37a2ea3c2a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=paris&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayLiveData);
