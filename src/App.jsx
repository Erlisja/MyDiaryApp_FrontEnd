import React from "react";
import { Routes, Route } from "react-router";
import { useState } from "react";
import NavBar from "./components/NavBar";
import WelcomePage from "./pages/WelcomePage";
import DiaryPage from "./pages/DiaryPAge";
import AuthenticationPage from "./pages/AuthenticationPage";
import { getUser } from "./utilities/users-services";
import TimelinePage from "./pages/TimelinePage";
import DailyDiaryPage from "./pages/DailyDiaryPage";

import "./App.css";

function App() {
  const [user, setUser] = useState(getUser());
  return (
    <>
      <h1>My Diary App </h1>
      {user ? (
        <>
          <NavBar />
          <div>Welcome to your Diary {user.username}</div>

          <Routes>
  {/* <Route path="/diary" element={<DiaryPage />} /> */}
  <Route path="/timeline" element={<TimelinePage />} />
  <Route path="/daily-diary" element={<DailyDiaryPage />} />
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
