import React from "react";
import { FiRotateCcw } from "react-icons/fi";
import "../../componentsStyles/MyProjectsStyles/RestoreProjectsHeader.css";

const RestProjectsHeader = () => {
  return (
    <div className="rest-projects-header">
      <h1>Restaurer un projet</h1>
      <button 
        className="restore-button2"
        onClick={() => console.log("Restauration du projet en cours...")} // A modifier Plus tard
      >
        <FiRotateCcw />
        Restaurer un projet externe
      </button>
    </div>
  );
};

export default RestProjectsHeader;
