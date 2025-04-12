import React, { useState , useCallback ,useContext  } from "react";
import { MdErrorOutline } from "react-icons/md"; 
import ModifProjectActions from "../../components/Createproject/ModifProjectActions";
import ModifProjectForm from "../../components/Createproject/ModifProjectForm";
import ModifProjectHeader from "../../components/Createproject/ModifProjectHeader";
import ModifProjectImageUploader from "../../components/Createproject/ModifProjectImage";
import "../../pagesStyles/CreateprojectpagesStyle/ModifyProject.css";
import {UpdateProject } from "../../services/ModifyProject.js"; 
import AuthContext from '../../helpers/AuthContext'
import { useParams } from "react-router-dom";

const ModifyProject = () => {
  const [error, setError] = useState(false);
    const {authState} = useContext(AuthContext);
    const [newProject, setNewProject] = useState({});
    const { projetId } = useParams();
    
    const handleDataChange = useCallback((data) => {
      setNewProject((prev) => ({ ...prev, ...data }));
    }, []);
  
    const handleImageChange = (file) => {
      setNewProject((prev) => ({ ...prev, image: file }));
    };

    const handleModifyProject = async (newProject) => {
      if (!newProject.titre || !newProject.type) {
          setError(true);
          return;
      }
  
      setError(false);
  
      const formDataToSend = new FormData();
      Object.keys(newProject).forEach((key)  => {
          if (key !== "image") {
              formDataToSend.append(key, newProject[key]);
          }
      });
  
      if (newProject.image) {
          formDataToSend.append("image", newProject.image, newProject.image.name);
      }
  
      try {
          const response = await UpdateProject(projetId,formDataToSend,authState.accessToken);
          console.log("Projet updated :", response);
      } catch (err) {
          console.error("Erreur lors updating du projet :", err);
      }
  };


  return (
    <>
    <div className="root1">
      <ModifProjectHeader />
      <div className="create-project-content">
        <ModifProjectImageUploader  onImageChange={handleImageChange} projetId={projetId} />
        <ModifProjectForm error={error} onDataChange={handleDataChange} projetId={projetId} />
      </div>
      {error && (
        <div className="error-message">
          <MdErrorOutline className="error-icon" />
          Les champs en rouge doivent être remplis pour modifier un projet
        </div>
      )}
      <ModifProjectActions onModify={() => handleModifyProject(newProject)} />
      </div>
    </>
  );
};

export default ModifyProject;

