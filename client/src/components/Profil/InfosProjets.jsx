import React from "react";
import "../../componentsStyles/ProfilStyles/InfosProjets.css";
import { useNavigate } from "react-router-dom"; 

const InfosProjets = ({id}) => { 
  
  const navigate = useNavigate();
  return (       
    <div className="InfosPros-container">
      <div className="InfosPros-tabs">
        <div className="item-Infos" onClick={() => navigate(`/afficher-expert/${id}`)}>Informations</div>
        <div className="item-Pros" onClick={() => navigate(`/projets-expert/${id}`)}>Projets</div>
      </div>
      <div className="InfosPros-line"></div>
    </div>
  );
}

export default InfosProjets;
