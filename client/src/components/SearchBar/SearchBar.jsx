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
  
     <div className="rsearch-div">
          <div className="rsearch-bar" >
          <input
          type="text"
      placeholder="Rechercher par mots-clés..."
      value={query}
      onChange={handleChange}
          className="rsearch-input"
        />
        <div></div>
    <FaSearch className="rsearch-icon " /> 
    </div>
        </div>
       
   </> 
   
  );
}

export default SearchBar;