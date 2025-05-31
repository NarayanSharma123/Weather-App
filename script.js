const apiKey = "b8e3fe93700a0d2ffa87730cae4eb53b";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

let checkWeather = async (city) => {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        let data = await response.json();
        document.querySelector(".city").innerText = data.name;
        document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerText = data.main.humidity + "%";
        document.querySelector(".wind").innerText = data.wind.speed + " Km/h"; 

        const weatherCondition = data.weather[0].main.toLowerCase();
        const temp = data.main.temp;


        // Choose icon based on weather condition + optional temp
        weatherIcon.src = "";  

        if (weatherCondition === "clear") {
            weatherIcon.src = "images/clear.png";
        } else if (weatherCondition === "rain") {
            weatherIcon.src = "images/rainy.png";
        } else if (weatherCondition === "drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (weatherCondition === "mist") {
            weatherIcon.src = "images/mist.png";
        } else if (weatherCondition === "clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (weatherCondition === "wind") {
            weatherIcon.src = "images/wind.png";
        } else {
            weatherIcon.src = "images/clear.png"; // fallback
        }

        console.log("Weather condition:", weatherCondition);
        console.log("Temperature:", temp);


        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }
}



let searchCity = () => {
    const search = searchBox.value;

    if (search.length < 3 || search.toLowerCase() === "india") {
        alert("Please enter a specific city name, like 'Delhi' or 'Mumbai'.");
        return;
    }

    checkWeather(search);
}

searchBtn.addEventListener("click", searchCity);