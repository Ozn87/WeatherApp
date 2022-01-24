import React, {useState} from 'react'
import './App.css';

const api = {
  key:"ed2022a33e662f3844b15f89f57132b5",
  base:"https://api.openweathermap.org/data/2.5/"
}
var units = "C";
function App() {

  const [query, setQuery] =useState('')
  const [weather, setWeather] = useState({})
  
  var unitMesure = "metric";
  var city ="";
 

  const search = evt =>{
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=${unitMesure}&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery('')
        console.log(result)
      })
    }
  }
    
   let changeUnits = ()=>{
    city = weather.name;
    if(units === "C"){
      unitMesure = "imperial";
      city = weather.name;
      units = "F"

      fetch(`${api.base}weather?q=${city}&units=${unitMesure}&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery('')
        console.log(result)
      })
    }else{
      unitMesure = "metric";
      units = "C"
      fetch(`${api.base}weather?q=${city}&units=${unitMesure}&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery('')
        console.log(result)
      })
    }
  }

  const dateBuilder = (d) =>{
    let months =["January", "February", "March", "April", "May", "June", "July", "August","September", "October", "November", "December"]
    let days = ["Sunday","Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()]
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input type="text"
            className="search-bar"
            placeholder="Search.."
            onChange={e => setQuery(e.target.value)}
            value = {query}
            onKeyPress={search}
            />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
          <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className='temp'>
            {Math.round(weather.main.temp)}&#xb0;{units}
            </div>
            <div className='weather'>{weather.weather[0].main} </div>
            
          </div>
        </div>
        ):('')}
        <button className='button6'
            onClick={changeUnits}
            >C&#8660;F</button>
        
      </main>
    </div>
  );
}

export default App;
