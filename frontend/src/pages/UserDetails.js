import React, { useEffect, useState } from "react";
import "../styles/App.css";
import UserHome from "./UserHome";

export default function UserDetails() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    console.log("Current token:", token);
  
    if (!token) {
      alert("No token found. Please log in.");
      window.location.href = "./login";
      return;
    }
  
    fetch("http://localhost:5000/user/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    })
      .then(async (res) => {
        console.log('Response status:', res.status);
        const data = await res.text();
        console.log('Response data:', data);
        
        try {
          const jsonData = JSON.parse(data);
          
          if (!res.ok) {
            if (res.status === 401 || jsonData.message === "Invalid token") {
              throw new Error("token expired");
            }
            throw new Error(jsonData.message || "Failed to fetch user data");
          }
          
          return jsonData;
        } catch (e) {
          if (e.message === "token expired") {
            throw new Error("token expired");
          }
          throw e;
        }
      })
      .then((data) => {
        console.log('Processed data:', data);
        if (data?.message === "token expired") {
          alert("Token expired. Please log in again.");
          window.localStorage.clear();
          window.location.href = "./login";
        } else {
          console.log('Setting user data:', data);
          setUserData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error details:", err);
        if (err.message === "token expired") {
          alert("Token expired. Please log in again.");
        } else {
          alert("Something went wrong. Please try again.");
        }
        window.localStorage.clear();
        window.location.href = "./login";
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading && !userData) {
    return <div>Loading...</div>;
  }

  return userData ? <UserHome userData={userData} /> : null;
}