import React from "react";
import { Routes, Route } from "react-router";
import { useState } from "react";
import NavBar from "./components/NavBar";
import WelcomePage from "./pages/WelcomePage";
import AuthenticationPage from "./pages/AuthenticationPage";
import { getUser } from "./utilities/users-services";
import TimelinePage from "./pages/TimelinePage";
import DailyDiaryPage from "./pages/DailyDiaryPage";
import HomePage from "./pages/HomePage";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";

import "./App.css";

function App() {
  const [user, setUser] = useState(getUser());
  return (
    <>
      {user ? (
        <>
         
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/daily-diary" element={<DailyDiaryPage />} />
            <Route path="/navbar" element={<NavBar />} />
            <Route path="/login" element={<LoginForm setUser={setUser} />} />
            <Route path="/signup" element={<SignUpForm setUser={setUser} />} />
            {/* <Route path="/affirmations" element={<AffirmationsPage />} />
  <Route path="/goals" element={<GoalsPage />} />
  <Route path="/profile" element={<ProfilePage />} /> */}
            <Route path="/" element={<WelcomePage />} />
          </Routes>
        </>
      ) : (
        <AuthenticationPage setUser={setUser} />
      )}
    </>
  );
}

export default App;
