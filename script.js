const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

// Check if API_KEY exists
if (typeof API_KEY === "undefined") {
    weatherResult.innerHTML = `<p style="color:red">API key not found. Add in config.js</p>`;
    console.error("API_KEY undefined. Add your API key in config.js");
}

// Search button click
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if(city === "") {
        alert("Please enter a city name!");
        return;
    }
    getWeather(city);
});

// Function to fetch weather via free CORS proxy
function getWeather(city) {
    if (typeof API_KEY === "undefined") return;

    weatherResult.innerHTML = `<p>Loading weather for ${city}...</p>`;

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const proxy = "https://api.allorigins.win/raw?url=";

    fetch(proxy + encodeURIComponent(apiURL))
        .then(response => response.json())
        .then(data => {
            console.log("API response:", data);

            if (data.cod === "404" || data.cod === 404) {
                weatherResult.innerHTML = `<p style="color:red">City "${city}" not found!</p>`;
                return;
            }

            weatherResult.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Feels Like: ${data.main.feels_like}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Condition: ${data.weather[0].description}</p>
            `;
        })
        .catch(error => {
            weatherResult.innerHTML = `<p style="color:red">Something went wrong! Check console.</p>`;
            console.error("Fetch error:", error);
        });
}
