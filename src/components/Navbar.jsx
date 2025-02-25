import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.webp";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="nav-main">
      {/* Navbar */}
      <nav className="navbar">
        <div className="title-cont">
          <NavLink to="/" className="logo-active" onClick={() => setIsOpen(false)}>
            <img className="heart" src={logo} alt="Heart Logo" />
          </NavLink>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="hamburger" onClick={toggleMenu}>
          <span className={`line ${isOpen ? "open" : ""}`} />
          <span className={`line ${isOpen ? "open" : ""}`} />
          <span className={`line ${isOpen ? "open" : ""}`} />
        </div>

        {/* Navbar Links */}
        <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link nav-headers ${isActive ? "active" : ""}`
              }
              onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
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
            {" "} | apply to join our {" "}
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
