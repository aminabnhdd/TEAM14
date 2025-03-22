import React from "react";
import RestoreProjectsHeader from "../../components/MyProjects/RestoreProjectsHeader.jsx";
import RestoreProjectsContainer from  "../../components/MyProjects/RestoreProjectsContainer.jsx";
import "../../pagesStyles/MyProjectspagesStyle/RestoreProjects.css";

const RestoreProjects = () => {
  return(
    <>
      <RestoreProjectsHeader />
      <RestoreProjectsContainer />
    </>
  );
}

export default RestoreProjects;
