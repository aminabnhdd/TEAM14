import React, { useState , useCallback  } from "react";
import { MdErrorOutline } from "react-icons/md"; 
import ModifProjectActions from "../../components/Createproject/ModifProjectActions";
import ModifProjectForm from "../../components/Createproject/ModifProjectForm";
import ModifProjectHeader from "../../components/Createproject/ModifProjectHeader";
import ModifProjectImageUploader from "../../components/Createproject/ModifProjectImage";
import "../../pagesStyles/CreateprojectpagesStyle/ModifyProject.css";

const ModifyProject = () => {
  const [error, setError] = useState(false);
    const [newProject, setNewProject] = useState({});
  
    const handleDataChange = useCallback((data) => {
      setNewProject((prev) => ({ ...prev, ...data }));
    }, []);
  
    const handleImageChange = (imageUrl) => {
      setNewProject((prev) => ({ ...prev, image: imageUrl }));
    };

  const handleModifyProject = () => {
    if (!newProject.title || !newProject.type) {
      setError(true);
    } else {
      setError(false);
      console.log("Projet Modifié avec succès !", newProject);
    }
  };

  return (
    <>
      <ModifProjectHeader />
      <div className="create-project-content">
        <ModifProjectImageUploader  onImageChange={handleImageChange} />
        <ModifProjectForm error={error} onDataChange={handleDataChange} />
      </div>
      {error && (
        <div className="error-message">
          <MdErrorOutline className="error-icon" />
          Les champs en rouge doivent être remplis pour modifier un projet
        </div>
      )}
      <ModifProjectActions onModify={handleModifyProject} />
    </>
  );
};

export default ModifyProject;
