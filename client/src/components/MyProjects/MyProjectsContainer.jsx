import React from "react";
import { useProjects } from "../../context/ProjectsContext.jsx";
import "../../componentsStyles/MyProjectsStyles/MyProjectsContainer.css";


const DEFAULT_IMAGE_URL = "https://previews.123rf.com/images/yupiramos/yupiramos1504/yupiramos150407528/39021519-conception-de-l-informatique-en-nuage-illustration-vectorielle-illustration.jpg"; 

const MyProjectsContainer = () => {
  const { myProjects } = useProjects();

  return (
    <div className="projects-grid">
      
      <div className="add-project">
        <span className="plus-icon">+</span>
        <p>Créer un nouveau projet</p>
      </div>
      
      {myProjects.map((project) => (
        <div key={project.projetId} className="project-card">
          <div className="image-container">
            <img src={project.photoUrl || DEFAULT_IMAGE_URL} alt="Projet" className="project-image" />
            <div className="project-overlay">
              <span className="project-title">{project.title}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyProjectsContainer;

// Ce composant affiche une liste de projets de l'utilisateur.
// - Il utilise le contexte `useProjects` pour récupérer les projets stockés dans l'état global.
// - Une section "Créer un nouveau projet" est affichée en premier, permettant à l'utilisateur 
// d'ajouter un nouveau projet.
// - Ensuite, la liste des projets est parcourue avec `map()`, et chaque projet est affiché sous forme 
// de carte.
// - Chaque carte de projet contient une image, un titre




