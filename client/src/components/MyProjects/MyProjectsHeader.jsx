
// header of the page mes projets

import { useNavigate } from "react-router-dom"; 
import { FiRotateCcw } from "react-icons/fi";
import "../../componentsStyles/MyProjectsStyles/MyProjectsHeader.css";

const MyProjectsHeader = () => {
  const navigate = useNavigate(); 

  return (
    <div className="my-projects-header">
      <h1>Mes projets</h1>
      <button 
        className="restore-button" 
        onClick={() => navigate("/restoreprojects")}
      >
        <FiRotateCcw />
        Restaurer un projet
      </button>
    </div>
  );
};

export default MyProjectsHeader;

