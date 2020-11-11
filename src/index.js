//Feature 1
//In your project, display the current date
//and time using JavaScript: Tuesday 16:00

let current = new Date();

function formatDate(newDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[current.getDay()];
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[current.getMonth()];
  let date = current.getDate();
  let hours = current.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minute = current.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let formatDate = `${day}, ${month} ${date} ${hours}:${minute}`;
  return formatDate;
}

let currentDate = document.querySelector("#currentDate");
currentDate.innerHTML = formatDate();

//Feature 2: Add a search engine, when searching for a city (i.e. Paris),
//display the city name on the page after the user submits the form.

function displayWeather(response) {
  console.log(response.data);
  let iconElement = document.querySelector("#icon-weather");
  let temperatureElement = document.querySelector("#temperature");

  document.querySelector("#city").innerHTML = response.data.name;
  
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  
  celciusTemp = response.data.main.temp; 

  temperatureElement.innerHTML = Math.round(celciusTemp);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].main);
}
function search(city) {
  let apiKey = "d80253f7bab7ebfb0d574948c8b564be";
  let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(cityUrl).then(displayWeather);

  cityUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(cityUrl).then(displayForecast); 
}

function cityInput(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}
function searchLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  let apiKey = "d80253f7bab7ebfb0d574948c8b564be";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityAndTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function formatHours(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10){
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${forecast.weather[0].icon
      }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}

let form = document.querySelector("#search");
form.addEventListener("submit", cityInput);

//Bonus
function convertF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celciusLink.classList.remove("active");
  fahreinheitLink.classList.add("active");
  let fahrenheiTemp = (celciusTemp * 9) / 5 +32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemp);
}

function convertC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celciusLink.classList.add("active");
  fahreinheitLink.classList.remove("active"); 
  temperatureElement.innerHTML = Math.round(celciusTemp);
}
function searchLocation(position) {
  let apiKey = "d80253f7bab7ebfb0d574948c8b564be";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}


let celciusTemp = null; 

let fahreinheitLink = document.querySelector("#fahrenheit");
fahreinheitLink.addEventListener("click", convertF);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", convertC);

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", getCurrentLocation);


search("Ho Chi Minh");