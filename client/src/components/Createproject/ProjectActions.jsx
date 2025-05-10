
// action buttons in the page creer projet

import React from "react";
import "../../componentsStyles/CreateProjectStyles/ProjectActions.css";
import { useNavigate } from "react-router-dom";

const ProjectActions = ({ onCreate, isLoading }) => {
  const navigate = useNavigate();
  
  // go back to the project without saving
  const
   Annuler = () => {
    if (isLoading) return; // Prevent action during loading
    navigate("/mesprojets");
    console.log("Annuler le projet");
  }

  return (
    <div className="project-actions">
      <button 
        className="cancel" 
        onClick={Annuler}
        disabled={isLoading}
      >
        Annuler
      </button>
      <button 
        className="create" 
        onClick={onCreate}
        disabled={isLoading}
      >
        {isLoading ? "Création en cours..." : "Créer le projet"}
      </button>
    </div>
  );
};

export default ProjectActions;
