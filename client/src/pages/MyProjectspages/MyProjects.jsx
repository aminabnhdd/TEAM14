import React from "react";
import MyProjectsHeader from "../../components/MyProjects/MyProjectsHeader.jsx";
import MyProjectsContainer from "../../components/MyProjects/MyProjectsContainer.jsx";
import "../../pagesStyles/MyProjectspagesStyle/MyProjects.css";

const MyProjects = () => {
  return(
    <>
     <MyProjectsHeader/>
     <MyProjectsContainer />
    </>
  );
}
export default MyProjects;