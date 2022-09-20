export const input = document.getElementById('input')
const suggestionsCard = document.querySelector('#suggestions');

export function displayData(data){
    const temperatureC = data.current.temp_c
    const temperatureF = data.current.temp_f
    document.getElementById('temps').innerHTML = `${temperatureC}°C / ${temperatureF}°F`
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

export function inputBarAutocomplete(text) {
	const inputBar = document.querySelector('#input');
	inputBar.value = text;
}   

export function changeBackground(image) {
	document.body.style.backgroundImage = `url('${image.src.large2x}')`;
}