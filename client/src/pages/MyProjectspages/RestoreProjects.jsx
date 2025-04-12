import React from "react";
import RestoreProjectsHeader from "../../components/MyProjects/RestoreProjectsHeader.jsx";
import RestoreProjectsContainer from  "../../components/MyProjects/RestoreProjectsContainer.jsx";
import "../../pagesStyles/MyProjectspagesStyle/RestoreProjects.css";

const RestoreProjects = () => {
  return(
    <>
      <div className="root1">
      <RestoreProjectsHeader />
      <RestoreProjectsContainer />
      </div>
    </>
  );
}

export default RestoreProjects;
