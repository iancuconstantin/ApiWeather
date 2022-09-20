
const weatherUrl = "http://api.weatherapi.com/v1/current.json?key="
const WEATHER_API_KEY = "4ee01554294d4b46b1475647221909"


async function getCityWeatherData(input){
    const response = await fetch (`${weatherUrl}${WEATHER_API_KEY}&q=${input}`)
    const data = await response.json()
    return data
}

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'ed66aa3ec7mshba8466f47ef8dd4p19f548jsndb9f6a291a44',
// 		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
// 	}
// };

// async function searchCities(input){
//   const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=200000&namePrefix=${input}`,options)
//   const data = await response.json()
//   console.log(data)
  
// }



export {
getCityWeatherData,
}
