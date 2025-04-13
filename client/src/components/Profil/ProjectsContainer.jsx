import React from "react";
import "../../componentsStyles/ProfilStyles/ProjectsContainer.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DEFAULT_IMAGE_URL = "https://previews.123rf.com/images/yupiramos/yupiramos1504/yupiramos150407528/39021519-conception-de-l-informatique-en-nuage-illustration-vectorielle-illustration.jpg";


const ProjectsContainer = ({ projets = [] }) => { 
  console.log("Received projets:", projets);

  return (
    <div className="project-section">
      <h3 className="project-heading">Projets</h3>
      <div className="grid-wrapper">
        <div className="project-list">
          {projets?.length > 0 && (
            projets.map((project) => (
              <div key={project._id || project.titre} className="project-item">
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


