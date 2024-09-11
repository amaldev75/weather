const searchbox = document.querySelector(".inputbox");
const search = document.querySelector(".search");
const city=document.querySelector(".city");
const imgElement=document.querySelector(".icon");
const p=document.querySelector(".d");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const error = document.querySelector(".error");

search.addEventListener("click", () => {
  const query = searchbox.value;
  const key = "";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}&units=metric`;
  

  if (!query) {
    error.style.display = "block";
    error.innerHTML = "Enter the location";
    city.style.display="none";
    temperature.style.display="none";
    humidity.style.display="none";
    imgElement.style.display="none";
    icon.style.display="none";
    p.style.display="none";
  } else {
    error.style.display = "none";
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        const tempCelsius = Math.round(data.main.temp);; // Convert Kelvin to Celsius
        const humidityValue = data.main.humidity;
        const cou=data.name;
       const de=data.weather[0].description;
        const weatherIcon = data.weather[0].icon; // Get the weather icon code
        const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
       
        temperature.innerHTML = `Temprature: ${tempCelsius}°C`;
        humidity.innerHTML = `Humidity: ${humidityValue}%`;
        city.innerHTML=`${cou}`;
        imgElement.src = iconUrl; 
        p.innerHTML=`${de}`;
        
        temperature.style.display="block";
        city.style.display="block";
        humidity.style.display="block";
        imgElement.style.display="block";
        p.style.display="block";
      })
      .catch((err) => {
        error.style.display = "block";
        error.innerHTML = "Location not matched";
        temperature.style.display="none";
        city.style.display="none";
        humidity.style.display="none";
        imgElement.style.display="none";
        icon.style.display="none";
        p.style.display="none";
      });
  }
});


