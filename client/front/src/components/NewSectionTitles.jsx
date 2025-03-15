import React from "react";
import { useNavigate } from "react-router-dom";

const NewSectionTitles = () => {
  const navigate = useNavigate();

  return (
    <div className="section-titles">
      <div className="titles">
        <span 
          className="project-title"
          onClick={() => navigate("/info-projets")}
          style={{ cursor: "pointer" }} 
        >
          Informations
        </span>
        <span 
          className="info-title"
          onClick={() => navigate("/projets-expert")}
          style={{ cursor: "pointer" }} 
        >
          Projets
        </span>
      </div>
      <div className="newline"></div>
    </div>
  );
};

export default NewSectionTitles;
