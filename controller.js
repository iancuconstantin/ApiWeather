import * as model from './model.js' 
import * as view from './view.js'

const input = view.input

input.addEventListener('keypress', async (e)=> {
    if (e.key === "Enter"){
     const data = await model.getCityWeatherData(e.target.value)
     view.displayData(data)
    }
})




