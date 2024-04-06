import jsyaml from 'js-yaml';

fetch('prob1.yaml')
    .then(response => response.text())
    .then(yamlData => {
        const config = jsyaml.safeLoad(yamlData);
        const apiKey = config.weather_api_key;
        console.log(apiKey); 
        // Call the getWeather function with apiKey as parameter
        document.getElementById('weatherForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const city = document.getElementById('cityInput').value;
            getWeather(city, apiKey); // Pass apiKey as parameter
        });
    })
    .catch(error => console.error('Error:', error));

function getWeather(city, apiKey) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
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
