import React from "react";
import "../../componentsStyles/ProfilStyles/ProjetsInfos2.css";
import { useNavigate } from "react-router-dom"; 

const ProjetsInfos2 = ()  => { 
  
  const navigate = useNavigate();
  return (       
    <div className="InfosPros2-container2">
      <div className="InfosPros2-tabs2">
        <div className="item2-Infos2"onClick={() => navigate("/desactiver-expert")}>Informations</div>
        <div className="item2-Pros"onClick={() => navigate("/projets-expert2")}>Projets</div>
      </div>
      <div className="InfosPros2-line2"></div>
    </div>
  );
}
export default ProjetsInfos2 ;