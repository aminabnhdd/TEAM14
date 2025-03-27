import React from "react";
import "../../componentsStyles/ProfilStyles/AfficherCardVisiteur.css";

const AfficherVisiteur = ({ usersData }) => {
  return (
    <>
      {usersData.map((user) => (
        <div key={user.id} className="modif-visiteur-card2">
          {/* Titre */}
          <div className="visiteur-card-header2">
            <h2>Informations Personnelles</h2>
          </div>

          {/* Contenu */}
          <div className="visiteur-card-content2">
            <div className="visiteur-info-row2">
              <span className="visiteur-label2">Nom</span>
              <span className="visiteur-value2">{user.nom || "Non renseigné"}</span>
            </div>
            <div className="visiteur-info-row2">
              <span className="visiteur-label2">Prénom</span>
              <span className="visiteur-value2">{user.prenom || "Non renseigné"}</span>
            </div>
            <div className="visiteur-info-row2">
              <span className="visiteur-label2">Adresse email</span>
              <span className="visiteur-value2">{user.email || "Non renseigné"}</span>
            </div>
            <div className="visiteur-info-row2">
              <span className="visiteur-label2">Numéro de téléphone</span>
              <span className="visiteur-value2">{user.telephone || "Non renseigné"}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AfficherVisiteur;