import React from "react";
import { FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Import pour la navigation
import "../../componentsStyles/ProfilStyles/SaveExpert.css";

const ExpertSave = ({ name, lastName, email, phone, expertise, Etablissement, Discipline, Centre }) => {
  const navigate = useNavigate(); // Initialisation de la navigation

  const handleSaveClick = () => {
    navigate("/profil-expert"); // Redirection vers la page souhaitée
  };

  return (
    <div className="container3">
      <div className="header">
        <h3>Informations Personnelles & Professionnelles</h3>
        <button className="save-btn" onClick={handleSaveClick}>
          Sauvegarder <FiSave />
        </button>
      </div>

      <div className="content-new"> 
        <div className="group-new first">
          <div className="name-row-new">
            <div className="new-info-item">
              <p className="new-label">Nom :</p>
              <input type="new-value" className="value input-field" defaultValue={name} />
            </div>
            <div className="new-info-item">
              <p className="new-label">Prénom :</p>
              <input type="new-value" className="value input-field" defaultValue={lastName} />
            </div>
          </div>
          <div className="new-info-item">
            <p className="new-label">Adresse email :</p>
            <input type="email" className="value input-field" defaultValue={email} />
          </div>
          <div className="new-info-item">
            <p className="new-label">Etablissement :</p>
            <input type="new-value" className="value input-field" defaultValue={Etablissement} />
          </div>
          <div className="new-info-item">
            <p className="new-label">Centre de Recherche/Laboratoire :</p>
            <input type="new-value" className="value input-field" defaultValue={Centre} />
          </div>
        </div>

        <div className="group-new second">
          <div className="new-info-item">
            <p className="new-label">Numéro de téléphone :</p>
            <input type="new-value" className="value input-field" defaultValue={phone} />
          </div>
          <div className="new-info-item">
            <p className="new-label">Niveau d'expertise :</p>
            <input type="new-value" className="value input-field" defaultValue={expertise} />
          </div>
          <div className="new-info-item">
            <p className="new-label">Discipline :</p>
            <input type="new-value" className="value input-field" defaultValue={Discipline} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertSave;


