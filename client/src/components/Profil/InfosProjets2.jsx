// component for switching between the user's informations and his projects

import "../../componentsStyles/ProfilStyles/InfosProjets2.css";
import { useNavigate } from "react-router-dom"; 

const InfosProjets2 = ({id}) => { 
  
  const navigate = useNavigate();
  return (       
    <div className="InfosPros-container2">
      <div className="InfosPros-tabs2">
        <div className="item-Infos2" onClick={() => navigate(`/desactiver-expert/${id}`)}>Informations</div>
        <div className="item-Pros2" onClick={() => navigate(`/projets-expert2/${id}`)}>Projets</div>
      </div>
      <div className="InfosPros-line2"></div>
    </div>
  );
}

export default InfosProjets2;