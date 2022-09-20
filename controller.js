import * as model from './model.js' 
import * as view from './view.js'

const input = view.input;
let suggestionIndex;
let suggestionsList = [];

input.addEventListener('keypress', async (e)=> {
  suggestionIndex = -1;
  if (e.key === "Enter"){
    try {
      view.deleteSuggestions();
      const data = await model.getCityWeatherData(e.target.value)
      view.displayData(data)
      suggestionsList = [];
    } catch (error) {
      console.log(error);
    }
  }
})

input.addEventListener('input', async (e) => {
  view.deleteSuggestions();
  if (e.target.value.length > 2) {
    const data = await model.searchCities(e.target.value);
    console.log(e.target.value);
    suggestionsList = view.displaySuggestions(data);
    for (const element of suggestionsList) {
      element.addEventListener('click', async (e) => {
        const data = await model.getCityWeatherData(element.innerText)
        view.displayData(data);
        view.deleteSuggestions();
        view.inputBarAutocomplete(element.innerText);
      });
    }
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



