const apiKey = "7f28be14dcb9726492c0f5a5313c71e2";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const mainOpener = document.querySelector(".opener");
const openContent = document.querySelector(".opener-content");
const openBtn = document.querySelector(".btn-container");

function introAnimation() {
  const tl = gsap.timeline({ defaults: { duration: 3, ease: "power4" } });

  tl.fromTo(openContent, { x: "-150%", opacity: 0 }, { x: "0%", opacity: 1 });
  tl.fromTo(openBtn, { opacity: 0 }, { opacity: 1 }, "-=1.3");
}

function hide() {
  const hide = gsap.timeline({
    defaults: { duration: 2, ease: "power4.Out" },
  });

  hide.to(openContent, { scale: 0, opacity: 0 }), "-=4";
  hide.to(mainOpener, { x: "120%", display: "none" });
}

openBtn.addEventListener("click", hide);

introAnimation();

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "../img/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "../img/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "../img/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "../img/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "../img/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
