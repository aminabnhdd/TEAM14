import React, { useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import PopDeconnexion from "./PopDeconnexion.jsx";

const AccountHeader = ({ title }) => {
  const [showPopup, setShowPopup] = useState(false); 

  return (
    <div className="account-header">
      <div className="account-header-top">
        <h2>Mon compte</h2>
        <button className="logout-btn" onClick={() => setShowPopup(true)}>
          <MdOutlineLogout className="icon" />
          Se déconnecter
        </button>
      </div>
      <div className="account-details">
        <h4>{title}</h4>
      </div>

      {showPopup && <PopDeconnexion onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default AccountHeader;




