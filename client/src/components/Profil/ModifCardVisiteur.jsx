import React from "react";
import { FaRegEdit } from "react-icons/fa";
import "../../componentsStyles/ProfilStyles/ModifCardVisiteur.css";
import { useNavigate } from "react-router-dom";

const ModifVisiteurCard = ({ usersData }) => {
  const navigate = useNavigate(); 
  return (
    <>
      {usersData.map((user) => (
        <div key={user.id} className="modif-visiteur-card">
          {/* Titre + Bouton Modifier */}
          <div className="visiteur-card-header">
            <h2>Informations Personnelles</h2>
            <button className="visiteur-edit-button" onClick={() => navigate("/save-visiteur")}>
              Modifier <FaRegEdit size={16} />
            </button>
          </div>

          {/* Contenu */}
          <div className="visiteur-card-content">
            <div className="visiteur-info-row">
              <span className="visiteur-label">Nom</span>
              <span className="visiteur-value">{user.nom || "Non renseigné"}</span>
            </div>
            <div className="visiteur-info-row">
              <span className="visiteur-label">Prénom</span>
              <span className="visiteur-value">{user.prenom || "Non renseigné"}</span>
            </div>
            <div className="visiteur-info-row">
              <span className="visiteur-label">Adresse email</span>
              <span className="visiteur-value">{user.email || "Non renseigné"}</span>
            </div>
            <div className="visiteur-info-row">
              <span className="visiteur-label">Numéro de téléphone</span>
              <span className="visiteur-value">{user.telephone || "Non renseigné"}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ModifVisiteurCard;

