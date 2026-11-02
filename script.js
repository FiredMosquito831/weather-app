const citySelect = document.getElementById('city-select');
const getWeatherBtn = document.getElementById('get-weather-btn');

const weatherIcon = document.getElementById('weather-icon');
const locationEl = document.getElementById('location');
const weatherMain = document.getElementById('weather-main');
const mainTemperature = document.getElementById('main-temperature');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const windGust = document.getElementById('wind-gust');

async function getWeather(city) {
  try {
    const res = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${city}`
    );
    const data = await res.json();
    if (!res.ok) {
      alert('Something went wrong, please try again later');
    }
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function showWeather(city) {
  const data = await getWeather(city);
  if (!data) return;

  const first = data.weather && data.weather[0] ? data.weather[0] : {};
  const main = data.main || {};
  const wnd = data.wind || {};

  weatherIcon.src = first.icon || '';
  locationEl.textContent = data.name || 'N/A';
  weatherMain.textContent = first.main || 'N/A';
  mainTemperature.textContent = `${main.temp || 'N/A'} °C`;
  feelsLike.textContent = `${main.feels_like || 'N/A'} °C`;
  humidity.textContent = `${main.humidity || 'N/A'}%`;
  wind.textContent = `${wnd.speed || 'N/A'} m/s`;
  windGust.textContent = `${wnd.gust || 'N/A'} m/s`;
}

getWeatherBtn.addEventListener('click', () => {
  showWeather(citySelect.value);
});
