const API_KEY = "YOUR_API_KEY";  // Replace with your key
const cityInput = document.getElementById("cityInput");
const resultDiv = document.getElementById("weatherResult");
const loadingSpinner = document.getElementById("loading");

let lastSearchCache = null;  // Cache variable

function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        resultDiv.innerHTML = `<div class="error">Please enter a city name</div>`;
        return;
    }

    // If same city searched again → show cached result
    if (lastSearchCache && lastSearchCache.name.toLowerCase() === city.toLowerCase()) {
        displayWeather(lastSearchCache);
        return;
    }

    loadingSpinner.style.display = "block";
    resultDiv.innerHTML = "";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => {

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("City not found (404)");
                } else {
                    throw new Error("Server error (500)");
                }
            }

            return response.json();
        })
        .then(data => {

            loadingSpinner.style.display = "none";

            lastSearchCache = data; // Cache result

            displayWeather(data);
        })
        .catch(error => {
            loadingSpinner.style.display = "none";
            resultDiv.innerHTML = `<div class="error">${error.message}</div>`;
        });
}

function displayWeather(data) {
    resultDiv.innerHTML = `
        <div class="weather-card">
            <h3>${data.name}</h3>
            <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        </div>
    `;
}
