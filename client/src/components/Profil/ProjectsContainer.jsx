import React from "react";
import "../../componentsStyles/ProfilStyles/ProjectsContainer.css";

const DEFAULT_IMAGE_URL = "https://previews.123rf.com/images/yupiramos/yupiramos1504/yupiramos150407528/39021519-conception-de-l-informatique-en-nuage-illustration-vectorielle-illustration.jpg";

const projects = [
  { projetId: 1, photoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d4/AlgerCasbah.jpg", title: "La casbah" },
  { projetId: 2, photoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Basilique_Notre_Dame_d%27Afrique2.jpg", title: "Notre-Dame d'Afrique" },
];

const ProjectsContainer = () => {
  return (
    <div className="project-section">
      <h3 className="project-heading">Projets</h3>
      <div className="grid-wrapper">
        <div className="project-list">
          {projects.map((project) => (
            <div key={project.projetId} className="project-item">
              <div className="image-wrapper">
                <img src={project.photoUrl || DEFAULT_IMAGE_URL} alt="Projet" className="project-thumbnail" />
                <div className="overlay-container">
                 <span className="overlay-title">{project.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsContainer;


