import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for styling

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    const getWeather = async (city) => {
        const apiKey = "YOUR_API_KEY"; // Replace with your WeatherAPI key
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

        try {
            const response = await axios.get(url);
            setWeather(response.data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getWeather(city);
    };

    return (
        <div className="container">
            <div className="weather-box">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city name or PIN code"
                    />
                    <button type="submit">Get Weather</button>
                </form>

                {weather && (
                    <div className="weather-info">
                        <h2>{weather.location.name}</h2>
                        <p>Temperature: {weather.current.temp_c}°C</p>
                        <p>Humidity: {weather.current.humidity}%</p>
                        <p>Weather Condition: {weather.current.condition.text}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;
