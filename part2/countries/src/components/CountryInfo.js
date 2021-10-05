import React, {useState, useEffect} from "react";
import axios from "axios";

const CountryInfo = ({country}) => {
    const [weather, setWeather] = useState([]);


      useEffect(() => {
        const params = {
            access_key: process.env.REACT_APP_API_KEY,
            query: country.capital
          }
        axios
          .get('http://api.weatherstack.com/current', {params})
          .then(response => {
            setWeather(response.data)
        })
          .catch(error => {
            console.log(error)
          })
      })
    const weatherData = weather.current

    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <h3>Languages</h3>
            <ul>
                {country.languages.map((a, i) => (
                    <li key={i}>{a.name}</li>
                ))}
            </ul>
            <img src={country.flag} height="80px" width="120px" alt="flag pic" />
            <div>
                {weather.length !==0 && (
                    <div>
                    <h2>Weather in {country.capital}</h2>
                    <p>Temperature: {weatherData.temperature} Celcius</p>
                    <img src={weatherData.weather_icons[0]} height="80px" width="80px" alt="weather icon"/>
                    <p>Wind spee: {weatherData.wind_speed} mph direction {weatherData.wind_dir}</p>
                    </div>
                )}
            </div>
        </div>
    )

}

export default CountryInfo;
