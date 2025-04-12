import React, { useState } from "react";
import { useProjects } from "../../context/ProjectsContext.jsx";
import { FiRotateCcw } from "react-icons/fi"; 
import { useNavigate } from "react-router-dom"; 
import PopupRestore from "./PopupRestore";
import "../../componentsStyles/MyProjectsStyles/RestoreProjectsContainer.css";

const DEFAULT_IMAGE_URL = "https://previews.123rf.com/images/yupiramos/yupiramos1504/yupiramos150407528/39021519-conception-de-l-informatique-en-nuage-illustration-vectorielle-illustration.jpg"; 

const RestoreProjectsContainer = () => {
  const { archivedProjects, restoreProject } = useProjects();
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate(); // Pour rediriger après la restauration

  const openPopup = (project) => {
    setSelectedProject(project);
  };

  const closePopup = () => {
    setSelectedProject(null);
  };

  const handleRestore = () => {
    if (selectedProject) {
      restoreProject(selectedProject);
      closePopup();
      navigate("/myprojects"); // Redirige vers MyProjects après restauration
    }
  };

  return (
    <div className="restored-projects-grid">
      {archivedProjects.map((project) => (
        <div key={project.projetId} className="restored-project-card">
          <div className="restored-image-container">
            <img src={project.photoUrl || DEFAULT_IMAGE_URL} alt="Archived Project" className="restored-project-image" />
            <div className="restored-project-overlay" onClick={() => openPopup(project)}>
              <FiRotateCcw className="restore-project-icon" />
            </div>
          </div>
        </div>
      ))}

      {selectedProject && (
        <PopupRestore
          projectTitle={selectedProject.title}
          onClose={closePopup}
          onRestore={handleRestore} 
        />
      )}
    </div>
  );
};

export default RestoreProjectsContainer;

// Ce composant permet d'afficher et de restaurer les projets archivés.
// - Il utilise `useProjects` pour récupérer la liste des projets archivés et la fonction de restauration.
// - Un état local `selectedProject` permet de stocker temporairement le projet sélectionné pour 
// la restauration.
// - `useNavigate` est utilisé pour rediriger l'utilisateur vers la page "MyProjects" après une 
// restauration réussie.
// - Lorsqu'on clique sur l'icone de restauration , une popup de confirmation (`PopupRestore`) s'ouvre.
// - Si l'utilisateur confirme la restauration, la fonction `handleRestore` est déclenchée :
//   - Elle restaure le projet via `restoreProject()`.
//   - Elle ferme la popup.
//   - Elle redirige l'utilisateur vers la page des projets actifs.
