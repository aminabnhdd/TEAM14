
// form that user fills to modify the informations of a project

import React, { useState, useEffect, useContext } from "react";
import { ChevronDown } from "lucide-react";
import "../../componentsStyles/CreateProjectStyles/ModifProjectForm.css";
import { FetchProjectData } from "../../services/FetchProjectData.js";
import AuthContext from '../../helpers/AuthContext'
import RefreshService from "../../services/RefreshService";


const ALLOWED_SECTION_TYPES = ["Kasbahs", "Palais", "Mosquées", "Temples", "Autre"];

const ModifProjectForm = ({ error, onDataChange, projetId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { authState, setAuthState } = useContext(AuthContext);
  const [selectedType, setSelectedType] = useState("");
  const [customType, setCustomType] = useState("");
  const [newKeyword, setNewKeyword] = useState("");

  // initialize the data to default
  const [formData, setFormData] = useState({
    titre: "",
    type: "",
    style: "",
    dateConstruction: "",
    localisation: "",
    latitude: "",
    longitude: "",
    keywords: [],
  });

  //fetch the data 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await RefreshService.Refresh();
        setAuthState({ email: response1.email, role: response1.role, accessToken: response1.accessToken })
        console.log("the token: ", response1.accessToken)
        console.log("here does ths work");

        const data = await FetchProjectData(projetId, response1.accessToken);
        if (data) {
          // Check if keywords is an array with a single concatenated string
          let keywords = [];
          if (Array.isArray(data.keywords) && data.keywords.length === 1) {
            // Split the string into an array of keywords
            keywords = data.keywords[0].split(',').map(keyword => keyword.trim());
          } else {
            keywords = data.keywords; // Already an array of keywords
          }

          setFormData({
            titre: data.titre || "",
            type: data.type || "",
            style: data.style || "",
            dateConstruction: data.dateConstruction || "",
            localisation: data.localisation || "",
            latitude: data.latitude || "",
            longitude: data.longitude || "",
            keywords: keywords || [],
          });
          setSelectedType(data.type || "");
        }
      } catch (err) {
        console.error("Erreur lors updating du projet :", err);
      }


    };
    fetchData();
  }, []);


  // show the errors
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

  // for the personalized select element
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


  // add a keyword
  const addKeyword = () => {
    if (newKeyword.trim()) {
      if (!formData.keywords.includes(newKeyword.trim())) {
        setFormData({
          ...formData,
          keywords: [...formData.keywords, newKeyword.trim()]
        });
      }
      setNewKeyword("");
    }
  };

  // delete a keyword
  const removeKeyword = (index) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter((_, i) => i !== index)
    });
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

      <div className="">
        <label className="font-medium ">Mots-clés</label>

        {/* Keywords list */}
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.keywords.map((keyword, index) => (

            keyword &&
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1 bg-neutral-200 rounded-full text-sm"
            >
              <span>{keyword}</span>
              <button
                type="button"
                className="text-brown font-bold cursor-pointer hover:text-warning"
                onClick={() => removeKeyword(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Input + Add button for keywords*/}
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addKeyword();
              }
            }}
            placeholder="Ajoutez un mot-clé"
          />
          <button
            type="button"
            onClick={addKeyword}
            className="px-4 py-2 mr-1 bg-brown text-white rounded-2xl hover:scale-102 cursor-pointer hover:darken-102"
          >
            +
          </button>
        </div>
      </div>


    </div>
  );
};

export default ModifProjectForm;