import React, { useState, useEffect } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GeoApiOptions, GEO_API_URL } from "../api/Api";
import "../styles/Weather.css";

const Weather = ({ onSearchChange }) => {
  const [weather, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
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
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    if (searchData) {
      onSearchChange(searchData);
    }
  };

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        const locationData = {
          value: `${data.latitude} ${data.longitude}`,
          label: `${data.city}, ${data.country_code}`,
        };
        
        setSearch(locationData);
        onSearchChange(locationData);
      } catch (error) {
        console.error('Error fetching user location:', error);
      }
    };

    if (!weather) {
      getUserLocation();
    }
  }, [weather, onSearchChange]);

  return (
    <div>
      <h1>Weather Page</h1>
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={weather}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default Weather;
