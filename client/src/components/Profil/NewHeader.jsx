import React from "react";
import "../../componentsStyles/ProfilStyles/NewHeader.css";

const NewHeader = ({ title }) => {
  return (
    <div className="account-header">
      <div className="header-title-container">
        <h2 className="header-title">Modifier mon mot de passe</h2>
      </div>
      <div className="account-details">
        <h4>{title}</h4>
      </div>
    </div>
  );
};

export default NewHeader;
