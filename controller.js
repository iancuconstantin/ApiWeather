import * as model from './model.js' 
import * as view from './view.js'
import * as util from './controllerUtils.js';

const input = view.input;
const temps = [view.tempC, view.tempF]
const location = view.location
const windIcon = view.windIcon
const searchBtn = view.searchBtn
const moreInfo = view.moreInfo
const goBack = view.goBack
const addToFavouritesButton = view.addToFavouritesButton;
const spinner = view.spinner;

let suggestionIndex;
let suggestionsList = [];

input.addEventListener('keypress', async (e)=> {
  suggestionIndex = -1;
  if (e.key === "Enter"){
    try {
		view.initCard()
		view.goBackToMainCard()
		const [image, weatherData] = await util.fetchInformation(e.target.value, spinner);
		util.displayContent(image, weatherData);
		suggestionsList = [];
    } catch (error) {
      	console.log(error);
		spinner.setAttribute('hidden', '')
    }
  }
})

input.addEventListener('input', async (e) => {
	view.deleteSuggestions();
	try {
		if (input.value === '') {
			suggestionIndex = -1;
			const data = await model.getFavouriteCities();
			suggestionsList = view.displaySuggestions(data,true);
			for (const element of suggestionsList) {
				element.addEventListener('click', async (e) => {
					view.inputBarAutocomplete(element.innerText);
					const [image, weatherData] = await util.fetchInformation(element.innerText, spinner);
					util.displayContent(image, weatherData);
				});
			}
		} else if (e.target.value.length > 2) {
			const data = await model.searchCities(e.target.value);
			suggestionsList = view.displaySuggestions(data.data);
			for (const element of suggestionsList) {
				element.addEventListener('click', async (e) => {
					view.inputBarAutocomplete(element.innerText);
					const [image, weatherData] = await util.fetchInformation(element.innerText, spinner);
					util.displayContent(image, weatherData);
				});
			}
	  	} 
  	} catch (error) {
	  	console.log(error)
		spinner.setAttribute('hidden', '')
  }
})

input.addEventListener('click', async (e) => {
	try {
		if (input.value === '') {
			suggestionIndex = -1;
			view.deleteSuggestions();
			const data = await model.getFavouriteCities();
			suggestionsList = view.displaySuggestions(data,true);
			for (const element of suggestionsList) {
				element.addEventListener('click', async (e) => {
					view.inputBarAutocomplete(element.innerText);
					const [image, weatherData] = await util.fetchInformation(element.innerText, spinner);
					util.displayContent(image, weatherData);
				});
			}
		}
	} catch (error) {
		console.log(error);
		spinner.setAttribute('hidden', '')
	}
})

document.addEventListener('keydown', (e) => {
  let length = suggestionsList.length;
  if (length > 0) {
    if(e.code === 'ArrowDown') {
		suggestionIndex++;
		if (suggestionsList[suggestionIndex - 1]) {
			suggestionsList[suggestionIndex - 1].classList.remove('div-selected');
		}
		if (suggestionIndex === length) {
			suggestionIndex = 0;
		}
		suggestionsList[suggestionIndex].classList.add('div-selected');
		view.inputBarAutocomplete(suggestionsList[suggestionIndex].innerText);
		} else if (e.code === 'ArrowUp') {
		suggestionIndex--;
		if (suggestionsList[suggestionIndex + 1]) {
			suggestionsList[suggestionIndex + 1].classList.remove('div-selected');
		}
		if (suggestionIndex === -1 || suggestionIndex === -2) {
			suggestionIndex = length - 1;
		}
		suggestionsList[suggestionIndex].classList.add('div-selected');
		view.inputBarAutocomplete(suggestionsList[suggestionIndex].innerText);
    }
  }
});

document.addEventListener('click', (e) => {
	if (e.target.id !== 'input') {
		view.deleteSuggestions();
		suggestionsList = [];
	}
})

//handle display of temp by selection
temps.forEach(temp => {
    temp.addEventListener('click', async ()=> {
        const data = await model.getCityWeatherData(location.innerText);
        view.getTempBySelection(data, temp);
    })
})

windIcon.addEventListener('click', async ()=>{
	const data = await model.getCityWeatherData(location.innerText);
	view.convertWind(data, data.current.wind_mph);
})

searchBtn.addEventListener('click', ()=>{
	view.toggleSearchBar();
})

moreInfo.addEventListener('click', ()=>{
	view.toggleMoreInfoCard();
})

goBack.addEventListener('click', ()=>{
	view.goBackToMainCard();
})

addToFavouritesButton.addEventListener('click', () => {
	model.addToLocalStorage(input.value);
})
