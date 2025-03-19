import React from "react";
import { FiEdit } from "react-icons/fi"; 
import { useNavigate } from "react-router-dom";
import "../../componentsStyles/ProfilStyles/InfoCardAdmin.css";

const InfoCardVisiteur = ({ name, lastName, email, phone }) => {
  const navigate = useNavigate(); 

  const handleEditClick = () => {
    navigate("/sauvegarde-admin"); 
  };

  return (
    <div className="container">
      <div className="header">
        <h3>Informations Personnelles</h3>
        <button className="edit-btn" onClick={handleEditClick}>
          Modifier <FiEdit className="icon" />
        </button>
      </div>
      <div className="info-section">
        <div className="new-info-item">
          <div className="new-label">Nom :</div>
          <div className="new-value">{name}</div>
        </div>
        <div className="new-info-item">
          <div className="new-label">Prénom :</div>
          <div className="new-value">{lastName}</div>
        </div>
        <div className="new-info-item">
          <div className="new-label">Adresse email :</div>
          <div className="new-value">{email}</div>
        </div>
        <div className="new-info-item">
          <div className="new-label">Numéro de téléphone :</div>
          <div className="new-value">{phone}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoCardVisiteur;