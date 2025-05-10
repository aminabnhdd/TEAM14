
//search bar in the help page
// allow users to find answers for questions they are looking for

import { useState } from "react";
import {FaSearch} from "react-icons/fa";
import "./SearchBarHelp.css";

function SearchBarHelp({ onSearch }) {
  const [query, setQuery] = useState("");

  // perform the search each time the content of the search bar changes
  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Pass search query to parent component
  };

  return (
    <>
  
     <div className="search-div-help">
          <div className="search-bar-help" >
          <input
          type="text"
      placeholder="Rechercher un problème ?"
      value={query}
      onChange={handleChange}
          className="search-input-help"
        />
        <div></div>
    <FaSearch className="search-icon-help " /> 
    </div>
        </div>
       
   </> 
   
  );
}

export default SearchBarHelp;