import React from "react";
import { Save } from "lucide-react"; 
import "../../componentsStyles/CreateprojectStyles/ModifProjectActions.css";
import { useNavigate } from "react-router-dom";

const ModifProjectActions = ({ onModify ,projetId}) => {
  const navigate = useNavigate();
  const Annuler = () => {
    navigate(`/visualisation/${projetId}`);
    console.log("Annuler le projet");
  }
  return (
    <div className="project-actions">
      <button className="cancel" onClick={Annuler}>Annuler</button>
      <button className="create" onClick={onModify}>
      <Save className="icon-save" size={15} style={{ marginRight: "8px" }} />
        Sauvegarder
      </button>
    </div>
  );
};

export default ModifProjectActions;
