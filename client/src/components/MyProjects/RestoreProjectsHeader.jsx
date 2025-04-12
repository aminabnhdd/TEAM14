import React, { useRef } from "react";
import { FiRotateCcw } from "react-icons/fi";
import "../../componentsStyles/MyProjectsStyles/RestoreProjectsHeader.css";

const RestProjectsHeader = () => {
  const fileInputRef = useRef(null);

  const handleLocalRestore = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Fichier sélectionné :", file.name);
    }
  };
  
  return (
    <div className="rest-projects-header">
      <h1>Restaurer un projet</h1>

      <div className="restore-buttons-container">
        <button 
          className="restore-button2"
          onClick={() => console.log("Restauration du projet en cours...")}
        >
          <FiRotateCcw />
          Restaurer en externe
        </button>
        
        <button 
          className="restore-button2"
          onClick={handleLocalRestore}
        >
          <FiRotateCcw />
          Restaurer en local
        </button>
      </div>

      <input
        type="file"
        accept=".zip,.json,.txt,.project" 
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default RestProjectsHeader;
