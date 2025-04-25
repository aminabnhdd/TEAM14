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
    <>
  
     <div className="search-div">
          <div className="search-bar" >
          <input
          type="text"
      placeholder="Rechercher par mots-clés..."
      value={query}
      onChange={handleChange}
          className="search-input"
        />
        <div></div>
    <FaSearch className="search-icon " /> 
    </div>
        </div>
       
   </> 
   
  );
}

export default SearchBar;