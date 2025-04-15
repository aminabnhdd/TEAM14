import imj from "../assets/material-symbols_search.svg"
import "../ComponentsStyles/SearchBar.css";
import ijj from "../assets/gg_profile.svg" 
import { useNavigate } from "react-router-dom";

function SearchBar({ onSearch,title }) {
    const navigate = useNavigate(); 
    const goToProfil = () => {
      navigate("/profil")
    }

  return (
    <div className="rsearch-div">
      <img src={ijj} alt="null" className="rprf" onClick={goToProfil}/>
      <div className="rsearch-bar">
       <input
      type="text"
      placeholder={title}
      onChange={(e) => onSearch(e.target.value)}
      className="rsearch-input"
    />
    <img src={imj} alt="j" className="rsearch-icon" />
    </div>
    </div>
    
   
  );
}

export default SearchBar;