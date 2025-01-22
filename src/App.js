import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import Login from "./pages/LoginComponent";
import SignUp from "./pages/SignupComponent";
import UserDetails from "./pages/UserDetails";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Weather from "./pages/Weather";

import ProtectedRoute from "./components/ProtectedRoute";
import CurrentWeather from "./components/CurrentWeather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api/Api";
import Forecast from "./components/Forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [setHourlyWeather] = useState(null);

  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const userType = window.localStorage.getItem("userType");
  const handleOnSearchChange = (searchData) => {
    //console.log(searchData);
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const hourlyWeatherFetch = fetch(
      `${WEATHER_API_URL}/forecast/hourly?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    // https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid={API key}

    Promise.all([currentWeatherFetch, forecastFetch, hourlyWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();
        const hourlyWeatherResponse = await response[2].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
        setHourlyWeather({ city: searchData.label, ...hourlyWeatherResponse });
      })
      .catch(console.log);
  };

  console.log(currentWeather);
  console.log(forecast);

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} userType={userType} />

        <Routes>
          {/* unauthorized route */}
          {!isLoggedIn && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/" element={<Login />} />
            </>
          )}

          {/* ProtectedRoutes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            <>
              <Route path="/" element={<Navigate to="/userDetails" />} />
              <Route path="/userDetails" element={<UserDetails />} />
              <Route
                path="/weather"
                element={
                  <>
                    <Weather onSearchChange={handleOnSearchChange} />
                    {currentWeather && <CurrentWeather data={currentWeather} />}
                    {forecast && <Forecast data={forecast} />}
                  </>
                }
              />
            </>
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
