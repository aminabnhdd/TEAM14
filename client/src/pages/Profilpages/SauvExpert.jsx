import React from "react";
import AccountHeader from "../../components/Profil/AccountHeader.jsx";
import ProfileInfoSave from "../../components/Profil/ProfilInfoSave.jsx";
import SaveExpert from "../../components/Profil/SaveExpert.jsx";

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