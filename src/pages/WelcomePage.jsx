import React from "react";
import { Link } from "react-router";

function WelcomePage() {
  return (
    <div className="hero-div" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 className="title">Memoire </h1>
      <h2 className="subtitle">The best mirror is an old diary </h2>

      <div className="auth-container">
      <p className="auth-text">Sign Up to get started or Sign In if you already have an account</p>
      <div className="auth-buttons">
        <Link to="/signup">
          <button className="btn btn-signup">Sign Up</button>
        </Link>

        <Link to="/login">
          <button className="btn btn-signin"> Sign In </button>
        </Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
