import React, { useState } from "react";
import { FaCompass, FaRegStickyNote, FaBell } from "react-icons/fa"; 
import { CiStar } from "react-icons/ci";
import { IoIosHelpCircle } from "react-icons/io";
import logo from "../../assets/logo.png";
import "../componentsStyles/ProfilStyles/ExpertSidebar.css";

const ExpertSidebar = () => {
  // État pour suivre si la sidebar est ouverte ou fermée
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Fonction pour basculer l'état de la sidebar
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <header className="sidebar-header">
        <a className="header-logo">
          <img src={logo} alt="Logo" />
        </a>
        <button className="toggler" onClick={toggleSidebar}>
          <span className="material-symbols-rounded">chevron_left</span>
        </button>
      </header>

      <nav className="sidebar-nav">
        <ul className="nav-list primary-nav">
          <li className="nav-item">
            <a className="nav-link">
              <FaCompass />
              <span className="nav-title">Découvrir</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link">
              <CiStar />
              <span className="nav-title">Mes favoris</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link">
              <FaRegStickyNote />
              <span className="nav-title">Mes projets</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link">
              <FaBell />
              <span className="nav-title">Notifications</span>
            </a>
          </li>
        </ul>

        <ul className="nav-list secondary-nav">
          <li className="nav-item">
            <a className="nav-link">
              <IoIosHelpCircle />
              <span className="nav-title">Aide</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default ExpertSidebar;

