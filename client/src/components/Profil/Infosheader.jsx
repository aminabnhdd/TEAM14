import React from "react";
import "../../componentsStyles/ProfilStyles/Infosheader.css";

const InfoHeader = () => {
  return(
    <div className="account-page-container">
      <header className="account-header">
        <h1 className="account-title">Modifier mes informations</h1>
      </header>
    
      <div className="item-container">
        <div className="item">Mes informations</div>
          <div className="line"></div>
        </div>
    </div>
  );

}
export default InfoHeader ;