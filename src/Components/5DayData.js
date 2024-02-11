import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './5DayData.css'

const LastFiveDaysWeather = ({ city }) => {
    const [weatherData, setWeatherData] = useState([]);
    const API_KEY = '47818291b6f02d28210c629504f5d0da'; // Replace with your API key

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
                );
                setWeatherData(response.data.list);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, [city, API_KEY]);

    return (
        <div className="last-five-days-container">
            <h2>Next 5 Day Weather Forecast {city}</h2>
            <div className="weather-container">
                {weatherData.map((data, index) => (
                    <div key={index} className="weather-item">
                        <p>Date: {new Date(data.dt_txt).toLocaleDateString()}</p>
                        <p>Temperature: {data.main.temp} °C</p>
                        <p>Weather: {data.weather[0].description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LastFiveDaysWeather;
