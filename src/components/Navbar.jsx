import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.webp";

function Navbar() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="title-cont">
          <img className="heart" src={logo} alt="Heart Logo" />
        </div>

        {/* Navbar Links */}
        <ul className="navbar-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link nav-headers ${isActive ? "active" : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/calendar"
              className={({ isActive }) =>
                `nav-link nav-headers ${isActive ? "active" : ""}`
              }
            >
              Calendar
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `nav-link nav-headers ${isActive ? "active" : ""}`
              }
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/partners"
              className={({ isActive }) =>
                `nav-link nav-headers ${isActive ? "active" : ""}`
              }
            >
              Partners
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
