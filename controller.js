import * as model from './model.js' 
import * as view from './view.js'

const input = view.input;

input.addEventListener('keypress', async (e)=> {
  if (e.key === "Enter"){
    try {
      view.deleteSuggestions();
      const data = await model.getCityWeatherData(e.target.value)
      view.displayData(data)
    } catch (error) {
      console.log(error);
    }
  }
})

input.addEventListener('input', async (e) => {
  view.deleteSuggestions();
  if (e.target.value.length > 2) {
    const data = await model.searchCities(e.target.value);
    console.log(e.target.value)
    const suggestionsList = view.displaySuggestions(data);
    for (const element of suggestionsList) {
      element.addEventListener('click', async (e) => {
        const data = await model.getCityWeatherData(element.innerText)
        view.displayData(data);
        view.deleteSuggestions();
        view.inputBarAutocomplete(element.innerText);
      })
    }
  } 
})


