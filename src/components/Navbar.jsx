import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.webp";

function Navbar() {
  return (
    <div className="nav-main">
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

      {/* Thin Line Interest Form Prompt */}
      <div className="interest-form-bar">
        <strong>
          <i>
            Interested in joining? Fill out our{" "}
            <a
              href="https://docs.google.com/forms/d/1YMaP0xsD7NltS4F9Ka9lN7hfFeIkibwkDoI6TUhoGd8/viewform?edit_requested=true"
              target="_blank"
              rel="noopener noreferrer"
              className="interest-link"
            >
              interest form ❤️
            </a>
            {" "}| apply to join our {" "}
            <a
              href="https://docs.google.com/forms/d/1JHTQW4y0IgU-nAFokCT1vvQjo60L-s11GDOgo_JqWqs/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="interest-link"
            >
              BLS Certification Class 🎟️
            </a>
          </i>
        </strong>
      </div>

    </div>
  );
}

export default Navbar;
