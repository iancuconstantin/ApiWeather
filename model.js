const weatherUrl = "http://api.weatherapi.com/v1/current.json?key="
const WEATHER_API_KEY = "4ee01554294d4b46b1475647221909"

const googleUrl = "https://maps.googleapis.com/maps/api/place/autocomplete/json?"
const GOOGLEPLACES_API_KEY = "AIzaSyA1AEszAwG8sKSOHiBIYizVAkEJTGCfE6g"
async function getData(){
    const response = await fetch (`${weatherUrl}${WEATHER_API_KEY}&q=London`)
    const data = await response.json()
    console.log(data)
}

const input = "con"
async function getSuggestedCities(){
    const response = await fetch(`${googleUrl}input=${input}&key=${GOOGLEPLACES_API_KEY}`, {
        method: "GET",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
        }
    })
    console.log(response)
    const data = await response.json()
    //displayCities(data)
}
export {
    getData,
    getSuggestedCities
}