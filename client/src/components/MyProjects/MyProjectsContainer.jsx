
// component containing all of the projects of a user

import "../../componentsStyles/MyProjectsStyles/MyProjectsContainer.css";
import { useNavigate } from "react-router-dom";
import DEFAULT_IMAGE_URL from "../../assets/cover.png"; 
 
const MyProjectsContainer = ({myProjects}) => {
  const navigate = useNavigate();

  // send the user to page creer projet
  const handleAddProjectClick = () => {
    navigate("/create-projet");
  };

  // send the user to the visualisation of the project
  const handleProjectClick = (projetId) => {
    navigate(`/visualisation/${projetId}`);
  };

  return (<>
     <div className="projects-grid">
       
      <div className="add-project"  onClick={handleAddProjectClick}>
        <span className="plus-icon">+</span>
        <p>Créer un nouveau projet</p>
      </div>
      
      {/* display all of the projects of the user */}
      {myProjects.map((project) => (
        <div key={project._id} className="project-card" onClick={() => handleProjectClick(project._id)}>
          <div className="image-container">
            <img src={project.photoUrl || DEFAULT_IMAGE_URL} alt="Projet" className="project-image" />
            <div className="project-overlay">
              <span className="project-title">{project.titre}</span>
            </div>
          </div>
         
        </div>
      ))}
      
    </div>
 
    
    </>
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