import * as model from "./model.js";
import * as view from "./view.js";

async function fetchInformation(inputLocation, spinner) {
  spinner.removeAttribute("hidden");
  const weatherData = await model.getCityWeatherData(inputLocation);
  spinner.setAttribute("hidden", "");
  return [weatherData];
}

function displayContent(weatherData) {
  view.deleteSuggestions();
  view.displayData(weatherData);
  isCityFavourite(weatherData.location.name);
  view.initCard();
}

async function isCityFavourite(searchedCity) {
  const favs = await model.getFavouriteCities();
  favs.includes(searchedCity.toUpperCase())
    ? view.addToFavouritesButton.classList.add("my-fav-onclick")
    : true;
}

export { fetchInformation, displayContent };