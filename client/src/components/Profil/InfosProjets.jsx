import React from "react";
import "../../componentsStyles/ProfilStyles/InfosProjets.css";
import { useNavigate } from "react-router-dom"; 

const InfosProjets = () => { 
  
  const navigate = useNavigate();
  return (       
    <div className="InfosPros-container">
      <div className="InfosPros-tabs">
        <div className="item-Infos" onClick={() => navigate("/afficher-expert")}>Informations</div>
        <div className="item-Pros" onClick={() => navigate("/projets-expert")}>Projets</div>
      </div>
      <div className="InfosPros-line"></div>
    </div>
  );
}

export default InfosProjets;
