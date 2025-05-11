
// action buttons in the page modifier projet

import React from "react";
import { Save, Loader2 } from "lucide-react"; // Added Loader2 for loading spinner
import "../../componentsStyles/CreateProjectStyles/ModifProjectActions.css";
import { useNavigate } from "react-router-dom";

const ModifProjectActions = ({ onModify, projetId, isLoading = false }) => {
  const navigate = useNavigate();

  // Go back to the project without saving
  const Annuler = () => {
    if (isLoading) return; // Prevent action during loading
    navigate(`/visualisation/${projetId}`);
    console.log("Annuler le projet");
  }


  const handleModify = () => {
    if (isLoading) return; // Prevent action during loading
    onModify();
  }

  return (
    <div className="project-actions">
      <button
        className={`cancelmodif ${isLoading ? 'disabled' : ''}`}
        onClick={Annuler}
        disabled={isLoading}
      >
        Annuler
      </button>

      <button
        className={`createmodif ${isLoading ? 'disabled' : ''}`}
        onClick={handleModify}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="icon-save animate-spin" size={15} style={{ marginRight: "8px" }} />
        ) : (
          <Save className="icon-save" size={15} style={{ marginRight: "8px" }} />
        )}
        {isLoading ? "Sauvegarde..." : "Sauvegarder"}
      </button>
    </div>
  );
};

export default ModifProjectActions;