import * as model from './model.js';
import * as view from './view.js';

async function fetchInformation(inputLocation, spinner) {
    spinner.removeAttribute('hidden');
    //const imageList = await model.searchPhotos(inputLocation);
    const weatherData = await model.getCityWeatherData(inputLocation);
    //const image = imageList.photos[0];
    spinner.setAttribute('hidden', '')
    return [/*image,*/ weatherData];
}

function displayContent(/*image,*/ weatherData) {
    view.deleteSuggestions();
    //view.changeBackground(image);
    view.displayData(/*image,*/weatherData); 
    isCityFavourite(weatherData.location.name)
    view.initCard();
}


async function isCityFavourite(searchedCity){
	const favs = await model.getFavouriteCities()
	favs.includes(searchedCity.toUpperCase()) ?  view.addToFavouritesButton.classList.add('my-fav-onclick') : true;
}

export {
    fetchInformation,
    displayContent,
}