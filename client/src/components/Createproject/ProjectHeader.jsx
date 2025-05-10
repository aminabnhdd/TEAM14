
// header for the page creer projet

import React from "react";
import "../../componentsStyles/CreateProjectStyles/ProjectHeader.css";

const ProjectHeader = () => {
  return (
    <div className="project-header">
      <h1>Créer un projet</h1>
      <p>Entrez les informations de votre nouveau projet. Vous pourrez toujours les modifier plus tard.</p>
    </div>
  );
};

export default ProjectHeader;
