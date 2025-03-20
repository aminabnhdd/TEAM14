import React from "react";
import { FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import "../../componentsStyles/ProfilStyles/SaveVisiteur.css";

const VisiteurSave = ({ name, lastName, email, phone }) => {
  const navigate = useNavigate(); // Initialisation de la navigation

  const handleSaveClick = () => {
    navigate("/profil-visiteur"); // Redirection vers la page ProfilVisiteur
  };

  return (
    <div className="container3">
      <div className="header">
        <h3>Informations Personnelles</h3>
        <button className="save-btn" onClick={handleSaveClick}>
          Sauvegarder <FiSave />
        </button>
      </div>

      <div className="form-content">
        <div className="new-info-item">
          <p className="new-label">Nom :</p>
          <input type="new-value" className="input-field2" defaultValue={name} />
        </div>
        <div className="new-info-item">
          <p className="new-label">Prénom :</p>
          <input type="new-value" className="input-field2" defaultValue={lastName} />
        </div>
        <div className="new-info-item">
          <p className="new-label">Adresse email :</p>
          <input type="email" className="input-field2" defaultValue={email} />
        </div>
        <div className="new-info-item">
          <p className="new-label">Numéro de téléphone :</p>
          <input type="new-value" className="input-field2" defaultValue={phone} />
        </div>
      </div>
    </div>
  );
};

export default VisiteurSave;


