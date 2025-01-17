import { Link } from "react-router";
import { logOut } from "../utilities/users-services";
import { getUser } from "../utilities/users-services";
import { useState, useEffect } from "react";

function NavBar({ layout, handleLogOut }) {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    // Set user state on component mount
    setUser(getUser());
  }, []);

  function handleLogOut() {
    // Delegate to logOut function in users-service and update state
    logOut();
    // Update state will trigger re-render in App
    setUser(null);
  }
  return (
    <nav
      className={`navbar navbar-light ${
        layout === "horizontal" ? "navbar-expand-lg" : "navbar-vertical"
      }`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          Memoire
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${
            layout === "vertical" ? "navbar-vertical-collapse" : ""
          }`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/daily-diary">
                Daily Diary
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/timeline">
                Timeline
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/affirmations">
                Affirmations
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/goals">
                Goals
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
          </ul>
          <Link
            to="/login"
            className="btn btn-outline-danger"
            onClick={handleLogOut}
          >
            Log Out
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default  NavBar;
