import React, { useState, useEffect,useContext } from "react";
import { ChevronDown } from "lucide-react";
import "../../componentsStyles/CreateprojectStyles/ModifProjectForm.css";
import { FetchProjectData } from "../../services/FetchProjectData.js";
import AuthContext from '../../helpers/AuthContext'
import RefreshService from "../../services/RefreshService";


const ALLOWED_SECTION_TYPES = ["Kasbahs", "Palais", "Mosquées", "Temples", "Autre"];

const ModifProjectForm = ({ error, onDataChange,projetId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {authState,setAuthState} = useContext(AuthContext);
  const [selectedType, setSelectedType] = useState("");
  const [customType, setCustomType] = useState("");

  const [formData, setFormData] = useState({
    titre: "",
    type: "",
    style: "",
    dateConstruction: "",
    localisation: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response1= await  RefreshService.Refresh();
setAuthState({email:response1.email,role:response1.role,accessToken:response1.accessToken})
console.log("the token: ",response1.accessToken)
console.log("here does ths work");

         const data = await FetchProjectData(projetId,response1.accessToken);
        if (data) {
          setFormData({
            titre: data.titre || "",
            type: data.type || "",
            style: data.style || "",
            dateConstruction: data.dateConstruction || "",
            localisation: data.localisation || "",
            latitude: data.latitude || "",
            longitude: data.longitude || "",
          });
          setSelectedType(data.type || "");
        }
      } catch (err) {
        console.error("Erreur lors updating du projet :", err);
      }
  
      
    };
    fetchData();
  }, []);


  useEffect(() => {
    console.log("Updated Form Data:", formData);
    console.log("Error State:", error);
  }, [formData, error]);
  
  useEffect(() => {
    if (formData?.type !== "Autre") {
      setCustomType("");
    }
  }, [formData?.type]);

  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  useEffect(() => {
    if (selectedType === "Autre" && formData.type) {
      setCustomType(formData.type);
    }
  }, [selectedType, formData.type]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (type) => {
    setSelectedType(type);
    setIsOpen(false);

    if (type === "Autre") {
      setCustomType("");
      setFormData((prev) => ({ ...prev, type: "" }));
    } else {
      setFormData((prev) => ({ ...prev, type }));
    }
  };

  return (
    <div className="project-form">
      <label className={`required ${error ? "error" : ""}`}>
        <span className="label-text">Titre du projet</span>
        <input
          name="titre"
          type="text"
          placeholder="Ajoutez un titre"
          value={formData.titre}
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
              setFormData((prev) => ({ ...prev, type: e.target.value }));
            }}
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
        <input
          name="style"
          type="text"
          placeholder="Entrez le style"
          value={formData.style}
          onChange={handleChange}
        />
      </label>

      <label>
        Date de construction
        <input
          name="dateConstruction"
          type="text"
          placeholder="Entrez la date"
          value={formData.dateConstruction}
          onChange={handleChange}
        />
      </label>

      <label>
        Localisation
        <input
          name="localisation"
          type="text"
          placeholder="Entrez la localisation"
          value={formData.localisation}
          onChange={handleChange}
        />
      </label>

      <label>Coordonnées</label>
      <div className="coordinates">
        <label>
          Latitude
          <input
            name="latitude"
            type="text"
            placeholder="Entrez la latitude"
            value={formData.latitude}
            onChange={handleChange}
          />
        </label>
        <label>
          Longitude
          <input
            name="longitude"
            type="text"
            placeholder="Entrez la longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ModifProjectForm;