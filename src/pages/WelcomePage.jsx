import React from "react";
import { Link } from "react-router";

function WelcomePage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1> Welcome </h1>
      <h2>The best mirror is an old diary </h2>
      <br />
      <br />
      <p>Sign Up to get started or Sign In if you already have an account</p>
      <br />
      <br />
      <div>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>

        <Link to="/login">
          <button>Log In </button>
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;
