import React, { useEffect, useState } from "react";
import "../styles/App.css";
import UserHome from "./UserHome";

export default function UserDetails() {
  const [userData, setUserData] = useState("");

  useEffect(() => {

      // Заглушка вместо реального API-запроса
    const token = window.localStorage.getItem("token");

    if (!token) {
      alert("No token found. Please log in.");
      window.location.href = "./login";
    } else if (token === "fake-token") { // Проверка фиктивного токена
      // Симуляция ответа сервера
      const fakeData = {
        name: "John Doe",
        email: "john.doe@example.com",
        userType: "user",
      };

      setUserData(fakeData);
    } else {
      alert("Invalid token. Please log in again.");
      window.localStorage.clear();
      window.location.href = "./login";
    }
  }, []);
  
    /*
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");

        setUserData(data.data);

        if (data.data === "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./login";
        }
      });
  }, []);

  */

  return <UserHome userData={userData} />;
}
