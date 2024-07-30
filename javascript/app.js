let user = document.querySelector("#user")
let box = document.querySelector("#box")
let tempDetail = document.querySelector("#tempDetail")
let temp = document.querySelector("#temp")
let loader = document.querySelector("#loader")
let notFound = document.querySelector("#notFound")
let error = document.querySelector("#error")
let body = document.querySelector('body');
let currentLoc = document.querySelector('#currentLoc');
let ApiKey = "09ece45d66365cbcdd7d6440c34ff652"


function searchuser() {
    if (user.value.trim() === "") {
        alert("Input is empty")
    } else {
        notFound.innerHTML = ""
        loader.innerHTML = `<span class="loader"></span>`
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${user.value}&units=metric&appid=${ApiKey}`;
    fetch(url)
    .then((req)=>{
        return req.json()
    })
    .then((data)=>{
        showData(data)
    })
    .catch((err)=>{
        
        tempDetail.innerHTML = ""
        temp.innerHTML = ""
        error.innerHTML = `<div  class="error-div">
        <img class="error" src="./assets/images/—Pngtree—no result search icon_6511543.png" alt="">
                </div>`
        console.log(err);

    })
    }
    user.value = ""
}

function showData(data) {
    error.innerHTML = ""
    loader.innerHTML =""
    let temper = Math.floor(data.main.temp)
    const {temp_min , temp_max , humidity} = data.main;
    const {country,} = data.sys
    const {main , id} = data.weather[0];

    console.log(data);
    let imgUrl = ""
    let weatherDescription = "";

    if (id >= 200 && id <= 232) {
        imgUrl = "./assets/images/thandardrom.png";
        weatherDescription = "Thunderstorm conditions with variations from light to heavy rain.";
        body.className += 'bg thunderstorms';
    } else if (id >= 300 && id <= 321) {
        imgUrl = "./assets/images/drizzle.png";
        weatherDescription = "Light to heavy drizzle with varying intensities.";
        body.className += 'bg drizzle';
    } else if (id >= 500 && id <= 531) {
        imgUrl = "./assets/images/Rain.png";
        weatherDescription = "Rainy conditions ranging from light to very heavy rain.";
        body.className += 'bg rain';
    } else if (id >= 600 && id <= 622) {
        imgUrl = "./assets/images/snow.png";
        weatherDescription = "Snowy conditions with light to heavy snow.";
        body.className += 'bg snow';
    } else if (id >= 701 && id <= 781) {
        imgUrl = "./assets/images/weather.png";
        weatherDescription = "Atmospheric conditions including mist, fog, and haze.";
        body.className += 'bg cloudy';
    } else if (id >= 801 && id <= 804) {
        imgUrl = "./assets/images/windy.png";
        weatherDescription = "Cloudy skies ranging from few clouds to overcast.";
        body.className += 'bg clouds';
    } else if (id === 800) {
        imgUrl = "./assets/images/sun.png";
        weatherDescription = "Clear skies with lots of sunshine.";
        body.className += 'bg sun';
    }
    
    
    temp.innerHTML = `<div class="temp-heading">
                    <h1 class="temp-heading">${temper}<sup>0</sup></h1>
                 </div>
                 <div class="city-name">
                    <p class="temp-city">${data.name} : ${country}</p>
                    <p class="temp-time">${weatherDescription}</p>
                 </div>
                 <div class="cloude-icon">
                     <img src="${imgUrl}" alt="">
                 </div>`
    tempDetail.innerHTML = `<div class="third-contant-div">
                <div class="tem-contant">
                    <p class="para">Temp max</p>
                    <p class="para">Temp min</p>
                    <p class="para">Humadity</p>
                    <p class="para">Cloudy</p>
                    <p class="para">Wind</p>
                </div>
                <div class="temp-number">
                    <p class="para">${temp_max} <sup>0</sup> <span style="color: rgba(255, 0, 0, 0.534);"><i class="fa-solid fa-temperature-quarter"></i></span></p>
                    <p class="para">${temp_min}<sup>0</sup><span style="color: rgba(0, 102, 255, 0.555);"><i class="fa-solid fa-temperature-quarter"></i></span></p>
                    <p class="para">${humidity}%<span><i class="fa-solid fa-droplet"></i></span></p>
                    <p class="para">${data.clouds.all}% <span><i class="fa-brands fa-cloudversify"></i></span></p>
                    <p class="para">${data.wind.speed}km/h <span><i class="fa-solid fa-wind"></i></span></p>
                </div>
               </div>`

}
user.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        searchuser();
    }
});

function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;
            let Currenturl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${ApiKey}`;
            fetch(Currenturl)
                .then((res) => res.json())
                .then((data) => showData(data))
                .catch((err) => {
                    tempDetail.innerHTML = ""
                    temp.innerHTML = ""
                    error.innerHTML = `<div  class="error-div">
                    <img class="error" src="./assets/images/—Pngtree—no result search icon_6511543.png" alt="">
                            </div>`
                    console.log(err);
                });
        },
        (error) => {
            const { message } = error;
            alert=`${message}`
            // box.innerHTML = `<p class="Error">${message}</p>`;
        }
    );
}

currentLoc.addEventListener('click', getCurrentLocation);

