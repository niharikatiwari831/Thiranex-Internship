const apiKey = "7aaf8d29f9a1ea50c8659a3cd2bacd0c";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const weatherCard = document.getElementById("weatherCard");

const loading = document.getElementById("loading");
const error = document.getElementById("error");

async function getWeather(city){

    loading.style.display="block";
    weatherCard.style.display="none";
    error.innerHTML="";

    try{

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if(!response.ok){

            throw new Error("City not found");

        }

        const data = await response.json();

        displayWeather(data);

    }

    catch(err){

        error.innerHTML=err.message;

    }

    finally{

        loading.style.display="none";

    }

}

function displayWeather(data){

    document.getElementById("cityName").innerHTML=
        `${data.name}, ${data.sys.country}`;

    document.getElementById("temperature").innerHTML=
        `${data.main.temp} °C`;

    document.getElementById("description").innerHTML=
        data.weather[0].description;

    document.getElementById("humidity").innerHTML=
        data.main.humidity + "%";

    document.getElementById("wind").innerHTML=
        data.wind.speed + " m/s";

    document.getElementById("feels").innerHTML=
        data.main.feels_like + " °C";

    document.getElementById("weatherIcon").src=
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherCard.style.display="block";

}

searchBtn.addEventListener("click",()=>{

    const city=cityInput.value.trim();

    if(city===""){

        error.innerHTML="Please enter a city.";

        return;

    }

    getWeather(city);

});

cityInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        searchBtn.click();

    }

});