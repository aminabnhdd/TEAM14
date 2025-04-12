import React from "react";
import MyProjectsHeader from "../../components/MyProjects/MyProjectsHeader.jsx";
import MyProjectsContainer from "../../components/MyProjects/MyProjectsContainer.jsx";
import "../../pagesStyles/MyProjectspagesStyle/MyProjects.css";

const MyProjects = () => {
  return(
    <>
      <div className="root1">
     <MyProjectsHeader/>
     <MyProjectsContainer />
      </div>
    </>
  );
}
export default MyProjects;