import React from "react";
import "../../componentsStyles/ProfilStyles/PasswordHeader.css";

const PasswordHeader = () => {
  return(
    <div className="mdp-page-container">
      <header className="mdp-header">
        <h1 className="mdp-title">Modifier mon mot de passe</h1>
      </header>
    
      <div className="mdp-item-container">
        <div className="mdp-item">Mes informations</div>
          <div className="mdp-line"></div>
        </div>
    </div>
  );

}
export default PasswordHeader ;