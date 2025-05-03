import React from "react";
import "../../componentsStyles/ProfilStyles/ProjectsContainer.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DEFAULT_IMAGE_URL from '../../assets/cover.png'

const ProjectsContainer = ({ projets = [] }) => { 
  console.log("Received projets:", projets);
  const navigate = useNavigate(); 
  const handleProjectClick = (projectId) => {
    navigate(`/visualisation/${projectId}`); // ✅ Navigate on click
  };
  return (
    <div className="project-section">
      <h3 className="project-heading">Projets</h3>
      <div className="grid-wrapper">
        <div className="project-list">
          {projets?.length > 0 && (
            projets.map((project) => (
              <div key={project._id || project.titre} className="project-item" onClick={() => handleProjectClick(project._id)}>
                <div className="image-wrapper">
                  <img src={project.photoUrl || DEFAULT_IMAGE_URL} alt="Projet" className="project-thumbnail" />
                  <div className="overlay-container">
                    <span className="overlay-title">{project.titre}</span>
                  </div>
                </div>
              </div>
            ))
          ) }
        </div>
      </div>
    </div>
  );
};


export default ProjectsContainer;


