import React from "react";

function Weather() {
  const weatherData = {
    location: "New York City",
    temperature: "25°C",
    description: "Sunny",
    humidity: "50%",
    wind: "15 km/h",
  };

  return (
    <div className="weather-container">
      <h1 className="weather-heading">Weather Page</h1>
      <div className="weather-card">
        <h2>{weatherData.location}</h2>
        <p>Temperature: {weatherData.temperature}</p>
        <p>Description: {weatherData.description}</p>
        <p>Humidity: {weatherData.humidity}</p>
        <p>Wind: {weatherData.wind}</p>
      </div>
    </div>
  );
}

export default Weather;
