(() => {
  // app/javascript/api_OpenWeather.js
  (function() {
    const API_KEY = document.querySelector("[data-open-weather-key]").getAttribute("data-open-weather-key");
    const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";
    const UNITS = "imperial";
    const ICON_BASE_URL = "http://openweathermap.org/img/wn";
    const lat = 66.8938995;
    const lon = -162.5991843;
    const locationElement = document.getElementById("location");
    const tempElement = document.getElementById("temp");
    const feelsLikeElement = document.getElementById("feelsLike");
    const humidityElement = document.getElementById("humidity");
    const windProfileElement = document.getElementById("windProfile");
    const weatherIconElement = document.getElementById("weatherIcon");
    const weatherElement = document.getElementById("weather");
    function degreesToCompassDirection(degrees) {
      const DIRECTIONS = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW"
      ];
      return DIRECTIONS[Math.floor(degrees / 22.5 + 0.5) % 16];
    }
    function displayWeather(data) {
      const { name: location, main: { feels_like, temp, humidity }, wind: { speed: wind_speed, deg: wind_degree }, weather: [{ description: weather_description, main: weather, icon: iconCode }] } = data;
      locationElement.textContent = `${location}, AK`;
      tempElement.textContent = `${Math.round(temp)} \xB0F`;
      feelsLikeElement.textContent = `Feels like ${Math.round(feels_like)} \xB0F`;
      windProfileElement.textContent = `${Math.round(wind_speed)} mph ${degreesToCompassDirection(wind_degree)}`;
      humidityElement.textContent = `Humidity: ${Math.round(humidity)} %`;
      weatherElement.textContent = weather;
      weatherIconElement.src = `${ICON_BASE_URL}/${iconCode}@2x.png`;
    }
    fetch(`${BASE_URL}lat=${lat}&lon=${lon}&units=${UNITS}&appid=${API_KEY}`).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }).then(displayWeather).catch((error) => {
      console.error("There was a problem with your fetch operation:", error.message);
    });
  })();
})();
//# sourceMappingURL=/assets/api_OpenWeather.js.map
