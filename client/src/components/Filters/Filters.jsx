import './Filters.css';
import {useState} from 'react';

function Filters({fetchFilteredProjects}) {
 // Run when filters change
    const [activeFilter, setActiveFilter] = useState("Tout");
 
    const HandleFilterClick = (filter) => {
        setActiveFilter(filter);
        fetchFilteredProjects(activeFilter);  // Call the function passed from parent
        
      };


  return (
    <div className="filters">
      <a onClick={() => HandleFilterClick("Tout")} className={activeFilter === "Tout" ? "active" : ""}>Tout</a>
      <a onClick={() => HandleFilterClick("Histoire")} className={activeFilter === "Histoire" ? "active" : ""}>Histoire</a>
      <a onClick={() => HandleFilterClick("Architecture")} className={activeFilter === "Architecture" ? "active" : ""}>Architecture</a>
      <a onClick={() => HandleFilterClick("Archeologie")} className={activeFilter === "Archeologie" ? "active" : ""}>Archeologie</a>
      <a onClick={() => HandleFilterClick("Autre")} className={activeFilter === "Autre" ? "active" : ""}>Autre</a>
      {/* Underline animation */}
      
    </div>
  );
}

export default Filters;
