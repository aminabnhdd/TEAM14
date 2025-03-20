import React from "react";
import { Save } from "lucide-react"; 
import "../../componentsStyles/CreateprojectStyles/ModifProjectActions.css";

const ModifProjectActions = ({ onModify }) => {
  return (
    <div className="project-actions">
      <button className="cancel">Annuler</button>
      <button className="create" onClick={onModify}>
      <Save className="icon-save" size={15} style={{ marginRight: "8px" }} />
        Sauvegarder
      </button>
    </div>
  );
};

export default ModifProjectActions;
