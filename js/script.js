// Määritellään muuttuja currentCity ja asetetaan oletusarvoksi "Vantaa"
let currentCity = "Vantaa";

// Määritellään API-avain
const API_KEY = '5ef984f882cd6f33235e787b9a6f9ffc';

// Haetaan tarvittavat DOM-elementit
const search = document.querySelector(".search-input");
const city = document.querySelector(".city");
const forecast = document.querySelector(".forecast");
const icon = document.querySelector(".icon");
const description = document.querySelector(".description");
const temperature = document.querySelector(".temperature");
const minmax = document.querySelector(".minmax");
const feels = document.querySelector(".feels");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");

// Funktio, joka käsittelee hakulomakkeen lähetyksen
document.querySelector(".search-form").addEventListener('submit', e => {
    // Estetään lomakkeen oletustoiminta
    e.preventDefault();
    // Asetetaan haettu kaupunki muuttujaan currentCity
    currentCity = search.value;
    // Kutsutaan getWeather-funktiota hakutulosten hakemiseksi
    getWeather();
    // Tyhjennetään hakukenttä
    search.value = "";
});

// Funktio, joka käsittelee suurennuslasin kuvakkeen klikkauksen
document.getElementById('glass').addEventListener('click', () => {
    // Asetetaan haettu kaupunki muuttujaan currentCity
    currentCity = search.value;
    // Kutsutaan getWeather-funktiota hakutulosten hakemiseksi
    getWeather();
    // Tyhjennetään hakukenttä
    search.value = "";
});

// Funktio, joka hakee säätiedot valitusta kaupungista
function getWeather() {
    // Lähetetään haku OpenWeatherMap API:lle
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=metric`)
        .then(res => res.json()) // Muunnetaan vastaus JSON-muotoon
        .then(data => { // Käsitellään vastausdatat
            // Päivitetään HTML-elementit säätiedoilla
            console.log(data)
            city.innerHTML = `${data.name}, ${data.sys.country}`;
            forecast.innerHTML = `<p>${data.weather[0].main}</p>`;
            icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="">`;
            description.innerHTML = `${data.weather[0].description}`;
            temperature.innerHTML = `${data.main.temp.toFixed()}°C`;
            minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}°C</p><p>Max: ${data.main.temp_max.toFixed()}°C</p>`;
            feels.innerHTML = `${data.main.feels_like.toFixed()}°C`;
            wind.innerHTML = `${data.wind.speed.toFixed()} m/s`;
            humidity.innerHTML = `${data.main.humidity} %`;
            pressure.innerHTML = `${data.main.pressure} hPa`;
        })
        .catch(error => { // Käsitellään virheet
            console.error('Error fetching weather data:', error); // Tulostetaan virhe konsoliin
            alert('City not found. Please enter a valid city name.'); // Ilmoitetaan käyttäjälle virheestä
        });
}

// Alustava sääntietojen haku oletuskaupungilla
getWeather();