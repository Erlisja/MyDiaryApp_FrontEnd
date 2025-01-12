import { useState } from "react";
import { Routes, Route } from "react-router";
import WelcomePage from "./WelcomePage";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { getUser } from "../utilities/users-services";
import HomePage from "./HomePage";



function AuthenticationPage({ setUser }) {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/signup" element={<SignUpForm setUser={setUser} />} />
      <Route path="/login" element={<LoginForm setUser={setUser} />} />
      <Route path="/home" element={<HomePage  />} />
    </Routes>
  );
}

export default AuthenticationPage;
