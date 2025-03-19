import React from "react";
import "../../componentsStyles/CreateProjectStyles/ProjectActions.css";

const ProjectActions = () => {
  return (
    <div className="project-actions">
      <button className="cancel">Annuler</button>
      <button className="create">Créer le projet</button>
    </div>
  );
};

export default ProjectActions;
