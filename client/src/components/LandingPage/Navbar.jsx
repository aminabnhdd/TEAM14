import "../../componentsStyles/LandingPage/Navbar.css";
import logo from '../../assets/Screenshot 2025-03-03 at 8.36.18 PM 1.png';
import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

const Navbar = ({ openPopUp }) => {  // Receive openPopUp as a prop
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4, rootMargin: "-10% 0px -35% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="nav-landing">
      <div className="logo-container">
        <img src={logo} alt="Logo" />
        <span>ATHAR</span>
      </div>

      <ul className="nav-links">
        <li className={activeSection === "acceuil" ? "active" : ""}>
          <Link to="acceuil" smooth={true} duration={800} offset={-50}>Accueil</Link>
        </li>
        <li className={activeSection === "features" ? "active" : ""}>
          <Link to="features" smooth={true} duration={800} offset={-50}>Fonctionnalités</Link>
        </li>
        <li className={activeSection === "faq" ? "active" : ""}>
          <Link to="faq" smooth={true} duration={800} offset={-50}>FAQ</Link>
        </li>
      </ul>

      <div className="button-group">
        <button className="button-outline" onClick={()=>   navigate("/connexion")}>Se connecter</button>
        <button className="button-filled" onClick={openPopUp}>S'inscrire</button>  
      </div>
    </nav>
  );
};

export default Navbar;