import './Filters.css';
import {useState, useEffect} from 'react';

function Filters({fetchFilteredProjects}) {
 // Run when filters change
    const [activeFilter, setActiveFilter] = useState("Tout");
 
    const HandleFilterClick = (filter) => {
        setActiveFilter(filter);
        };

      useEffect(() => {
        fetchFilteredProjects(activeFilter);
      }, [activeFilter]);


  return (
    <div className="filters buttons">
      <a onClick={() => HandleFilterClick("Tout")} className={activeFilter === "Tout" ? "active" : ""}>Tout</a>
      <a onClick={() => HandleFilterClick("histoire")} className={activeFilter === "histoire" ? "active" : ""}>Histoire</a>
      <a onClick={() => HandleFilterClick("architecture")} className={activeFilter === "architecture" ? "active" : ""}>Architecture</a>
      <a onClick={() => HandleFilterClick("archeologie")} className={activeFilter === "archeologie" ? "active" : ""}>Archeologie</a>
      <a onClick={() => HandleFilterClick("autre")} className={activeFilter === "autre" ? "active" : ""}>Autre</a>
      {/* Underline animation */}
      
    </div>
  );
}

export default Filters;
