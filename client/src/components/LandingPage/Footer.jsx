import React from "react";
import "../../componentsStyles/LandingPage/Footer.css";

import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <footer>
      <img src={logo} alt="Logo" className="footer-logo" />
      <p className="footer-text">
        <span id="e14">EQUIPE14</span> | <span className="athar" >ATHAR</span> © 2025
      </p>
    </footer>
  );
};

export default Footer;