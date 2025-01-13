import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} WLU Heart Club. All rights reserved.
        </p>
        <p>Made with ❤️ by Daniel Volodarsky</p>
        <div className="footer-links">
          <NavLink to="/contact" className="nav-link-footer">
            Contact Us
          </NavLink>
          <NavLink to="/partners" className="nav-link-footer">
            Our Partners
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
