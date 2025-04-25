import imj from "../assets/material-symbols_search.svg"
import "../ComponentsStyles/SearchBar.css";
import { useState, useEffect, useContext } from "react";
import AuthContext from '../helpers/AuthContext';
import { useNavigate } from "react-router-dom";
import { FaUser } from 'react-icons/fa';
import Pfp from "./pfp";


function SearchBar({ onSearch,title ,fixed=false,admin=false }) {
    const navigate = useNavigate(); 

    const { setAuthState } = useContext(AuthContext);

    const [user,setUser]=useState(null);
          //const imgUrl = user.pfp ;
        
          //temporary
          const imgUrl = "";

    
          const handleClick = () => {
            navigate(`/modifier-${authState.role === "Expert" ? "expert" : "visiteur"}`); // Change this to your desired route
          };
    const title2=title || "Rechercher un projet...";

  return (
    <div className="rsearch-div sticky top-0 right-0 ">
      <div className="rsearch-bar" >
       <input
      type="text"
      placeholder={title2}
      onChange={(e) => onSearch(e.target.value)}
      className="rsearch-input"
    />
    <img src={imj} alt="j" className="rsearch-icon" />
    </div>
   <Pfp fixed={fixed} admin={admin}/>
    </div>
    
   
  );
}

export default SearchBar;