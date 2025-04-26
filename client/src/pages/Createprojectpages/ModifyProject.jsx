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
import { useNavigate } from "react-router-dom";
import SideNav from "../../components/SideNav";
import SearchBar from "../../components/SearchBar.jsx";

const ModifyProject = () => {
  const [error, setError] = useState(false);
    const {authState} = useContext(AuthContext);
    const [newProject, setNewProject] = useState({});
    const navigate = useNavigate();
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
          navigate("/visualisation/" + projetId);
      } catch (err) {
          console.error("Erreur lors updating du projet :", err);
      }
  };


  return (
    <>
    <div className="modifprojetsearchbar">
      <SearchBar />
    </div>
    <SideNav />
    <div className="root1 modifyP">
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
      <ModifProjectActions onModify={() => handleModifyProject(newProject)} projetId={projetId} />
      </div>
    </>
  );
};

export default ModifyProject;

