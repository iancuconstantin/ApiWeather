import * as model from './model.js' 
import * as view from './view.js'

const input = view.input

input.addEventListener('keypress', (e)=> {
    if (e.key === "Enter"){
     const data = model.getCityWeatherData(e.target.value)
     view.displayData(data)
    }
})



export {
    sendInput
}
