import React, { useState, useEffect } from "react";
import axios from 'axios';
import { AsyncPaginate } from "react-select-async-paginate";
import { GeoApiOptions, GEO_API_URL } from "../api/Api";
import "../styles/Weather.css";

const Weather = ({ onSearchChange }) => {
  const [weather, setSearch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [showMaxFavoritesModal, setShowMaxFavoritesModal] = useState(false);
  const [activeTab, setActiveTab] = useState('weather');


  const Loader = () => (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Loading...</p>
    </div>
  );

  const loadOptions = async (inputValue) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
        GeoApiOptions
      );
      
      const result = await response.json();
      
      if (!result.data) {
        return {
          options: []
        };
      }

      return {
        options: result.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        }))
      };
    } catch (err) {
      console.error("Error loading options:", err);
      return {
        options: []
      };
    } finally {
      setIsSearching(false);
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    if (searchData) {
      setIsSearching(true);
      onSearchChange(searchData);
      setTimeout(() => setIsSearching(false), 1000);
    }
  };

  useEffect(() => {
    const getUserLocation = async () => {
      if (!isInitialLoad) return;
      
      setIsLoading(true);
      try {
        // Получаем IP через ipify API
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        
        // Получаем геолокацию по IP через ip-api
        const locationResponse = await fetch(`http://ip-api.com/json/${ipData.ip}`);
        const locationData = await locationResponse.json();
        
        if (locationResponse.ok && locationData.status === 'success') {
          const cityData = {
            value: `${locationData.lat} ${locationData.lon}`,
            label: `${locationData.city}, ${locationData.countryCode}`,
          };
          
          setSearch(cityData);
          onSearchChange(cityData);
        } else {
          console.warn('Could not determine location, using default');
          const defaultCity = {
            value: "50.4501 30.5234",
            label: "Kiev, UA"
          };
          setSearch(defaultCity);
          onSearchChange(defaultCity);
        }
      } catch (error) {
        console.error('Error fetching user location:', error);
        const defaultCity = {
          value: "50.4501 30.5234",
          label: "Kiev, UA"
        };
        setSearch(defaultCity);
        onSearchChange(defaultCity);
      } finally {
        setIsLoading(false);
        setIsInitialLoad(false);
      }
    };

    getUserLocation();
  }, [onSearchChange, isInitialLoad]);

  const addToFavorites = async (cityName) => {
    try {
      await axios.post(`api/favorites/${cityName}`);
      fetchFavorites();
    } catch (error) {
      if (error.response?.status === 400) {
        setShowMaxFavoritesModal(true);
      }
    }
  };

  const removeFavorite = async (cityName) => {
    await axios.delete(`api/favorites/${cityName}`);c
    fetchFavorites();
  };

  const fetchFavorites = async () => {
    const response = await axios.get('api/favorites');
    setFavorites(response.data);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="weather-page">
      <h1>Weather Page</h1>
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={weather}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        isLoading={isSearching}
      />
      {isLoading && <Loader />}
    </div>
  );
};

export default Weather;
