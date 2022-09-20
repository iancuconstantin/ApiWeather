export const input = document.getElementById('input')

export function displayData(data){
    const temperatureC = data.current.temp_c
    const temperatureF = data.current.temp_f
    document.getElementById('tempC').innerHTML = `Today: ${temperatureC}°C`
    document.getElementById('tempF').innerHTML = `Today: ${temperatureF}°F`
    displayIcon(data, data.current.is_day)
  }
  
export function displayIcon(data, isDay){
    const imgFileRegex = /\d{3}\.png/
    const url = data.current.condition.icon.match(imgFileRegex)[0]
    if (isDay === 0){
      document.getElementById('tempLogo').src = `./night/${url}`
    } else {
      document.getElementById('tempLogo').src = `./day/${url}`
    }
  }  