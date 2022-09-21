import * as model from './model.js';
import * as view from './view.js';

async function fetchInformation(inputLocation, spinner) {
    spinner.removeAttribute('hidden');
    const imageList = await model.searchPhotos(inputLocation);
    const weatherData = await model.getCityWeatherData(inputLocation);
    const image = imageList.photos[0];
    spinner.setAttribute('hidden', '')
    return [image, weatherData];
}

function displayContent(image, weatherData) {
    view.deleteSuggestions();
    view.changeBackground(image);
    view.initCard()
    view.displayData(weatherData); 
}



export {
    fetchInformation,
    displayContent,
}