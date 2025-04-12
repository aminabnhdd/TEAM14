import React from "react";
import "../../componentsStyles/CreateProjectStyles/ProjectActions.css";
import { useNavigate } from "react-router-dom";

const ProjectActions = ({ onCreate }) => {
  const navigate = useNavigate();
 const Annuler = () => {
    navigate("/mesprojets");
    console.log("Annuler le projet");
  }
  return (
    <div className="project-actions">
      <button className="cancel" onClick={Annuler}>Annuler</button>
      <button className="create" onClick={onCreate}>
        Créer le projet
      </button>
    </div>
  );
};

export default ProjectActions;

/* 
  -- Explication du composant ProjectActions --
  1. Ce composant permet à l'utilisateur d'effectuer des actions liées à la création d'un projet.
  2. Il contient deux boutons :
     - "Annuler" : Ce bouton devra plus tard rediriger l'utilisateur vers une autre page une fois que 
     la navigation sera mise en place.
     - "Créer le projet" : Ce bouton déclenche la fonction `onCreate`, qui est passée en prop et 
     va inclure la vérification des champs obligatoires avant l'envoi des données, ainsi que 
    l'affichage d'erreurs en cas de saisie incomplète .
*/  
