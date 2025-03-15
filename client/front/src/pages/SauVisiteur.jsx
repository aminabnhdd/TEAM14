import React from "react";
import AccountHeader from "../components/AccountHeader.jsx";
import ProfileInfoSave from "../components/ProfilInfoSave.jsx";
import SaveVisiteur from "../components/SaveVisiteur.jsx";


const SauvAdmin = () => {
  const handleLogout = () => {
    console.log("Déconnexion en cours...");
  };

  return (
    <>

      <AccountHeader onLogout={handleLogout} title="Mes Informations" />
      <ProfileInfoSave />
      <SaveVisiteur />

    </>
  );  
}
export default SauvAdmin ;