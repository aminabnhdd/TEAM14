import imj from "../../assets/material-symbols_search.svg"
import "../../ComponentsStyles/SearchBar styles/SearchBar.css";

function SearchBar({ onSearch,title }) {

  

  return (
    <div className="search-div">
      <div className="search-bar">
       <input
      type="text"
      placeholder={title}
      onChange={(e) => onSearch(e.target.value)}
      className="search-input"
    />
    <img src={imj} alt="j" className="search-icon" />
    </div>
    </div>
    
   
  );
}

export default SearchBar;