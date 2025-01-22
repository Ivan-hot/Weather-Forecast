import React, { useState } from "react";
import "../styles/Index.css";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Временная заглушка
    if (email && password) {
      console.log("Login successful");
      alert("Login successful");
    
    // Сохраняем фиктивные данные в localStorage
    window.localStorage.setItem("token", "fake-token");
    window.localStorage.setItem("userType", "user"); // Тип пользователя, например, "admin" или "user"
    window.localStorage.setItem("loggedIn", true);
    

    window.location.href = "./userDetails";
  } else {
    alert("Please enter email and password");
  }
  
    /*
    console.log(email, password);
    fetch("http://localhost:5000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      
  
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          console.log(data.userType);
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("userType", data.userType);
          window.localStorage.setItem("loggedIn", true);
          window.location.href = "./userDetails";
        }
      });
      */
  }

  

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
            <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}