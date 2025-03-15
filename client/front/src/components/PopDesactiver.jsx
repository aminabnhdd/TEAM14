import React from "react";

const PopDesactiver = ({ onClose, onLogout }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2 className="modal-title">Désactivation du compte</h2>
        <p className="modal-text">
        Êtes-vous sûr de vouloir désactiver le compte ?
        </p>
        <div className="modal-actions">
          <button className="cancel-button" disabled>Confirmer</button>
          <button className="disconnect-button" onClick={onClose}>Annuler</button>
        </div>
      </div>
    </div>
  );
};

export default PopDesactiver;