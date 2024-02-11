import React, { useState } from 'react';
import axios from 'axios';
import SearchHistory from './Components/SearchHistory';
// import NavigationBar from './NavigationBar';
import LastFiveDaysWeather from './Components/5DayData'
import './App.css';

function GfGWeatherApp() {
  const [input, setInput] = useState('');
  const [unit, setUnit] = useState('metric'); // Default unit is Celsius
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });
  const [recentSearches, setRecentSearches] = useState([]);

  const toDateFunction = () => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const search = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setInput('');
      setWeather({ ...weather, loading: true });
      const url = 'https://api.openweathermap.org/data/2.5/weather';
      const api_key = '47818291b6f02d28210c629504f5d0da';

      await axios
        .get(url, {
          params: {
            q: input,
            units: unit,
            appid: api_key,
          },
        })
        .then((res) => {
          console.log('res', res);
          setWeather({ data: res.data, loading: false, error: false });
          updateRecentSearches(input);
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setInput('');
          console.log('error', error);
        });
    }
  };

  const updateRecentSearches = (search) => {
    if (!recentSearches.includes(search)) {
      const updatedSearches = [search, ...recentSearches.slice(0, 4)];
      setRecentSearches(updatedSearches);
    }
  };

  const handleRecentSearch = (search) => {
    setInput(search);
  };

  return (
    <div className="App">

      <h1 className="app-name">Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Enter City Name.."
          name="query"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyPress={search}
        />
        <SearchHistory searches={recentSearches} handleRecentSearch={handleRecentSearch} />
      </div>
      <div className="unit-toggle">
        <label>
          Celsius
          <input
            type="radio"
            value="metric"
            checked={unit === 'metric'}
            onChange={() => setUnit('metric')}
          />
        </label>
        <label>
          Fahrenheit
          <input
            type="radio"
            value="imperial"
            checked={unit === 'imperial'}
            onChange={() => setUnit('imperial')}
          />
        </label>
      </div>
      {weather.loading && <div>Loading...</div>}
      {weather.error && <div>Error fetching data</div>}
      {weather.data && weather.data.main && (
        <div>
          <div className="city-name">
            <h2>
              {weather.data.name}, <span>{weather.data.sys.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{toDateFunction()}</span>
          </div>
          <div className="icon-temp">
            <img
              className=""
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />
            {unit === 'metric'
              ? Math.round(weather.data.main.temp)
              : Math.round((weather.data.main.temp * 9) / 5 + 32)}
            <sup className="deg">°{unit === 'metric' ? 'C' : 'F'}</sup>
          </div>
          <div className="des-wind">
            <p>{weather.data.weather[0].description.toUpperCase()}</p>
            <p>Wind Speed: {weather.data.wind.speed}m/s</p>
          </div>
        </div>
      )}
      {weather.data && <LastFiveDaysWeather city={weather.data.name} />} {/* Render the LastFiveDaysWeather component */}
    </div>
  );
}

export default GfGWeatherApp;
