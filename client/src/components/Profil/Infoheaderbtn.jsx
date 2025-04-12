import React , { useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import "../../componentsStyles/ProfilStyles/Infoheaderbtn.css";
import PopDeconnexion from "./PopDeconnexion";

const InfoHeaderBtn = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  return (
    <div className="account-page-container">
      <header className="account-header">
        <h1 className="account-title">Mon compte</h1>
        <button className="account-logout-btn" onClick={() => setShowLogoutPopup(true)}>
          <MdOutlineLogout className="logout-icon" /> Se déconnecter
        </button>
      </header>
       
      {showLogoutPopup && <PopDeconnexion onClose={() => setShowLogoutPopup(false)} />}

      <div className="item-container">
        <div className="item">Mes informations</div>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default InfoHeaderBtn;


