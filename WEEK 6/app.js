const apiKey = "YOUR_API_KEY"; // Replace with OpenWeatherMap API key
const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeather");
const output = document.getElementById("output");
const errorDiv = document.getElementById("error");

// Fetch weather data
async function fetchWeather(city) {
  try {
    errorDiv.textContent = ""; 
    output.textContent = "Loading...";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found. Please try again.");
    }

    const data = await response.json();

    // Save last searched city
    localStorage.setItem("lastCity", city);

    displayWeather(data);
  } catch (error) {
    output.textContent = "";
    errorDiv.textContent = error.message;
  }
}

// Display weather
function displayWeather(data) {
  output.innerHTML = `
    <h3>${data.name}, ${data.sys.country}</h3>
    <p>🌡 Temperature: ${data.main.temp}°C</p>
    <p>☁ Condition: ${data.weather[0].description}</p>
    <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
  `;
}

// Button click
getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    errorDiv.textContent = "Please enter a city name.";
  }
});

// Auto-load last searched city
window.onload = () => {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    fetchWeather(lastCity);
  }
};
