import React, { useRef } from "react";
import { FiRotateCcw } from "react-icons/fi";
import "../../componentsStyles/MyProjectsStyles/RestoreProjectsHeader.css";
import { useContext } from "react";
import AuthContext from "../../helpers/AuthContext";
import axios from "axios";

const RestProjectsHeader = () => {
  const {authState} = useContext(AuthContext);
  const fileInputRef = useRef(null);

  const handleLocalRestore = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = async (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
  
          const response = await axios.post('http://localhost:3001/projects/import-projet',{...jsonData}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${authState.accessToken}`
            }});
          console.log(response.data);
  
          alert(response.data.message);
        } catch (error) {
          console.error("Erreur lors de la restauration :", error);
          alert("Le fichier est invalide ou le serveur a échoué.");
        }
      };
  
      reader.readAsText(file); 
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
        accept=".json" 
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default RestProjectsHeader;
