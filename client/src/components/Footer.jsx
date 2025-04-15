/*import { useState } from "react";
import {FaSearch} from "react-icons/fa";
import "../componentsStyles/SearchBar.css";
import ijj from "../assets/gg_profile.svg" 
import { useNavigate } from "react-router-dom";

function SearchBar({ onSearch }) {

  const navigate = useNavigate(); 
  const goToProfil = () => {
    navigate("/profil")
  }

  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Pass search query to parent component
  };

  return  (
    <div className="search-div sticky top-0 px-5 py-6 bg-white  z-[9999] relative flex items-center">
      <div className="relative w-full  max-w-[88%] mx-auto">
        <input 
          type="text"
          placeholder="Rechercher Un Projet..."
          value={query}
          onChange={handleChange}
          className="search-input "
        />
        <FaSearch className="search-icon" />
      </div>
      <img
        src={ijj}
        alt="Profil"
        className="prf absolute right-5"
        onClick={goToProfil}
      />
    </div>
  );
  
}

export default SearchBar;*/

import logo from "../assets/Screenshot 2025-03-03 at 8.36.18 PM 1.png"
import '../componentsStyles/Footer.css'

export default function Footer() {
    return (
        <div className="footer">
            <img className="footer-logo" src={logo} alt="Logo" />
            <p className="footer-text">
                EQUIPE14 | <span className="footer-brand">ATHAR</span> © 2025
            </p>
        </div>
    )
}