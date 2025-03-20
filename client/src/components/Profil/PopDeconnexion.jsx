import React from "react";
import "../../componentsStyles/ProfilStyles/PopDeconnexion.css";
const PopDeconnexion = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2 className="modal-title">Déconnexion</h2>
        <p className="modal-text">
          Êtes-vous sûr de vouloir vous déconnecter de votre compte ?
        </p>
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>Annuler</button>
          <button className="disconnect-button" disabled>Se déconnecter</button>
        </div>
      </div>
    </div>
  );
};

export default PopDeconnexion;
