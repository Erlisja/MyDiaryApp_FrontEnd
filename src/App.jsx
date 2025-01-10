import React from "react";
import { Routes, Route } from "react-router";
import { useState } from "react";
import NavBar from "./components/NavBar";
import WelcomePage from "./pages/WelcomePage";
import DiaryPage from "./pages/DiaryPAge";
import AuthenticationPage from "./pages/AuthenticationPage";

import "./App.css";

function App() {
  const [user, setUser] = useState('');

  return (
    <>
      <h1>My Diary App </h1>
      {user ? (
        <>
          <NavBar />
          <div>Welcome to your Diary {user}</div>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/diary" element={<DiaryPage />} />
          </Routes>
        </>
      ) : (
        <AuthenticationPage />
      )}
    </>
  );
}

export default App;
