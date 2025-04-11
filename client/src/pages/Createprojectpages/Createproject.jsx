import React, { useState , useCallback } from "react";
import { MdErrorOutline } from "react-icons/md"; 
import ProjectActions from "../../components/Createproject/ProjectActions.jsx";
import ProjectForm from "../../components/Createproject/ProjectForm.jsx";
import ProjectHeader from "../../components/Createproject/ProjectHeader.jsx";
import ProjectImageUploader from "../../components/Createproject/ProjectImageUploader.jsx";
import "../../pagesStyles/CreateprojectpagesStyle/CreateProject.css";

const CreateProject = () => {
  const [error, setError] = useState(false);
  const [newProject, setNewProject] = useState({});

  const handleDataChange = useCallback((data) => {
    setNewProject((prev) => ({ ...prev, ...data }));
  }, []);

  const handleImageChange = (imageUrl) => {
    setNewProject((prev) => ({ ...prev, image: imageUrl }));
  };

  const handleCreateProject = () => {
    if (!newProject.title || !newProject.type) {
      setError(true);
    } else {
      setError(false);
      console.log("Projet créé avec succès !", newProject);
    }
  };

  return (
    <>
      <ProjectHeader />
      <div className="create-project-content">
        <ProjectImageUploader onImageChange={handleImageChange} />
        <ProjectForm error={error} onDataChange={handleDataChange} />
      </div>
      {error && <div className="error-messagec"><MdErrorOutline className="error-iconc" /> Les champs en rouge doivent être remplis</div>}
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