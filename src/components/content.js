import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles.css';

function Content() {
  const [weather, setWeather] = useState(null);
  const location = 'Galway';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=118e69e8d93b40ce92d93634232212&q=${encodeURIComponent(
            location
          )}&days=7`
        );
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [location]);

  const getDayOfWeek = (dateString) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    return daysOfWeek[dayOfWeek];
  };

  return (
    <div className="weather-section">
      {weather ? (
        <div>
          <h2 className="weather-heading">Weather Forecast</h2>
          <div className="week-container">
            {weather.forecast && weather.forecast.forecastday ? (
              weather.forecast.forecastday.map((day) => (
                <div className="day-box" key={day.date}>
                  <h3>{getDayOfWeek(day.date)}</h3>
                  {day.day && (
                    <>
                      <p>Max Temperature: {day.day.maxtemp_c}°C</p>
                      <p>Min Temperature: {day.day.mintemp_c}°C</p>
                      <p>Condition: {day.day.condition.text}</p>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p>No forecast data available.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default Content;