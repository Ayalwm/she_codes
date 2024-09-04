const apiKey = '68f4o5290c2fb3fd7ac99fbd97a4dtd3'; // Replace with your OpenWeatherMap API key

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(error => alert('City not found! Please try again.'));
}

function displayWeather(data) {
  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector(".current-temperature-value");
  let weatherDescriptionElement = document.querySelector(".current-details");
  let iconElement = document.querySelector(".current-temperature-icon");

  cityElement.innerHTML = data.city;
  temperatureElement.innerHTML = Math.round(data.temperature.current);
  weatherDescriptionElement.innerHTML = `${formatDate(new Date())}, ${data.condition.description} <br />Humidity: <strong>${data.temperature.humidity}%</strong>, Wind: <strong>${data.wind.speed} km/h</strong>`;
  iconElement.innerHTML = getWeatherIcon(data.condition.icon);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function getWeatherIcon(iconCode) {
  const iconMapping = {
    "01d": "☀️",
    "01n": "🌙", 
    "02d": "⛅", 
    "02n": "☁️", 
    "03d": "☁️",
    "03n": "☁️", 
    "04d": "☁️", 
    "04n": "☁️", 
    "09d": "🌧️", 
    "09n": "🌧️", 
    "10d": "🌦️",
    "10n": "🌧️", 
    "11d": "⛈️", 
    "11n": "⛈️", 
    "13d": "❄️",
    "13n": "❄️", 
    "50d": "🌫️", 
    "50n": "🌫️"  
  };
  return iconMapping[iconCode] || "🌡️";
}
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
