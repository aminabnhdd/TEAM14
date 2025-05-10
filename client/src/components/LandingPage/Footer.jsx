
// footer for landing pge

import React from "react";
import "../../componentsStyles/LandingPage/Footer.css";

import logo from '../../assets/Screenshot 2025-03-03 at 8.36.18 PM 1.png'
const Footer = () => {
  return (
    <footer className="footer1">
      <img src={logo} alt="Logo" className="footer-logo" />
      <p className="footer-text">
        <span id="e14">EQUIPE14</span> | <span className="athar" >ATHAR</span> © 2025
      </p>
    </footer>
  );
};

export default Footer;