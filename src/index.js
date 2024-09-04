const apiKey = '68f4o5290c2fb3fd7ac99fbd97a4dtd3'; // Replace with your OpenWeatherMap API key

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  // Corrected API URL using template literals
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

  // Update the elements with the correct data
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
    "01d": "☀️", // Clear sky (day)
    "01n": "🌙", // Clear sky (night)
    "02d": "⛅", // Few clouds (day)
    "02n": "☁️", // Few clouds (night)
    "03d": "☁️", // Scattered clouds (day)
    "03n": "☁️", // Scattered clouds (night)
    "04d": "☁️", // Broken clouds (day)
    "04n": "☁️", // Broken clouds (night)
    "09d": "🌧️", // Shower rain (day)
    "09n": "🌧️", // Shower rain (night)
    "10d": "🌦️", // Rain (day)
    "10n": "🌧️", // Rain (night)
    "11d": "⛈️", // Thunderstorm (day)
    "11n": "⛈️", // Thunderstorm (night)
    "13d": "❄️", // Snow (day)
    "13n": "❄️", // Snow (night)
    "50d": "🌫️", // Mist (day)
    "50n": "🌫️"  // Mist (night)
  };
  return iconMapping[iconCode] || "🌡️"; // Default to thermometer icon if unknown
}
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
