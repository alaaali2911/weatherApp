let searchInput = document.getElementById("search");
let submit = document.getElementById("submit");

searchInput.addEventListener("keyup", (e) => {
  search(e.target.value);
});

submit.addEventListener("click", (e) => {
  search(e.target.value);
});
// API Configuration
const base = "http://api.weatherapi.com/v1/forecast.json";
const API_KEY = "bf366f923c3e45cbae8173941241412";

// Days and Months Arrays
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthNames = [
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
  "December",
];

// Fetch Weather Data
async function search(place) {
  try {
    let response = await fetch(`${base}?key=${API_KEY}&q=${place}&days=3`);
    if (response.ok) {
      let data = await response.json();

      displayCurrent(data.location, data.current);
      displayAnother(data.forecast.forecastday);
    } else {
      console.error("Failed to fetch weather data");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Display Current Weather
function displayCurrent(place, data) {
  if (data) {
    const date = new Date(data.last_updated.replace(" ", "T"));
    const currentWeather = `
      <div class="today display">
        <div class="display-header" id="today">
          <div class="day">${days[date.getDay()]}</div>
          <div class="date">${date.getDate()} ${
      monthNames[date.getMonth()]
    }</div>
        </div>
        <div class="display-content" id="current">
          <div class="location">${place.name}</div>
          <div class="degree">
            <div class="num">${data.temp_c}<sup>o</sup>C</div>
            <div class="display-icon">
              <img src="https:${
                data.condition.icon
              }" alt="Weather Icon" width="90">
            </div>
          </div>
          <div class="custom">${data.condition.text}</div>
          <span><img src="/./imgs/icon-umberella.png" alt="Umbrella Icon" />20%</span>
          <span><img src="/./imgs/icon-wind.png" alt="Wind Icon" />18km/h</span>
          <span><img src="/./imgs/icon-compass.png" alt="Compass Icon" />East</span>
        </div>
      </div>
    `;
    document.getElementById("display").innerHTML = currentWeather;
  }
}

// Display Forecast for Next Days
function displayAnother(forecastDays) {
  let forecastHTML = "";
  for (let e = 1; e < forecastDays.length; e++) {
    const forecast = forecastDays[e];
    const date = new Date(forecast.date.replace(" ", "T"));
    forecastHTML += `
      <div class="display">
        <div class="display-header">
          <div class="day">${days[date.getDay()]}</div>
        </div>
        <div class="display-content">
          <div class="display-icon">
            <img src="https:${
              forecast.day.condition.icon
            }" alt="Weather Icon" width="48">
          </div>
          <div class="degree">${forecast.day.maxtemp_c}<sup>o</sup>C</div>
          <small>${forecast.day.mintemp_c}<sup>o</sup>C</small>
          <div class="custom">${forecast.day.condition.text}</div>
        </div>
      </div>
    `;
  }
  document.getElementById("display").innerHTML += forecastHTML;
}

// Initial Search for Cairo
search("Cairo");
