import React from "react";
import MyProjectsHeader from "../../components/MyProjects/MyProjectsHeader.jsx";
import MyProjectsContainer from "../../components/MyProjects/MyProjectsContainer.jsx";
import "../../pagesStyles/MyProjectspagesStyle/MyProjects.css";
import SideNav from "../../components/SideNav";
import SearchBar from "../../components/SearchBar.jsx";

const MyProjects = () => {
  return(
    <>
       <div className="myprojectssearchbar">
        <SearchBar title="Rechercher un projet..." />
       </div>
      <SideNav />
      <div className="root1">
     <MyProjectsHeader/>
     <MyProjectsContainer />
      </div>
    </>
  );
}
export default MyProjects;