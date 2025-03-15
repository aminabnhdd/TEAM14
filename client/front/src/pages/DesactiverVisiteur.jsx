import React, { useState } from "react";
import AccountHeader from "../components/AccountHeader.jsx";
import NewProfilInfo from "../components/NewProfilInfo";
import DesactiverExpertCard from "../components/DesactiverExpertCard";
import PopDesactiver from "../components/PopDesactiver";

const Desactiver = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleDisableClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <AccountHeader title="Informations" />
      <NewProfilInfo />
      <DesactiverExpertCard />
      <button className="disable-btn" onClick={handleDisableClick}>
        Désactiver le compte
      </button>
      {showPopup && <PopDesactiver onClose={handleClosePopup} />}
    </>
  );
};

export default Desactiver;