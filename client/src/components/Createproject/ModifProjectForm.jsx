import React, { useState ,useEffect } from "react";
import { ChevronDown } from "lucide-react"; 
import "../../componentsStyles/CreateprojectStyles/ModifProjectForm.css";

const ALLOWED_SECTION_TYPES = ["Kasbahs", "Palais", "Mosquées", "Temples","Autre"];

const initialData = [
  {
    titre: "Mosquée d'Alger",
    type: "Mosquées",
    coord: { latitude: "33.5731", longitude: "-7.5898" },
    localisation: "Alger, Algerie",
    style: "Architecture islamique",
    dateConstruction: "1993",
  }
];

const ModifProjectForm = ({ error, onDataChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [customType, setCustomType] = useState(""); 
  
    const [formData, setFormData] = useState({
      title: initialData[0].titre,
      type:  initialData[0].type,
      style: initialData[0].style,
      date: initialData[0].dateConstruction,
      location: initialData[0].localisation,
      latitude: initialData[0].coord.latitude,
      longitude: initialData[0].coord.longitude,
    });

    useEffect(() => {
      setSelectedType(formData.type);
      if (formData.type !== "Autre") {
        setCustomType("");
      }
    }, [formData.type]);
  
    useEffect(() => {
      onDataChange(formData);
    }, [formData, onDataChange]); 
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (type) => {
    setSelectedType(type);
    setIsOpen(false);

    if (type === "Autre") {
      setCustomType("");
      setFormData({ ...formData, type: "" });
    } else {
      setFormData({ ...formData, type });
    }
  };

 return (
    <div className="project-form">
      <label className={`required ${error ? "error" : ""}`}>
        <span className="label-text">Titre du projet</span>
        <input 
          name="title"
          type="text" 
          placeholder="Ajoutez un titre" 
          value={formData.title}
          onChange={handleChange}
          className={error ? "error-input" : ""} 
        />
      </label>

      <label className={`required ${error ? "error" : ""}`}>
        <span className="label-text">Type de la ressource</span>
        <div className="custom-select-container">
          <input
            name="type"
            type="text"
            value={selectedType === "Autre" ? customType : selectedType || ""}
            placeholder="Choisissez un type"
            readOnly={selectedType !== "Autre"}
            className={`custom-input ${error ? "error-input" : ""}`}
            onChange={(e) => {
              setCustomType(e.target.value);
              setFormData({ ...formData, type: e.target.value });
            }}
          />
          <div className="dropdown-icon-container" onClick={toggleDropdown}>
            <ChevronDown size={20} className="dropdown-icon" />
          </div>
        </div>
        {isOpen && (
          <ul className="dropdown-menu">
            {ALLOWED_SECTION_TYPES.map((type, index) => (
              <li key={index} onClick={() => handleSelect(type)}>{type}</li>
            ))}   
          </ul>
        )}
      </label>

      <label>Style
        <input name="style" type="text" placeholder="Entrez le style" value={formData.style} onChange={handleChange} />
      </label>

      <label>Date de construction
        <input name="date" type="text" placeholder="Entrez la date" value={formData.date} onChange={handleChange} />
      </label>

      <label>Localisation
        <input name="location" type="text" placeholder="Entrez la localisation" value={formData.location} onChange={handleChange} />
      </label>

      <label>Coordonnées</label>
      <div className="coordinates">
        <label>Latitude
          <input name="latitude" type="text" placeholder="Entrez la latitude" value={formData.latitude} onChange={handleChange} />
        </label>
        <label>Longitude
          <input name="longitude" type="text" placeholder="Entrez la longitude" value={formData.longitude} onChange={handleChange} />
        </label>
      </div>
    </div>
  );
};

export default ModifProjectForm;