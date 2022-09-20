export const input = document.getElementById('input')
export const tempC = document.getElementById('c-select')
export const tempF = document.getElementById('f-select')
export const location = document.getElementById('location')

const feelsLike = document.getElementById('feelslike')
const weatherText = document.getElementById('weather-text')
const tempValue = document.getElementById('temp-value')
const suggestionsCard = document.querySelector('#suggestions');
const time = document.getElementById('time')


export function displayData(data){
    const temperatureC = data.current.temp_c
    tempValue.innerHTML = `${temperatureC}°C`
    feelsLike.innerHTML = data.current.feelslike_c + "°"


    const timeValue = data.location.localtime.split(" ")[1]
    time.innerHTML = `${timeValue}`

    const locationValue = data.location.name.toUpperCase()
    location.innerHTML = locationValue

    const weatherTextValue = data.current.condition.text.toUpperCase()
    weatherText.innerHTML = `${weatherTextValue}`

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
  for (const city of data.data) {
    const newSuggestion = document.createElement('div');
    suggestionsList.push(newSuggestion);
    newSuggestion.textContent= city.city;
    newSuggestion.classList.add('div_hover');
    suggestionsCard.appendChild(newSuggestion);
    console.log(city.city);
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
  }else {
    tempValue.innerText = data.current.temp_f + "°"
    feelsLike.innerHTML = data.current.feelslike_f + "°"
  }
}