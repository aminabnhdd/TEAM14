import React, { useState } from "react";
import SectionTitles from "../../components/Profil/SectionTitles.jsx";
import NewProfilInfo from "../../components/Profil/NewProfilInfo.jsx";
import DesactiverExpertCard from "../../components/Profil/DesactiverExpertCard.jsx";
import PopDesactiver from "../../components/Profil/PopDesactiver.jsx";
import "../../pagesStyles/ProfilpagesStyle/DesactiverExpert.css";


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
      <SectionTitles />
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