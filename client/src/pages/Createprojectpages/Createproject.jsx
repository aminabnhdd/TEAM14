import React from "react";
import ProjectActions from "../../components/Createproject/ProjectActions";
import ProjectForm from "../../components/Createproject/ProjectForm";
import ProjectHeader from "../../components/Createproject/ProjectHeader";
import ProjectImageUploader from "../../components/Createproject/ProjectImageUploader";
import "../../pagesStyles/CreateprojectpagesStyle/CreateProject.css";

const CreateProject = () => {
  return (
      <>
      <ProjectHeader />
      <div className="create-project-content">
        <ProjectImageUploader />
        <ProjectForm />
      </div>
      <ProjectActions />
      </>

 
  );
};

export default CreateProject;
