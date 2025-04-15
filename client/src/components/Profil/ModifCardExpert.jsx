import React from "react";
import "../../componentsStyles/ProfilStyles/ModifCardExpert.css";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const ModifExpertCard = ({ usersData, id }) => {
  const navigate = useNavigate(); 
  
  return usersData.map((user) => (
    <div key={user.id} className="modif-expert-card">
      {/* Titre + Bouton Modifier */}
      <div className="card-header">
        <h2>Informations Personnelles & Professionnelles</h2>
        <button className="edit-button" onClick={() => navigate(`/save-expert/${id}`)}>
          Modifier <FaRegEdit size={16} />
        </button>
      </div>

      {/* Contenu */}
      <div className="card-content">
        {/* Partie gauche */}
        <div className="user-info-left">
          <div className="name-container">
            <div>
              <span className="info-label">Nom</span>
              <span className="info-value">{user.nom || "Non renseigné"}</span>
            </div>
            <div>
              <span className="info-label">Prénom</span>
              <span className="info-value">{user.prenom || "Non renseigné"}</span>
            </div>
          </div>
          <div>
            <span className="info-label">Adresse email</span>
            <span className="info-value">{user.email || "Non renseigné"}</span>
          </div>
          <div>
            <span className="info-label">Établissement</span>
            <span className="info-value">{user.etablissement || "Non renseigné"}</span>
          </div>
          <div>
            <span className="info-label">Centre de Recherche/Laboratoire</span>
            <span className="info-value">{user.labo || "Non renseigné"}</span>
          </div>
        </div>

        {/* Partie droite */}
        <div className="user-info-right">
          <div>
            <span className="info-label">Numéro de téléphone</span>
            <span className="info-value">{user.telephone || "Non renseigné"}</span>
          </div>
          <div>
            <span className="info-label">Niveau d'expertise</span>
            <span className="info-value">{user.niveau || "Non renseigné"}</span>
          </div>
          <div>
            <span className="info-label">Discipline</span>
            <span className="info-value">{user.discipline || "Non renseigné"}</span>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default ModifExpertCard;



