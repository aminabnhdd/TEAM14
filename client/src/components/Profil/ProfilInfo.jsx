import React from "react";
import { Link } from "react-router-dom"; // Import du Link pour la navigation interne
import "../../componentsStyles/ProfilStyles/ProfilInfo.css"

const ProfilInfo = ({ name, role, avatarUrl }) => {
  return (
    <div className="profil-info">
      <div className="div2">
        <div className="avatar">
          <img src={avatarUrl ? avatarUrl : "/default-avatar.png"}  />
        </div>
        <div className="details">
          <h5 className="nom">{name ? name : <strong>Nom non disponible</strong>}</h5>
          <h5 className="role">{role ? role : <strong>Rôle non défini</strong>}</h5>
        </div>
      </div>

      <Link to="/mot-de-passe" className="change-password">
        Modifier mon mot de passe
      </Link>
    </div>
  );
};

export default ProfilInfo;
