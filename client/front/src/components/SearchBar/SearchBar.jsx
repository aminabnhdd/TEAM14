import { useState } from "react";
import {FaSearch} from "react-icons/fa";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Pass search query to parent component
  };

  return (
    <div className="search-container">
       <input
      type="text"
      placeholder="Rechercher Un Projet..."
      value={query}
      onChange={handleChange}
      className="search-input"
    />
    <FaSearch className="search-icon" /> 
    </div>
   
  );
}

export default SearchBar;