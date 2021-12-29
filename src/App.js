import React,{useState} from "react";
import countries from "./countryCode";
import SearchIcon from '@mui/icons-material/Search';
function App(){
  const [weatherData, setWeatherData] = useState([{}]);
  const [city , setCity] = useState("");
  const apiKey="cc01505e094c6a21641240187357b616";
  const weatherBox= document.querySelector(".weatherBox ")
  const weatherBoxBorder= document.querySelector(".weatherBoxBorder ")


function getWeather(){
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`).then(
    response =>response.json()
  ).then(
    data => {
      setWeatherData(data);
    }
  )
  if(city){
  weatherBox.classList.add("weatherBox_toggle");
  weatherBoxBorder.classList.add("weatherBoxBorder_toggle");
}
  console.log(city);
}
function getCountryName(countryCode){
  if(countries.hasOwnProperty(countryCode)){
    return countries[countryCode];
  }else{
    return countryCode;
  }

}
function handleChange(event){
  const enteredCity = event.target.value;
  setCity(enteredCity);

}

  return (
    <div>
    <div className="container">
      <div className="weatherBoxBorder">
      <div className="weatherBox">
      <h1>Welcome to the Weather app</h1>
      <SearchIcon className="icon" fontSize="small" />
      <input onChange={handleChange} type="text" placeholder="Enter city name" value={city}/>
      <button type="submit" onClick={getWeather}>Search</button>

      {typeof weatherData.main === 'undefined'? (
        <></>
      ): (<div className="weatherData">
          <p>Location: <span> {weatherData.name}, {getCountryName(weatherData.sys.country)} </span> </p>
          <hr/>
          <p> Temperature: <span> {weatherData.main.temp}°C </span></p>
          <hr/>
          <p className="weatherDescription"> Description: <span>{weatherData.weather[0].description}</span>
          <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather-icon" />
          </p>
          </div>)
     }
    {weatherData.cod==="404"&&<p class="error">City not found</p>}
    </div>
    </div>
    </div>
    </div>
  );
}
export default App;
