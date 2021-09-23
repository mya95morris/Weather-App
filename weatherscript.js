//Time and date functions//

function getDate(date) {

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let formattedDate = `<strong>${currentDay}</strong>, ${currentMonth} ${currentDate}, ${currentYear}`;
  return formattedDate;
}

function getTime(date) {
  let currentTime = new Date();
  let dateTime = document.querySelector(".dateTime");
  dateTime.innerHTML = getDate(currentTime);
  let clockTime = document.querySelector("footer");
  clockTime.innerHTML = getTime(currentTime);
  if (currentMinutes < 10) {
    return `${currentHour}:0${currentMinutes}`;
  }
  let time = `${currentHour}:${currentMinutes}`;
  return time;
}

document.querySelector(".dateTime").innerHTML = getDate(new Date());
document.querySelector("footer").innerHTML = getTime(new Date());

//Search City //

function showInfo(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".cloudy").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = response.data.wind.speed;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  fahrenheitTemperature = response.data.main.temp;
  document
    .querySelector("img")
    .setAttribute("src", `src/icons/${response.data.weather[0].icon}.png`);
  document.querySelector(".uv") = response.data.main.uvi;
}

function search(city) {
  let apiKey = "e76cd8c37745df31c6e794ca3e2defbc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  document.querySelector(".city").innerHTML = document.querySelector(
    ".searchbox"
  ).value;
  axios.get(apiUrl).then(showInfo);
}

search("Los Angeles");

function submitButton(event) {
  event.preventDefault();
  let city = document.querySelector(".searchbox").value;
  search(city);
}

document.querySelector(".search-form").addEventListener("submit", submitButton);

//Current Location //

function findLocation(position) {
  let apiKey = "e76cd8c37745df31c6e794ca3e2defbc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showInfo);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

document.querySelector(".pin").addEventListener("click", getCurrentLocation);

// Temperature conversion current //
let fahrenheitTemperature = null;

function fahrenheitClick(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = `${Math.round(fahrenheitTemperature)}°`;
}
document.querySelector("#far").addEventListener("click", fahrenheitClick);

function celsiusClick(event) {
  event.preventDefault();
  let celsiusTemperature = (fahrenheitTemperature - 32) * 5 / 9;
  document.querySelector("#temperature").innerHTML = `${Math.round(celsiusTemperature)}°`;
}

document.querySelector("#cel").addEventListener("click", celsiusClick);


//World cities//
function showInfoCity(response) {
  document.querySelector(".city-2").innerHTML = response.data.name;
  document.querySelector(".cloudy-2").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".humidity-2").innerHTML = response.data.main.humidity;
  document.querySelector(".wind-2").innerHTML = response.data.wind.speed;
  document.querySelector("#temperature-2").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  fahrenheitTemperatureWorld = response.data.main.temp;
  document
    .querySelector(".icon-2")
    .setAttribute("src", `src/icons/${response.data.weather[0].icon}.png`);
}

function searchCity(city) {
  let apiKey = "e76cd8c37745df31c6e794ca3e2defbc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  document.querySelector(".city-2").innerHTML = `${city}`
  axios.get(apiUrl).then(showInfoCity);
}

function isbClick(event) {
  event.preventDefault();
  searchCity("Istanbul");
}

function ldnClick(event) {
  event.preventDefault();
  searchCity("London");
}

function nycClick(event) {
  event.preventDefault();
  searchCity("New York");
}

function tkyClick(event) {
  event.preventDefault();
  searchCity("Tokyo");
}

function kinClick(event) {
  event.preventDefault();
  searchCity("Kingston");
}

function mexClick(event) {
  event.preventDefault();
  searchCity("Mexico City");
}

function sinClick(event) {
  event.preventDefault();
  searchCity("Singapore");
}

function seoClick(event) {
  event.preventDefault();
  searchCity("Seoul");
}

document.querySelector(".ISB").addEventListener("click", isbClick);
document.querySelector(".LDN").addEventListener("click", ldnClick);
document.querySelector(".NYC").addEventListener("click", nycClick);
document.querySelector(".TKY").addEventListener("click", tkyClick);
document.querySelector(".KIN").addEventListener("click", kinClick);
document.querySelector(".MEX").addEventListener("click", mexClick);
document.querySelector(".SIN").addEventListener("click", sinClick);
document.querySelector(".SEO").addEventListener("click", seoClick);


searchCity("Dubai");

//temperature conversion world//
let fahrenheitTemperatureWorld = null;

function fahrenheitClickWorld(event) {
  event.preventDefault();
  document.querySelector("#temperature-2").innerHTML = `${Math.round(fahrenheitTemperatureWorld)}°`;
}
document.querySelector("#far-2").addEventListener("click", fahrenheitClickWorld);

function celsiusClickWorld(event) {
  event.preventDefault();
  let celsiusTemperatureWorld = (fahrenheitTemperatureWorld - 32) * 5 / 9;
  document.querySelector("#temperature-2").innerHTML = `${Math.round(celsiusTemperatureWorld)}°`;
}

document.querySelector("#cel-2").addEventListener("click", celsiusClickWorld);

//forecast//

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay()
  let day =[
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  return days[day];
}

function displayForecast(response) {
  let forecastHTML = `<div class="row week">`;
  response.data.daily.forEach(function(forecastDay, index)) {
    if (index < 6) {
      forecastHTML +=
        `<div class="col-sm day1"> ${formatForecastDay(forecastDay.dt)} <div class="col-sm "> ${Math.round(forecastDay.temp.max)}° <img class="day1 icon1" src="src/icons/${forecastDay.weather[0].icon}.png" alt="">
        </div>
        </div>
        `;
    }}}
    document.querySelector(".weatherForecast").innerHTML = forecastHTML + `</div>`;


    function getForecast(coordinates) {
      console.log(coordinates);
      let apiKey = "e76cd8c37745df31c6e794ca3e2defbc";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
      axios.get(apiUrl).then(displayForecast);
    }
