function formatDate(timestamp){
    //calculate the date
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
    hours = `0${hours}`;
}
    let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day}  ${hours}:${minutes}`;
}



function displayTemperature(response){
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let dateElement = document.querySelector("#date");
let iconElement = document.querySelector("#icon");

celTemp = response.data.main.temp;

temperatureElement.innerHTML= Math.round(celTemp);
cityElement.innerHTML= response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
dateElement.innerHTML = formatDate(response.data.dt * 1000);
iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
let apiKey = "203fa770242fcd2b9555d832a88ea567";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function showFahTemp(event){
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    let fahTemp = ((celTemp * 9)/5 + 32);
    temperatureElement.innerHTML = Math.round(fahTemp);
}

function showCelTemp(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
        fahrenheitLink.classList.remove("active");

        let temperatureElement = document.querySelector("#temperature");
        temperatureElement.innerHTML = Math.round(celTemp);
}

let celTemp = null;


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink= document.querySelector("#fah-link");
fahrenheitLink.addEventListener("click", showFahTemp);

let celsiusLink= document.querySelector("#cel-link");
celsiusLink.addEventListener("click", showCelTemp);

search("Seattle");