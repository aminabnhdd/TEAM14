import React, { useState } from "react";
import { ChevronDown } from "lucide-react"; // Icône de flèche
import "../../componentsStyles/CreateProjectStyles/ProjectForm.css";

const ALLOWED_SECTION_TYPES = ["Architecture", "Archéologie", "Histoire", "Autre"];

const ProjectForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [customType, setCustomType] = useState(""); // Saisie utilisateur si "Autre"

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (type) => {
    setSelectedType(type);
    if (type === "Autre") {
      setCustomType(""); // Permettre la saisie libre
    }
    setIsOpen(false);
  };

  return (
    <div className="project-form">
      <label className="required">
        <span className="label-text">Titre du projet</span>
        <input type="text" placeholder="Ajoutez un titre" />
      </label>

      <label className="required"> 
        <span className="label-text">Type de la ressource</span>
        <div className="custom-select-container">
          <input
            type="text"
            value={selectedType === "Autre" ? customType : selectedType || "Choisissez un type"}
            placeholder="Choisissez un type"
            readOnly={selectedType !== "Autre"}
            className="custom-input"
            onChange={(e) => setCustomType(e.target.value)}
          />
          <div className="dropdown-icon-container" onClick={toggleDropdown}>
            <ChevronDown size={20} className="dropdown-icon" />
          </div>
      </div>
        {isOpen && (
          <ul className="dropdown-menu">
            {ALLOWED_SECTION_TYPES.map((type, index) => (
              <li key={index} onClick={() => handleSelect(type)}>
                {type}
              </li>
            ))}
          </ul>
        )}
      </label>


      <label>
        Style
        <input type="text" placeholder="Entrez le style de la ressource" />
      </label>
      

      <label>
        Date de construction
        <input type="text" placeholder="Entrez la date de construction" />
      </label>
     

      <label>
        Localisation
        <input type="text" placeholder="Entrez la localisation de la ressource" />
      </label>

      <label>Coordonnées</label>

      <div className="coordinates">
        <label>
          Latitude
          <input type="text" placeholder="Entrez la latitude" />
        </label>
        <label>
          Longitude
          <input type="text" placeholder="Entrez la longitude" />
        </label>
      </div>
    </div>
  );
};

export default ProjectForm;


