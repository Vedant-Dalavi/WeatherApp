import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GfGWeatherApp from './App';
import reportWebVitals from './reportWebVitals';
import NavigationBar from './Components/NavigationBar';
// import LastFiveDaysWeather from './Components/WeatherChart';

import StateGraph from './Components/stateData'

// 47818291b6f02d28210c629504f5d0da
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavigationBar />
    <GfGWeatherApp />
    {/* <LastFiveDaysWeather /> */}
    <StateGraph />
  </React.StrictMode>
);

reportWebVitals();
