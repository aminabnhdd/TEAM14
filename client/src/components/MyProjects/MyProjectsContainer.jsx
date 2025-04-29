import React , {useContext , useState,useEffect } from "react";
import "../../componentsStyles/MyProjectsStyles/MyProjectsContainer.css";
import { useNavigate } from "react-router-dom";
import mesProjets  from "../../services/mesProjets.js"; 
import AuthContext from '../../helpers/AuthContext'
import RefreshService from "../../services/RefreshService";

import DEFAULT_IMAGE_URL from "../../assets/cover.png"; 
 
const MyProjectsContainer = () => {
  const navigate = useNavigate();
  const {authState,setAuthState} = useContext(AuthContext);
  const [myProjects, setMyProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response1= await  RefreshService.Refresh();
        console.log("here is the response from refresh: ",response1);
        setAuthState({email:response1.email,role:response1.role,accessToken:response1.accessToken})
        console.log("the token: ",response1.accessToken);
        const projects = await mesProjets.Get(response1.accessToken);
        setMyProjects(projects);
      } catch (err) {
        console.error("Erreur lors du getting des projets :", err);
      }
    };
    getProjects();
  }, []);


  const handleAddProjectClick = () => {
    navigate("/create-projet");
  };
  const handleProjectClick = (projetId) => {
    navigate(`/visualisation/${projetId}`);
  };

  return (<>
     <div className="projects-grid">
      
      <div className="add-project"  onClick={handleAddProjectClick}>
        <span className="plus-icon">+</span>
        <p>Créer un nouveau projet</p>
      </div>
      
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




