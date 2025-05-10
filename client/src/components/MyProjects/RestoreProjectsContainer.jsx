import {useContext , useState,useEffect } from "react"; // Import necessary hooks and icons
import { FiRotateCcw } from "react-icons/fi"; 
import { useNavigate } from "react-router-dom"; 
import PopupRestore from "./PopupRestore"; // Import the PopupRestore component
import mesProjets from "../../services/mesProjets.js"; // Import service to manage projects
import AuthContext from '../../helpers/AuthContext' // Import AuthContext to manage authentication state
import RefreshService from "../../services/RefreshService"; // Import service to refresh authentication
import "../../componentsStyles/MyProjectsStyles/RestoreProjectsContainer.css"; // Import styling

import DEFAULT_IMAGE_URL from "../../assets/cover.png"; // Default image for projects

const RestoreProjectsContainer = () => {

  const {authState,setAuthState} = useContext(AuthContext);
  const [archivedProjects, setMyProjects] = useState([]);
  
  const navigate = useNavigate(); 
  
  // Local state for the selected project
  const [selectedProject, setSelectedProject] = useState(null);
  
  useEffect(() => {
    // Fetch archived projects when component mounts
    const getArchived = async () => {
      try {
        const response1= await  RefreshService.Refresh(); // Refresh user auth state
        console.log("here is the response from refresh: ",response1);
        
        // Update auth state with the response data
        setAuthState({email:response1.email,role:response1.role,accessToken:response1.accessToken});
        console.log("the token: ",response1.accessToken);
        
        // Fetch archived projects using the access token
        const projects = await mesProjets.Archived(response1.accessToken);
        
        // Set the projects to the state
        setMyProjects(projects);
      } catch (err) {
        console.error("Erreur lors du getting des projets :", err); // Handle error during fetch
      }
    };
    getArchived(); // Call the function to get archived projects
  }, []); // Empty dependency array means this effect runs once after initial render

  const openPopup = (project) => {
    // Open the popup and set the selected project
    setSelectedProject(project);
  };

  const closePopup = () => {
    // Close the popup by clearing selected project
    setSelectedProject(null);
  };

  const handleRestore = async () => {
    try{
      // If a project is selected, proceed with restore
      if (selectedProject) {
        // Call the restore function and pass the selected project ID
        const response1= await mesProjets.Restore(authState.accessToken, selectedProject._id);
        console.log("here is the response from restore: ",response1);
        
        // Close the popup after restore
        closePopup();
        
        // Redirect user to the "My Projects" page
        navigate("/mesprojets"); 
      }
    }
    catch (err) {
      console.error("Erreur lors de la restauration du projet :", err); // Handle error during restore
    }
  };

  return (
    <div className="restored-projects-grid">
      {archivedProjects.length > 0 ? archivedProjects.map((project) => (
        // Display archived projects in a grid
        <div key={project._id} className="restored-project-card">
          <div className="restored-image-container">
            {/* Display project image or default image */}
            <img src={project.photoUrl || DEFAULT_IMAGE_URL} alt="Archived Project" className="restored-project-image" />
            
            {/* Overlay to show restore icon when clicked */}
            <div className="restored-project-overlay" onClick={() => openPopup(project)}>
              <FiRotateCcw className="restore-project-icon" /> {/* Icon to restore project */}
            </div>
          </div>
        </div>
      )): <p className="pt-2 main-text" >Aucun projet archivé.</p>}

      {/* Show the PopupRestore component if a project is selected */}
      {selectedProject && (
        <PopupRestore
          projectTitle={selectedProject.titre} // Pass project title to the popup
          onClose={closePopup} // Close the popup
          onRestore={handleRestore} // Restore the project when confirmed
        />
      )}
    </div>
  );
};

export default RestoreProjectsContainer;

// This component displays and restores archived projects.
// - It uses `useProjects` to fetch the list of archived projects and the restore function.
// - A local state `selectedProject` stores the currently selected project for restoration.
// - `useNavigate` is used to redirect the user to the "MyProjects" page after a successful restore.
// - When the restore icon is clicked, a confirmation popup (`PopupRestore`) is shown.
// - If the user confirms the restoration, the `handleRestore` function is triggered:
//   - It restores the project via `restoreProject()`.
//   - Closes the popup.
//   - Redirects the user to the active projects page.
