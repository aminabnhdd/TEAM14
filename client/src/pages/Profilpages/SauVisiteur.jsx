import React from "react";
import AccountHeader from "../../components/Profil/AccountHeader.jsx";
import ProfileInfoSave from "../../components/Profil/ProfilInfoSave.jsx";
import SaveVisiteur from "../../components/Profil/SaveVisiteur.jsx";


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