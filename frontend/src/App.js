import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import Login from "./pages/LoginComponent";
import SignUp from "./pages/SignupComponent";
import UserDetails from "./pages/UserDetails";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Weather from "./pages/Weather";
import ProtectedRoute from "./components/ProtectedRoute";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api/Api";
import DeleteModal from './components/DeleteModal';
import WeatherBlock from './components/WeatherBlock';
import AddCityButton from './components/AddCityButton';

function App() {
  const MAX_BLOCKS = 5;
  const [weatherBlocks, setWeatherBlocks] = useState([{
    id: 0,
    currentWeather: null,
    forecast: null
  }]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blockToDelete, setBlockToDelete] = useState(null);

  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const userType = window.localStorage.getItem("userType");

  const handleOnSearchChange = (searchData, blockId) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setWeatherBlocks(prevBlocks => 
          prevBlocks.map(block => 
            block.id === blockId 
              ? {
                  ...block,
                  currentWeather: weatherResponse,
                  forecast: forcastResponse
                }
              : block
          )
        );
      })
      .catch(console.error);
  };

  const addWeatherBlock = () => {
    if (weatherBlocks.length < MAX_BLOCKS) {
      setWeatherBlocks(prev => [...prev, {
        id: Date.now(),
        currentWeather: null,
        forecast: null
      }]);
    }
  };

  const handleDeleteClick = (blockId) => {
    setBlockToDelete(blockId);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setBlockToDelete(null);
  };

  const confirmDelete = () => {
    setWeatherBlocks(prev => prev.filter(block => block.id !== blockToDelete));
    setShowDeleteModal(false);
    setBlockToDelete(null);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} userType={userType} />
        <div className="container">
          <DeleteModal 
            show={showDeleteModal}
            onCancel={cancelDelete}
            onConfirm={confirmDelete}
          />
          
          <Routes>
            {!isLoggedIn && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/" element={<Login />} />
              </>
            )}

            <Route element={<ProtectedRoute />}>
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/register" element={<Navigate to="/" />} />
              <>
                <Route path="/" element={<Navigate to="/userDetails" />} />
                <Route path="/userDetails" element={<UserDetails />} />
                <Route
                  path="/weather"
                  element={
                    <div>
                      {weatherBlocks.map((block) => (
                        <WeatherBlock
                          key={block.id}
                          block={block}
                          onDelete={handleDeleteClick}
                          onSearchChange={handleOnSearchChange}
                          showDeleteButton={weatherBlocks.length > 1}
                        />
                      ))}
                      <AddCityButton
                        onClick={addWeatherBlock}
                        disabled={weatherBlocks.length >= MAX_BLOCKS}
                        maxBlocks={MAX_BLOCKS}
                      />
                    </div>
                  }
                />
              </>
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
