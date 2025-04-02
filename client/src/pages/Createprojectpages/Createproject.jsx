import React, { useState , useCallback,useContext } from "react";
import { MdErrorOutline } from "react-icons/md"; 
import ProjectActions from "../../components/Createproject/ProjectActions.jsx";
import ProjectForm from "../../components/Createproject/ProjectForm.jsx";
import ProjectHeader from "../../components/Createproject/ProjectHeader.jsx";
import ProjectImageUploader from "../../components/Createproject/ProjectImageUploader.jsx";
import "../../pagesStyles/CreateprojectpagesStyle/CreateProject.css";
import { addProject } from "../../services/projetService.js"; 
import AuthContext from '../../helpers/AuthContext'
import RefreshService from "../../services/RefreshService";


const CreateProject = () => {
  const [error, setError] = useState(false);
  const {authState,setAuthState} = useContext(AuthContext);
  const [newProject, setNewProject] = useState({});

  const handleDataChange = useCallback((data) => {
    setNewProject((prev) => ({ ...prev, ...data }));
  }, []);

  const handleImageChange = (file) => {
    setNewProject((prev) => ({ ...prev, image: file })); 
  };


  const handleCreateProject = async () => {
    if (!newProject.titre || !newProject.type) {
        setError(true);
        return;
    }

    setError(false);

    const formDataToSend = new FormData();
    Object.keys(newProject).forEach((key) => {
        if (key !== "image") {
            formDataToSend.append(key, newProject[key]);
        }
    });

    if (newProject.image) {
        formDataToSend.append("image", newProject.image, newProject.image.name);
    }

    try {

      const response1= await  RefreshService.Refresh();
       
      setAuthState({email:response1.email,role:response1.role,accessToken:response1.accessToken});
      
        const response = await addProject(formDataToSend,response1.accessToken);
        console.log("Projet ajouté :", response);
    } catch (err) {
        console.error("Erreur lors de l'ajout du projet :", err);
    }
};

  return (
    <>
      <ProjectHeader />
      <div className="create-project-content">
        <ProjectImageUploader onImageChange={handleImageChange} />
        <ProjectForm error={error} onDataChange={handleDataChange} />
      </div>
      {error && <div className="error-message"><MdErrorOutline className="error-icon" /> Les champs en rouge doivent être remplis</div>}
      <ProjectActions onCreate={handleCreateProject} />
    </>
  );
};

export default CreateProject;

/*
Commentaires :

- `useState` : Gère l'état du formulaire (`newProject`) et les erreurs de validation (`error`).
- `useCallback` : Optimise la mise à jour du projet en évitant de recréer la fonction `handleDataChange`
 à chaque rendu.
- `handleDataChange` : Met à jour dynamiquement les données du projet lorsque l'utilisateur remplit le 
formulaire.
- `handleImageChange` : Stocke l'URL de l'image téléchargée et l'ajoute aux données du projet.
- `handleCreateProject` : Vérifie si les champs obligatoires (`title` et `type`) sont remplis avant
 d'envoyer les données.
- `ProjectHeader` : Affiche l'en-tête du formulaire.
- `ProjectImageUploader` : Permet à l'utilisateur d'ajouter une image au projet.
- `ProjectForm` : Contient les champs de saisie du projet et gère la mise à jour des données.
- `ProjectActions` : Contient les boutons d'action, notamment la création du projet.
- Affichage d'un message d'erreur si des champs obligatoires sont vides.
*/