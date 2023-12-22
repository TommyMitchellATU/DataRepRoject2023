import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles.css';

function MainPage() {
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/location');
        console.log(response.data[response.data.length-1].location)
        setLocation(response.data[response.data.length-1].location);
        fetchWeatherData(response.data[response.data.length-1].location); // Call the function to fetch weather data
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchLocation();
  }, []);

  const fetchWeatherData = async (location) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=118e69e8d93b40ce92d93634232212&q=${location}&days=7`
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const [weather, setWeather] = useState(null);

  return (
    <div>
      {location && <Content location={location} weatherData={weather} />}
    </div>
  );
}

function Content({ location, weatherData }) {
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
      {weatherData ? (
        <div>
          {/* Weather forecast heading */}
          <h2 className="weather-heading">Weather Forecast for {location}</h2>
          <div className="week-container">
            {weatherData.forecast && weatherData.forecast.forecastday ? (
              // Map over forecast days and display weather information
              weatherData.forecast.forecastday.map((day) => (
                <div className="day-box" key={day.date}>
                  {/* Display the day of the week */}
                  <h3>{getDayOfWeek(day.date)}</h3>
                  {day.day && (
                    <>
                      {/* Display the average temperature */}
                      <p>Average Temperature: {getAverageTemperature(day)}Â°C</p>
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

export default MainPage;