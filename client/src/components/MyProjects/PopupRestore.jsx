import React from "react";
import "../../componentsStyles/MyProjectsStyles/PopupRestore.css";

const PopupRestore = ({ projectTitle, onClose, onRestore }) => {
  return (
    <div className="popup-restore-overlay">
      <div className="popup-restore-content">
        <button className="popup-restore-close" onClick={onClose}>×</button>
        <h2 className="popup-restore-title">Restauration d’un projet</h2>
        <p className="popup-restore-message">
          Voulez-vous restaurer le projet <strong>“{projectTitle}”</strong> ?
        </p>
        <div className="popup-restore-buttons">
          <button className="popup-restore-confirm" onClick={onRestore}>Restaurer</button>
          <button className="popup-restore-cancel" onClick={onClose}>Annuler</button>
        </div>
      </div>
    </div>
  );
};

export default PopupRestore;

// Ce composant représente une popup de confirmation pour restaurer un projet.
// - Il reçoit trois props :
//   1. `projectTitle` : le nom du projet à restaurer, affiché dans le message.
//   2. `onClose` : fonction appelée lorsqu'on ferme la popup (clic sur Annuler ou la croix).
//   3. `onRestore` : fonction appelée lorsqu'on confirme la restauration.

