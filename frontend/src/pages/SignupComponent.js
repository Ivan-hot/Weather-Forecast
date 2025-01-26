import React, { useState } from "react";
import "../styles/Index.css";

export default function SignUp() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!fname.trim()) {
      newErrors.fname = "First name is required";
    }

    if (!lname.trim()) {
      newErrors.lname = "Last name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: fname,
        lastName: lname,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User registered successfully") {
          alert("Registration Successful");
          window.location.href = "./login";
        } else {
          alert(data.message || "Registration failed");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Register</h3>

          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className={`form-control ${errors.fname ? 'is-invalid' : ''}`}
              placeholder="First name"
              value={fname}
              onChange={(e) => {
                setFname(e.target.value);
                setErrors({ ...errors, fname: '' });
              }}
            />
            {errors.fname && <div className="invalid-feedback">{errors.fname}</div>}
          </div>

          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className={`form-control ${errors.lname ? 'is-invalid' : ''}`}
              placeholder="Last name"
              value={lname}
              onChange={(e) => {
                setLname(e.target.value);
                setErrors({ ...errors, lname: '' });
              }}
            />
            {errors.lname && <div className="invalid-feedback">{errors.lname}</div>}
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: '' });
              }}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: '' });
              }}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/login">sign in?</a>
          </p>
        </form>
      </div>
    </div>
  );
}