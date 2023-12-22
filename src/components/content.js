import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Content() {
  const [weather, setWeather] = useState(null);
  const location = 'Galway';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=118e69e8d93b40ce92d93634232212&q=${encodeURIComponent(
            location
          )}`
        );
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [location]);

  return (
    <div className="weather-section">
      {weather ? (
        <div>
          <h2 className="weather-heading">Current Weather</h2>
          <p className="weather-info">Location: {weather.location.name}</p>
          <p className="weather-info">Temperature: {weather.current.temp_c}°C</p>
          <p className="weather-info">Condition: {weather.current.condition.text}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default Content;