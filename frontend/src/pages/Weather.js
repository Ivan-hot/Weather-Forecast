import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GeoApiOptions, GEO_API_URL } from "../api/Api";

const Weather = ({ onSearchChange }) => {
  const [weather, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
      GeoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

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

/*
function Weather() {
  return <h1>Weather Page</h1>;
  
}
export default Weather;
*/

/*
import React, { Component, useEffect, useState } from "react";
import "../App.css";
export default function UserHome({ userData }) {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./login";
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div>
          Name<h1>{userData.fname}</h1>
          Email <h1>{userData.email}</h1>
          <br />
          <button onClick={logOut} className="btn btn-primary">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

*/
