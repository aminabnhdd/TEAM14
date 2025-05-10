
// form that the user fills to create a new project in page creer projet

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import "../../componentsStyles/CreateProjectStyles/ProjectForm.css";

const ALLOWED_SECTION_TYPES = ["Kasbahs", "Palais", "Mosquées", "Temples", "Autre"];

const ProjectForm = ({ error, onDataChange }) => {
  const [isOpen, setIsOpen] = useState(false);
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
    keywords: []
  });

  //update the form data
  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // for the personalized select element
  const toggleDropdown = () => setIsOpen(!isOpen);

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

  // add a keyword
  const addKeyword = () => {
    if (newKeyword.trim() ) {
      if (!formData.keywords.includes(newKeyword.trim())){
      setFormData({
        ...formData,
        keywords: [...formData.keywords, newKeyword.trim()]
      });}
      setNewKeyword("");
    }

  };

  //remove a keyword
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
        <input name="dateConstruction" type="text" placeholder="Entrez la date" value={formData.date} onChange={handleChange} />
      </label>

      <label>Localisation
        <input name="localisation" type="text" placeholder="Entrez la localisation" value={formData.location} onChange={handleChange} />
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



      <div className="">
        <label className="font-medium ">Mots-clés</label>

        {/* Keywords list */}
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.keywords.map((keyword, index) => (
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

        {/* Input + Add button */}
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
    
  
 );}



      export default ProjectForm;

/*
LOGIQUE DU COMPOSANT :

1. États internes :
   - `isOpen` : Gère l'ouverture/fermeture du menu déroulant.
   - `selectedType` : Stocke le type de ressource sélectionné.
   - `customType` : Gère l'entrée utilisateur si le type "Autre" est choisi.
   - `formData` : Contient les valeurs des champs du formulaire.

2. Effet `useEffect` :
   - Chaque fois que `formData` change, on appelle `onDataChange(formData)` pour envoyer les données au parent.

3. Gestion des changements :
   - `handleChange` met à jour `formData` à chaque modification d'un champ.

4. Menu déroulant :
   - `toggleDropdown` gère l'affichage du menu déroulant.
   - `handleSelect` met à jour `selectedType`, ferme le menu et ajuste `formData`.
   - Si "Autre" est sélectionné, un champ texte devient éditable pour entrer un type personnalisé.

5. Affichage du formulaire :
   - Chaque champ est lié à `formData`.
   - les champs obligatoires ont une gestion spéciale d'erreurs avec `error`.
*/

