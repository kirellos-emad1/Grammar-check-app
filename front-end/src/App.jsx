import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [data, setData] = useState([{}]);
  const [message, setMassage] = useState([{}]);

  useEffect(() => {
    async function getData() {
      const res = await fetch("/data");
      const data = await res.json();
      setData(data);
    }
    getData();
  }, []);
  useEffect(() => {
    async function getMassage() {
      const res = await fetch("/error");
      const dat = await res.json();
      setMassage(dat);
    }
    getMassage();
  }, []);
  const messages = message.error || [];

  const errorSpotted = messages[0];
  console.log(errorSpotted);

  return (
    <>
      {typeof data.isLoggedIn === "undefined" ? (
        <LoadingSpinner />
      ) : (
        <>
          <Navbar isLoggedIn={data.isLoggedIn} username={data.name} />

          <Routes>
            <Route
              path="/"
              element={<HomePage isLoggedIn={data.isLoggedIn} />}
            />
            <Route
              path="/register"
              element={<RegisterPage errMsg={errorSpotted} />}
            />
            <Route path="login" element={<LoginPage errMsg={errorSpotted} />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
