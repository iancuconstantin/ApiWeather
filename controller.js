import * as model from './model.js' 
import * as view from './view.js'

const input = view.input;
const temps = [view.tempC, view.tempF]
const location = view.location
const windIcon = view.windIcon
const searchBtn = view.searchBtn
const addToFavouritesButton = view.addToFavouritesButton;
const spinner = document.getElementById("spinner");
let suggestionIndex;
let suggestionsList = [];

input.addEventListener('keypress', async (e)=> {
  suggestionIndex = -1;
  if (e.key === "Enter"){
    try {
		spinner.removeAttribute('hidden')
		view.deleteSuggestions();
		const imageList = await model.searchPhotos(e.target.value);
		console.log(imageList);
		// const numberOfPages = Math.floor(imageList.total_results / 15);
		// const pageNumber = Math.floor(Math.random() * (numberOfPages + 1)) + 1;
		// const pageWithImages = await model.getPage(e.target.value, pageNumber);
		// const randomImageIndex = Math.floor(Math.random() * pageWithImages.photos.length);

		const data = await model.getCityWeatherData(e.target.value)
		
		const image = imageList.photos[0];
		console.log(image);
		view.changeBackground(image);
		
		view.initCard()
		view.displayData(data)
		spinner.setAttribute('hidden', '')
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
		const data = await model.getFavouriteCities();
		console.log('aaaaaaaaaaa',data);
		suggestionsList = view.displaySuggestions(data);
		for (const element of suggestionsList) {
			element.addEventListener('click', async (e) => {
				const imageList = await model.searchPhotos(element.innerText);
				const image = imageList.photos[0];
				console.log(image);
				view.changeBackground(image);
			  	const data = await model.getCityWeatherData(element.innerText)
			  	view.displayData(data);
			  	view.deleteSuggestions();
			  	view.inputBarAutocomplete(element.innerText);
			});
		  }
	} else if (e.target.value.length > 2) {
	    const data = await model.searchCities(e.target.value);
	    console.log(e.target.value);
	    suggestionsList = view.displaySuggestions(data.data);
	    for (const element of suggestionsList) {
	      element.addEventListener('click', async (e) => {
				const imageList = await model.searchPhotos(element.innerText);
				const image = imageList.photos[0];
				console.log(image);
				view.changeBackground(image);
				const data = await model.getCityWeatherData(element.innerText)
				view.displayData(data);
				view.deleteSuggestions();
				view.inputBarAutocomplete(element.innerText);
	      });
	    }
	  } 
  } catch (error) {
	  console.log(error)
  }
})

input.addEventListener('click', async (e) => {
	try {
		if (input.value === '') {
			view.deleteSuggestions();
			const data = await model.getFavouriteCities();
			console.log('aaaaaaaaaaa',data);
			suggestionsList = view.displaySuggestions(data);
			for (const element of suggestionsList) {
				element.addEventListener('click', async (e) => {
					const imageList = await model.searchPhotos(element.innerText);
					const image = imageList.photos[0];
					console.log(image);
					view.changeBackground(image);
					const data = await model.getCityWeatherData(element.innerText)
					view.displayData(data);
					view.deleteSuggestions();
					view.inputBarAutocomplete(element.innerText);
				});
			  }
		}
	} catch (error) {
		console.log(error);
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
	}
})

//handle display of temp by selection
temps.forEach(temp => {
    temp.addEventListener('click', async ()=> {
        const data = await model.getCityWeatherData(location.innerText)
        view.getTempBySelection(data, temp)
    })
})

windIcon.addEventListener('click', async ()=>{
	console.log(location.innerText)
	const data = await model.getCityWeatherData(location.innerText)
	view.convertWind(data, data.current.wind_mph)
})

searchBtn.addEventListener('click', ()=>{
	view.toggleSearchBar()
})

addToFavouritesButton.addEventListener('click', () => {
	model.addToLocalStorage(input.value);
})
