import React, { useState } from 'react';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = '6a3641f988e74905880163349253105'

  const handleSearch = () => {
    if (!city) return;

    setLoading(true);
    setWeather(null);

    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to fetch weather data');
        setLoading(false);
      });
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '30px' }}>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading data...</p>}

      {weather && (
        <div className="weather-cards" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weather.current.temp_c} °C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weather.current.humidity} %</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weather.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weather.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
