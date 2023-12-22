import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles.css';

function Content() {
  const [weather, setWeather] = useState(null);
  const location = 'Galway';

  useEffect(() => {
    // Fetch weather data when the component mounts or when the location changes
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

  const getAverageTemperature = (day) => {
    if (day && day.day && day.day.avgtemp_c) {
      return day.day.avgtemp_c;
    }
    return null;
  };

  return (
    <div className="weather-section">
      {weather ? (
        <div>
          {/* Weather forecast heading */}
          <h2 className="weather-heading">Weather Forecast</h2>
          <div className="week-container">
            {weather.forecast && weather.forecast.forecastday ? (
              // Map over forecast days and display weather information
              weather.forecast.forecastday.map((day) => (
                <div className="day-box" key={day.date}>
                  {/* Display the day of the week */}
                  <h3>{getDayOfWeek(day.date)}</h3>
                  {day.day && (
                    <>
                      {/* Display the average temperature */}
                      <p>Average Temperature: {getAverageTemperature(day)}°C</p>
                      {/* Display the weather condition */}
                      <p>Condition: {day.day.condition.text}</p>
                    </>
                  )}
                </div>
              ))
            ) : (
              // Display a message if no forecast data is available
              <p>No forecast data available.</p>
            )}
          </div>
        </div>
      ) : (
        // Display a loading message while fetching weather data
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default Content;