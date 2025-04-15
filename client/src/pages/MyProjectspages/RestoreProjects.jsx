import React from "react";
import RestoreProjectsHeader from "../../components/MyProjects/RestoreProjectsHeader.jsx";
import RestoreProjectsContainer from  "../../components/MyProjects/RestoreProjectsContainer.jsx";
import "../../pagesStyles/MyProjectspagesStyle/RestoreProjects.css";
import SideNav from "../../components/SideNav";
import SearchBar from "../../components/SearchBar.jsx";

const RestoreProjects = () => {
  return(
    <>
      <div className="restaurerprojetssearchbar">
        <SearchBar />
       </div>
      <SideNav />
      <div className="root1">
      <RestoreProjectsHeader />
      <RestoreProjectsContainer />
      </div>
    </>
  );
}

export default RestoreProjects;
