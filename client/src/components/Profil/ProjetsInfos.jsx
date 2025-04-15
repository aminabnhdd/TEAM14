import React from "react";
import "../../componentsStyles/ProfilStyles/ProjetsInfos.css";
import { useNavigate } from "react-router-dom"; 

const ProjetsInfos = ({id})  => { 
  
  const navigate = useNavigate();
  return (       
    <div className="InfosPros2-container">
      <div className="InfosPros2-tabs">
        <div className="item2-Infos" onClick={() => navigate(`/afficher-expert/${id}`)}>Informations</div>
        <div className="item2-Pros"onClick={() => navigate(`/projets-expert/${id}`)}>Projets</div>
      </div>
      <div className="InfosPros2-line"></div>
    </div>
  );
}
export default ProjetsInfos ;