import imj from "../assets/material-symbols_search.svg"
import "../ComponentsStyles/SearchBar.css";
import { useState, useEffect, useContext } from "react";
import AuthContext from '../helpers/AuthContext';
import defaultPfp from "../assets/Default_pfp.svg.png";
import { useNavigate } from "react-router-dom";
import { FaUser } from 'react-icons/fa';



function SearchBar({ onSearch,title  }) {
    const navigate = useNavigate(); 

    const { setAuthState } = useContext(AuthContext);

    const [user,setUser]=useState(null);
          //const imgUrl = user.pfp ;
        
          //temporary
          const imgUrl = "";

    
          const handleClick = () => {
            navigate(`/modifier-${authState.role === "Expert" ? "expert" : "visiteur"}`); // Change this to your desired route
          };
    const title2=title || "Rechercher un Projet...";

  return (
    <div className="rsearch-div">
      <div className="rsearch-bar" >
       <input
      type="text"
      placeholder={title2}
      onChange={(e) => onSearch(e.target.value)}
      className="rsearch-input"
    />
    <img src={imj} alt="j" className="rsearch-icon" />
    </div>
  <div
  className={`rprf w-12 w-12 border-2 border-white ${!imgUrl && "border-brown"} 
             `}
  onClick={handleClick}
>
  {imgUrl ? <img src={imgUrl} /> :
  <FaUser className="text-brown w-6 h-6" /> }
</div>
    </div>
    
   
  );
}

export default SearchBar;