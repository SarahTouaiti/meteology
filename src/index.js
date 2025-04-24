function format(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function updateWeather(response) {
  console.log(response.data);

  //updating the temperature
  let updatedTemperature = response.data.temperature.current;
  let temp = document.querySelector("#temperature-value");
  temp.innerHTML = Math.round(updatedTemperature);

  //updating the weather condition
  let updatedCondition = response.data.condition.description;
  let condition = document.querySelector("#weather-condition");
  condition.innerHTML = updatedCondition;

  //updating the humidity
  let updatedHumidity = response.data.temperature.humidity;
  let humidity = document.querySelector("#wind-humidity");
  humidity.innerHTML = updatedHumidity;

  //updating the wind speed
  let updatedWindSpeed = response.data.wind.speed;
  let WindSpeed = document.querySelector("#wind-speed");
  WindSpeed.innerHTML = updatedWindSpeed;

  //updating the time
  let time = document.querySelector("#time");
  let updatedTime = new Date(response.data.time * 1000);
  time.innerHTML = format(updatedTime);

  //updating the weather emoji;
  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-emoji" />`;
  getForecast(response.data.city);
}

function getForecast(city) {
  let apiKey = "81a35fctfab545b52d43e71743o42f03";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearch(event) {
  event.preventDefault();
  searchFormInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchFormInput.value;
  searchCity(searchFormInput.value);
}

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data);
  let forecastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML += `<div class="weather-forecast-day">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
      <div class="weather-forecast-icon">
        <img src="${day.condition.icon_url}"/>
      </div>
      <div class="weather-forecast-temperatures">
        <div class="weather-forecast-temperature">
          <strong>${Math.round(day.temperature.maximum)}°</strong>
        </div>
      <div class="weather-forecast-temperature">${Math.round(
        day.temperature.minimum
      )}º</div>
      </div>
    </div>`;
    }
  });
  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);
searchCity("Paris");
