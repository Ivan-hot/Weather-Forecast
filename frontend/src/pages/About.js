import React from "react";
import "../styles/About.css";

function About() {
  return (
    <div className="about-container">
      <h1>About this app</h1>
      <p>
        The <strong>Weather Application</strong> is designed to provide users
        with detailed weather forecasts using a modern tech stack. This app is
        built with <strong>React.js</strong> on the frontend,{" "}
        <strong>Nest.js</strong> on the backend, and <strong>PostgreSQL</strong>{" "}
        for data management, integrating the <strong>OpenWeatherMap API</strong>{" "}
        for real-time weather data.
      </p>
      <h2>Functionality Overview</h2>
      <h3>Frontend (React.js)</h3>
      <ul>
        <li>
          <strong>User Authentication:</strong> Simple registration and login
          system with private routes.
        </li>
        <li>
          <strong>City Autocomplete Input:</strong> An input field with
          autocomplete functionality for selecting cities.
        </li>
        <li>
          <strong>Weather Information Display:</strong> Weather cards display
          current-day weather data.
        </li>
        <li>
          <strong>Temperature Graph:</strong> A temperature chart for the
          current day using libraries like Chart.js or ApexCharts.
        </li>
        <li>
          <strong>Multiple Weather Blocks:</strong> Users can add up to five
          weather blocks with full functionality.
        </li>
        <li>
          <strong>Weather Block Removal:</strong> Users can delete weather
          blocks with a confirmation modal.
        </li>
        <li>
          <strong>Favorites Tab:</strong> Users can mark cities as favorites and
          view them in a dedicated tab with a maximum of five cities.
        </li>
        <li>
          <strong>Responsive Design:</strong> A layout adaptable to screens from
          360px to 1200px.
        </li>
        <li>
          <strong>Additional Features (Optional):</strong> Toggle between daily
          and 5-day weather views, default weather based on IP, loading
          indicators, and day/night mode toggle.
        </li>
      </ul>
      <h3>Backend (Nest.js)</h3>
      <ul>
        <li>
          <strong>Authentication:</strong> Secure user authentication using JWT
          Bearer Token, Passport, and bcrypt.
        </li>
        <li>
          <strong>Private Endpoints:</strong> Access to private endpoints is
          restricted to authenticated users.
        </li>
        <li>
          <strong>CRUD Operations:</strong> Full CRUD functionality for user
          management and the favorites list.
        </li>
      </ul>
      <h2>Technologies Used</h2>
      <ul>
        <li>
          <strong>Frontend:</strong> React.js, Fetch/Axios for API calls,
          Chart.js/ApexCharts for graphs.
        </li>
        <li>
          <strong>Backend:</strong> Nest.js with PostgreSQL, bcrypt for password
          hashing, JWT for authentication.
        </li>
        <li>
          <strong>Database:</strong> PostgreSQL.
        </li>
        <li>
          <strong>API:</strong> OpenWeatherMap API for weather data.
        </li>
      </ul>
      <p>
        This app is a hands-on demonstration of creating a fully functional,
        responsive weather forecasting application without relying on CSS
        frameworks or UI libraries, ensuring a custom and unique design.
      </p>
    </div>
  );
}

export default About;
