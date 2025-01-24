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
import HourlyForecastWidget from './components/HourlyForecastWidget';

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
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`,
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`,
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
                  currentWeather: { city: searchData.label, ...weatherResponse },
                  forecast: { city: searchData.label, ...forcastResponse }
                }
              : block
          )
        );
      })
      .catch(console.log);
  };

  const addWeatherBlock = () => {
    if (weatherBlocks.length < MAX_BLOCKS) {
      setWeatherBlocks(prevBlocks => [
        ...prevBlocks,
        {
          id: prevBlocks.length,
          currentWeather: null,
          forecast: null
        }
      ]);
    }
  };

  const handleDeleteClick = (blockId) => {
    setBlockToDelete(blockId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (weatherBlocks.length > 1 && blockToDelete !== null) {
      setWeatherBlocks(prevBlocks => prevBlocks.filter(block => block.id !== blockToDelete));
      setShowDeleteModal(false);
      setBlockToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setBlockToDelete(null);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} userType={userType} />

        {}
        {showDeleteModal && (
          <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button type="button" className="btn-close" onClick={cancelDelete}></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this weather block?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={cancelDelete}>Cancel</button>
                  <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <Routes>
          {}
          {!isLoggedIn && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/" element={<Login />} />
            </>
          )}

          {}
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
                      <div key={block.id} className="weather-block" style={{ 
                        marginBottom: '2rem', 
                        padding: '1rem', 
                        border: '1px solid #ddd', 
                        borderRadius: '8px',
                        position: 'relative' 
                      }}>
                        {weatherBlocks.length > 1 && (
                          <button
                            onClick={() => handleDeleteClick(block.id)}
                            style={{
                              position: 'absolute',
                              top: '10px',
                              right: '10px',
                              backgroundColor: '#ff4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '50%',
                              width: '30px',
                              height: '30px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              fontSize: '18px',
                              padding: '0',
                              lineHeight: '1',
                              transition: 'background-color 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#ff6666'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#ff4444'}
                          >
                            ×
                          </button>
                        )}
                        <Weather onSearchChange={(data) => handleOnSearchChange(data, block.id)} />
                        {block.currentWeather && <CurrentWeather data={block.currentWeather} />}
                        {block.forecast && (
                          <>
                            <HourlyForecastWidget data={block.forecast} />
                            <Forecast data={block.forecast} />
                          </>
                        )}
                      </div>
                    ))}
                    <div style={{ textAlign: 'center' }}>
                      <button 
                        onClick={addWeatherBlock}
                        disabled={weatherBlocks.length >= MAX_BLOCKS}
                        style={{
                          padding: '10px 20px',
                          fontSize: '1.2rem',
                          backgroundColor: weatherBlocks.length >= MAX_BLOCKS ? '#cccccc' : '#4CAF50',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: weatherBlocks.length >= MAX_BLOCKS ? 'not-allowed' : 'pointer',
                          marginTop: '1rem'
                        }}
                      >
                        {weatherBlocks.length >= MAX_BLOCKS ? 'Maximum Cities Reached' : '+ Add City'}
                      </button>
                      {weatherBlocks.length >= MAX_BLOCKS && (
                        <div style={{ color: '#666', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                          Maximum limit of {MAX_BLOCKS} cities reached
                        </div>
                      )}
                    </div>
                  </div>
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
