const apikey = "29a637840bd37c8b0291721df0dedfd3";
const apiurl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiurl + city +`&appid=${apikey}`);

    if (response.status == 404) {
        alert("Invalid City Name Please try again later .");
        searchBox.value = "";
    }
    
    if (response.status == 404) {
        // document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    
    let data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    
    // Update the images according to the weather ..

    if (data.weather[0].main == "Clouds"){
        weathericon.src = "images/clouds.png";
    }
    else if (data.weather[0].main == "Clear"){
        weathericon.src = "images/clear.png";
    }
    else if (data.weather[0].main == "Rain"){
        weathericon.src = "images/rain.png";
    }
    else if (data.weather[0].main == "Drizzel"){
        weathericon.src = "images/drizzel.png";
    }
    else if (data.weather[0].main == "Mist"){
        weathericon.src = "images/mist.png";
    }
    else if (data.weather[0].main == "Snow"){
        weathericon.src = "images/snow.png";
    }
    else if (data.weather[0].main == "Haze"){
        weathericon.src = "images/clouds.png";
    }

    // document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";

}


searchBtn.addEventListener("click" , ()=>{

    checkWeather(searchBox.value);
})