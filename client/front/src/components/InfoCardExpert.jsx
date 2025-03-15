import React from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const InfoCardExpert = ({ name, lastName, email, phone, expertise, Etablissement, Discipline, Centre }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/sauvegarde-expert");
  };

  return (
    <div className="container">
      <div className="header">
        <h3>Informations Personnelles & Professionnelles</h3>
        <button className="edit-btn" onClick={handleEditClick}>
          Modifier <FiEdit className="icon" />
        </button>
      </div>

      <div className="content">
        <div className="group first">
          <div className="row">
            <div className="new-info-item">
              <p className="new-label">Nom :</p>
              <p className="new-value">{name}</p>
            </div>
            <div className="new-info-item">
              <p className="new-label">Prénom :</p>
              <p className="new-value">{lastName}</p>
            </div>
          </div>
          <div className="new-info-item">
            <p className="new-label">Adresse email :</p>
            <p className="new-value">{email}</p>
          </div>
          <div className="new-info-item">
            <p className="new-label">Etablissement :</p>
            <p className="new-value">{Etablissement}</p>
          </div>
          <div className="new-info-item">
            <p className="new-label">Centre de Recherche/Laboratoire :</p>
            <p className="new-value">{Centre}</p>
          </div>
        </div>

        <div className="group second">
          <div className="new-info-item">
            <p className="new-label">Numéro de téléphone :</p>
            <p className="new-value">{phone}</p>
          </div>
          <div className="new-info-item">
            <p className="new-label">Niveau d'expertise :</p>
            <p className="new-value">{expertise}</p>
          </div>
          <div className="info-item">
            <p className="new-label">Discipline :</p>
            <p className="new-value">{Discipline}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCardExpert;

