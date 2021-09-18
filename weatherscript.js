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
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    return `${currentHour}:0${currentMinutes}`;
  }
  let time = `${currentHour}:${currentMinutes}`;
  return time;
}
let currentTime = new Date();
let dateTime = document.querySelector(".dateTime");
dateTime.innerHTML = getDate(currentTime);
let clockTime = document.querySelector("footer");
clockTime.innerHTML = getTime(currentTime);

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
  document
    .querySelector("img")
    .setAttribute("src", `src/icons/${response.data.weather[0].icon}.png`);
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

// Temperature conversion //

function showFar(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function fahrenheitClick() {
  let city = document.querySelector(".city");
  let apiKey = "e76cd8c37745df31c6e794ca3e2defbc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showFar);
}

document.querySelector("#far").addEventListener("click", fahrenheitClick);

function showCel(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function celsiusClick() {
  let city = document.querySelector(".city");
  let apiKey = "e76cd8c37745df31c6e794ca3e2defbc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCel);
}

document.querySelector("#cel").addEventListener("click", celsiusClick);


//cities//

//NYC//
function showInfoCity(response) {
  document.querySelector(".city-2").innerHTML = response.data.name;
  document.querySelector(".cloudy-2").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".humidity-2").innerHTML = response.data.main.humidity;
  document.querySelector(".wind-2").innerHTML = response.data.wind.speed;
  document.querySelector("#temperature-2").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
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

document.querySelector(".ISB").addEventListener("click", isbClick);
document.querySelector(".LDN").addEventListener("click", ldnClick);
document.querySelector(".NYC").addEventListener("click", nycClick);
document.querySelector(".TKY").addEventListener("click", tkyClick);



searchCity("Dubai");
