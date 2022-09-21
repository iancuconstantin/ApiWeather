export const input = document.getElementById('input')
export const tempC = document.getElementById('c-select')
export const tempF = document.getElementById('f-select')
export const location = document.getElementById('location')
export const windIcon = document.getElementById('wind-icon')
export const searchBtn = document.querySelector('.btn')
export const addToFavouritesButton = document.querySelector('button');

const weatherCard = document.getElementById('weather-card')
const feelsLike = document.getElementById('feelslike')
const weatherText = document.getElementById('weather-text')
const tempValue = document.getElementById('temp-value')
const suggestionsCard = document.querySelector('#suggestions');
const time = document.getElementById('time')
const humidity = document.getElementById('humid-value')
const wind = document.getElementById('wind-value')

export function initCard(){
  weatherCard.classList.remove('hide')
}

export function displayData(data) {
    const temperatureC = data.current.temp_c
    tempValue.innerHTML = `${temperatureC}°C`
    feelsLike.innerHTML = data.current.feelslike_c + "°"


    const timeValue = "TODAY: " + data.location.localtime.split(" ")[1]
    time.innerHTML = `${timeValue}`

    const locationValue = data.location.name.toUpperCase()
    location.innerHTML = locationValue

    const weatherTextValue = data.current.condition.text.toUpperCase()
    weatherText.innerHTML = `${weatherTextValue}`

    const humidityValue = data.current.humidity
    humidity.innerHTML = humidityValue + " %"

    const windValue = data.current.wind_mph
    wind.innerHTML = windValue + " mph"

    displayIcon(data, data.current.is_day)
}
  
export function displayIcon(data, isDay){
    const imgFileRegex = /\d{3}\.png/
    const url = data.current.condition.icon.match(imgFileRegex)[0]
    if (isDay === 0){
      document.getElementById('tempLogo').src = `./night/${url}`
    } else {
      document.getElementById('tempLogo').src = `./day/${url}`
    }
}  

export function displaySuggestions(data) {
  const suggestionsList = []
  for (const city of data) {
    if(city.city) {
      city = city.city;
    }
    const newSuggestion = document.createElement('div');
    suggestionsList.push(newSuggestion);
    newSuggestion.textContent= city;
    newSuggestion.classList.add('div_hover');
    suggestionsCard.appendChild(newSuggestion);
    console.log(city);
  }
  return suggestionsList;
}


export function deleteSuggestions() {
  suggestionsCard.innerHTML = '';
}

export function changeBackground(image) {
	document.body.style.backgroundImage = `url('${image.src.large2x}')`;
}

export function inputBarAutocomplete(text) {
  const inputBar = document.querySelector('#input');
  inputBar.value = text;
}

export function getTempBySelection(data,tempType) {
  if (tempType.innerText.trim() === "C"){
    tempValue.innerText = data.current.temp_c + "°"
    feelsLike.innerHTML = data.current.feelslike_c + "°"
    tempF.style.color = "gray"
    tempC.style.color = "white"
  }else {
    tempValue.innerText = data.current.temp_f + "°"
    feelsLike.innerHTML = data.current.feelslike_f + "°"
    tempC.style.color = "gray"
    tempF.style.color = "white"
  }
}

export function convertWind(data, windmph){
  if(wind.innerHTML === windmph + " mph"){
    wind.innerHTML = data.current.wind_kph + " kph"
  } else {
    wind.innerHTML = data.current.wind_mph + " mph"
  }
}

export function toggleSearchBar(){
  input.classList.toggle('active')
}
