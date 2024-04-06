import config from './config.js';

const apiKey = config.weather_api_key;


function getWeather(city, apiKey) {
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            displayForecast(data);
        })
        .catch(error => console.error('Error:', error));
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p>Local time: ${data.location.localtime}</p>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
        <p>${data.current.condition.text}</p>
        <p>Humidity: ${data.current.humidity}%</p>
    `;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';

    data.forecast.forecastday.forEach(day => {
        const date = new Date(day.date);
        const options = { weekday: 'short' };
        const weekday = new Intl.DateTimeFormat('en-US', options).format(date);

        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
            <h3>${weekday}</h3>
            <p>${day.day.avgtemp_c}°C</p>
            <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
            <p>${day.day.condition.text}</p>
            <p>Humidity: ${day.day.avghumidity}%</p>
        `;
        forecastContainer.appendChild(forecastItem);
    });
}

document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const city = document.getElementById('cityInput').value; 
    getWeather(city, apiKey); 
});