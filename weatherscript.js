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

function getTime(timestamp) {
  let currentTime = new Date(timestamp);

  let currentHour = currentTime.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinutes = currentTime.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentHour}:${currentMinutes}`;
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

  document
    .querySelector("img")
    .setAttribute("src", `src/icons/${response.data.weather[0].icon}.png`);
  document.querySelector(".feels").innerHTML = `${Math.round(response.data.main.feels_like)}°`;
  document.querySelector(".min").innerHTML = `${Math.round(response.data.main.temp_min)}°`;
  document.querySelector(".max").innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  fahrenheitTemperature = response.data.main.temp;
  minFahrenheitTemperature = response.data.main.temp_min
  maxFahrenheitTemperature = response.data.main.temp_max

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

//min max temperature conversion current//
let minFahrenheitTemperature = null;

function minFahrenheitClick(event) {
  event.preventDefault();
  document.querySelector(".min").innerHTML = `${Math.round(minFahrenheitTemperature)}°`;
}
document.querySelector(".fmin").addEventListener("click", minFahrenheitClick);

function minCelsiusClick(event) {
  event.preventDefault();
  let minCelsiusTemperature = (minFahrenheitTemperature - 32) * 5 / 9;
  document.querySelector(".min").innerHTML = `${Math.round(minCelsiusTemperature)}°`;
}

document.querySelector(".cmin").addEventListener("click", minCelsiusClick);
//max//

let maxFahrenheitTemperature = null;

function maxFahrenheitClick(event) {
  event.preventDefault();
  document.querySelector(".max").innerHTML = `${Math.round(maxFahrenheitTemperature)}°`;
}
document.querySelector(".fmax").addEventListener("click", maxFahrenheitClick);

function maxCelsiusClick(event) {
  event.preventDefault();
  let maxCelsiusTemperature = (maxFahrenheitTemperature - 32) * 5 / 9;
  document.querySelector(".max").innerHTML = `${Math.round(maxCelsiusTemperature)}°`;
}

document.querySelector(".cmax").addEventListener("click", maxCelsiusClick);

//forecast current//


function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function displayForecast(response) {
  let forecastHTML = `<div class="row week">`;
  response.data.daily.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `<div class="col-sm day1"> ${formatForecastDay(
        forecastDay.dt
      )} <div class="col-sm "> ${Math.round(
        forecastDay.temp.max
      )}° <img class="day1 icon1" src="src/icons/${
        forecastDay.weather[0].icon
      }.png" alt="">
        </div>
        </div>
        `;
    }
  });
  forecastHTML += "</div>";
  forecastElement.innerHTML = forecastHTML;
}


  function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "e76cd8c37745df31c6e794ca3e2defbc";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast);
  }


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
  minFahrenheitTemperatureWorld = response.data.main.temp_min;
  maxFahrenheitTemperatureWorld = response.data.main.temp_max;

  document
    .querySelector(".icon-2")
    .setAttribute("src", `src/icons/${response.data.weather[0].icon}.png`);
  document.querySelector(".feelsWorld").innerHTML = `${Math.round(response.data.main.feels_like)}°`;
  document.querySelector(".minworld").innerHTML = `${Math.round(response.data.main.temp_min)}°`;
  document.querySelector(".maxworld").innerHTML = `${Math.round(response.data.main.temp_max)}°`;;

}

function searchCity(city) {
  let apiKey = "e76cd8c37745df31c6e794ca3e2defbc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
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

//temperature conversions min/max world //
//min//
let minFahrenheitTemperatureWorld = null;

function minFahrenheitClickWorld(event) {
  event.preventDefault();
  document.querySelector(".minworld").innerHTML = `${Math.round(minFahrenheitTemperatureWorld)}°`;
}
document.querySelector(".fminworld").addEventListener("click", minFahrenheitClickWorld);

function minCelsiusClickWorld(event) {
  event.preventDefault();
  let minCelsiusTemperatureWorld = (minFahrenheitTemperatureWorld - 32) * 5 / 9;
  document.querySelector(".minworld").innerHTML = `${Math.round(minCelsiusTemperatureWorld)}°`;
}

document.querySelector(".cminworld").addEventListener("click", minCelsiusClickWorld);
//max//

let maxFahrenheitTemperatureWorld = null;

function maxFahrenheitClickWorld(event) {
  event.preventDefault();
  document.querySelector(".maxworld").innerHTML = `${Math.round(maxFahrenheitTemperatureWorld)}°`;
}
document.querySelector(".fmaxworld").addEventListener("click", maxFahrenheitClickWorld);

function maxCelsiusClickWorld(event) {
  event.preventDefault();
  let maxCelsiusTemperatureWorld = (maxFahrenheitTemperatureWorld - 32) * 5 / 9;
  document.querySelector(".maxworld").innerHTML = `${Math.round(maxCelsiusTemperatureWorld)}°`;
}

document.querySelector(".cmaxworld").addEventListener("click", maxCelsiusClickWorld);



//Random city//

function getRandomCity() {
  let number = Math.floor(Math.random() * 50)
  if (number === 1) {
    searchCity("San Diego");
  } else if (number === 2) {
    searchCity("Sydney");
  } else if (number === 3) {
    searchCity("Paris");
  } else if (number === 4) {
    searchCity("Moscow");
  } else if (number === 5) {
    searchCity("Barcelona");
  } else if (number === 6) {
    searchCity("Madrid");
  } else if (number === 7) {
    searchCity("Rome");
  } else if (number === 8) {
    searchCity("Chicago");
  } else if (number === 9) {
    searchCity("Abu Dhabi");
  } else if (number === 10) {
    searchCity("Amsterdam");
  } else if (number === 11) {
    searchCity("Toronto");
  } else if (number === 12) {
    searchCity("Berlin");
  } else if (number === 13) {
    searchCity("Las Vegas");
  } else if (number === 14) {
    searchCity("Rio de Janeiro");
  } else if (number === 15) {
    searchCity("Montego Bay");
  } else if (number === 16) {
    searchCity("Richmond");
  } else if (number === 17) {
    searchCity("Brooklyn");
  } else if (number === 18) {
    searchCity("Baltimore");
  } else if (number === 19) {
    searchCity("Miami");
  } else if (number === 20) {
    searchCity("Newark");
  } else if (number === 21) {
    searchCity("Delhi");
  } else if (number === 22) {
    searchCity("Shanghai");
  } else if (number === 23) {
    searchCity("Sao Paulo");
  } else if (number === 24) {
    searchCity("Dhaka");
  } else if (number === 25) {
    searchCity("Cairo");
  } else if (number === 26) {
    searchCity("Osaka");
  } else if (number === 27) {
    searchCity("Mumbai");
  } else if (number === 28) {
    searchCity("Karachi");
  } else if (number === 29) {
    searchCity("Chongqing");
  } else if (number === 30) {
    searchCity("Buenos Aires");
  } else if (number === 31) {
    searchCity("Kolkata");
  } else if (number === 32) {
    searchCity("Lagos");
  } else if (number === 33) {
    searchCity("Kinshasa");
  } else if (number === 34) {
    searchCity("Manila");
  } else if (number === 35) {
    searchCity("Tianjin");
  } else if (number === 36) {
    searchCity("Bangalore");
  } else if (number === 37) {
    searchCity("Lahore");
  } else if (number === 38) {
    searchCity("Bangkok");
  } else if (number === 39) {
    searchCity("Kuala Lumpur");
  } else if (number === 40) {
    searchCity("Antalya");
  } else if (number === 41) {
    searchCity("Dar es Salaam");
  } else if (number === 42) {
    searchCity("Belo Horizonte");
  } else if (number === 43) {
    searchCity("Lima");
  } else if (number === 44) {
    searchCity("Luanda");
  } else if (number === 45) {
    searchCity("Atlanta");
  } else if (number === 46) {
    searchCity("Yangon");
  } else if (number === 47) {
    searchCity("Detroit");
  } else if (number === 48) {
    searchCity("Memphis");
  } else if (number === 49) {
    searchCity("Wilmington");
  } else if (number === 4) {
    searchCity("Birmingham");
  } else {
    {
      searchCity("Doha");
    }

  }
}

document.querySelector(".earth").addEventListener("click", getRandomCity);

// Forecast World //
