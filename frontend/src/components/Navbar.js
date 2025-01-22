import React from "react";
import { Link } from "react-router-dom";
import "../styles/Index.css";

function Navbar({ isLoggedIn, userType }) {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item"></li>
        {!isLoggedIn && (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          </>
        )}
        {isLoggedIn && (
          <>
            <li className="nav-item">
              <Link to="/userDetails" className="nav-link">
                User Details
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/weather" className="nav-link">
                Weather
              </Link>
            </li>
          </>
        )}

        <li className="nav-item">
          <Link to="/about" className="nav-link">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
