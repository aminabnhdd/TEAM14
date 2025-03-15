import React from "react";
import AccountHeader from "../components/AccountHeader.jsx";
import ProfileInfoSave from "../components/ProfilInfoSave.jsx";
import SaveExpert from "../components/SaveExpert.jsx";

const SauvExpert = () => {
  const handleLogout = () => {
    console.log("Déconnexion en cours...");
  };

  return (
    <>

      <AccountHeader onLogout={handleLogout} title="Mes Informations" />
      <ProfileInfoSave />
      {<SaveExpert />}

    </>
  );
}
export default SauvExpert;