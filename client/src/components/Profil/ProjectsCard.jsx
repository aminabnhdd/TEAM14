import React from "react";
import "../../componentsStyles/ProfilStyles/ProjectsCard.css";

const projects = [
  { id: 1, image: "image1.jpg", link: "/projet-1" },
  { id: 2, image: "image2.jpg", link: "/projet-2" },
  { id: 3, image: "image3.jpg", link: "/projet-3" },
  { id: 4, image: "image4.jpg", link: "/projet-4" },
];

const ProjetsCard = () => {
  return (
    <div className="container2">
      <div className="header-projects">
        <h3 className="Titre_Projets">Projets</h3>
      </div>
      <div className="projects-container">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-card"
            onClick={() => window.location.href = project.link}
          >
            <img src={project.image} alt={`Projet ${project.id}`} className="project-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjetsCard;

