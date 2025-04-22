import React , {useContext , useState,useEffect } from "react";
import { FiRotateCcw } from "react-icons/fi"; 
import { useNavigate } from "react-router-dom"; 
import PopupRestore from "./PopupRestore";
import mesProjets  from "../../services/mesProjets.js"; 
import AuthContext from '../../helpers/AuthContext'
import RefreshService from "../../services/RefreshService";
import "../../componentsStyles/MyProjectsStyles/RestoreProjectsContainer.css";

const DEFAULT_IMAGE_URL = "https://previews.123rf.com/images/yupiramos/yupiramos1504/yupiramos150407528/39021519-conception-de-l-informatique-en-nuage-illustration-vectorielle-illustration.jpg"; 

const RestoreProjectsContainer = () => {
  const {authState,setAuthState} = useContext(AuthContext);
  const [archivedProjects, setMyProjects] = useState([]);
  const navigate = useNavigate(); 
  const [selectedProject, setSelectedProject] = useState(null);
  useEffect(() => {
    const getArchived = async () => {
      try {
        const response1= await  RefreshService.Refresh();
        console.log("here is the response from refresh: ",response1);
        setAuthState({email:response1.email,role:response1.role,accessToken:response1.accessToken})
        console.log("the token: ",response1.accessToken);
        const projects = await mesProjets.Archived(response1.accessToken);
        setMyProjects(projects);
      } catch (err) {
        console.error("Erreur lors du getting des projets :", err);
      }
    };
    getArchived();
  }, []);

  const openPopup = (project) => {
    setSelectedProject(project);
  };

  const closePopup = () => {
    setSelectedProject(null);
  };

  const handleRestore = async () => {
    try{
    if (selectedProject) {
      const response1= await mesProjets.Restore(authState.accessToken, selectedProject._id);
      console.log("here is the response from restore: ",response1);
      closePopup();
      navigate("/mesprojets"); 
    }}
    catch (err) {
      console.error("Erreur lors de la restauration du projet :", err);
    }
  };
 



  return (
    <div className="restored-projects-grid">
      {archivedProjects.length > 0 ? archivedProjects.map((project) => (
        <div key={project._id} className="restored-project-card">
          <div className="restored-image-container">
            <img src={project.photoUrl || DEFAULT_IMAGE_URL} alt="Archived Project" className="restored-project-image" />
            <div className="restored-project-overlay" onClick={() => openPopup(project)}>
              <FiRotateCcw className="restore-project-icon" />
            </div>
          </div>
        </div>
      )): <p className="pt-2 main-text" >Aucune projet archivé.</p>}

      {selectedProject && (
        <PopupRestore
          projectTitle={selectedProject.titre}
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
