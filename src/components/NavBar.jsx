import { Link } from "react-router";
import { logOut } from "../utilities/users-services";
import { getUser } from "../utilities/users-services";
import { useState, useEffect } from "react";
import {
  House,
  Book,
  Calendar4Week,
  Feather,
  PinMap,
  Person,
  PersonCircle,
  BoxArrowLeft,
} from "react-bootstrap-icons";

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
          Mémoire
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
                <House /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/daily-diary">
                <Book /> Diary
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/timeline">
                <Calendar4Week /> Timeline
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/manifestations">
                <Feather /> Manifestations
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/goals">
                <PinMap /> Goals
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                <Person /> Profile
              </Link>
            </li>
            <li className="nav-item1">
              <Link to="/login" className="nav-link" onClick={handleLogOut}>
                <BoxArrowLeft /> Log Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
