import React from "react";
import AccountHeader from "../../components/Profil/AccountHeader.jsx";
import ProfileInfoSave from "../../components/Profil/ProfilInfoSave.jsx";
import SaveAdmin from "../../components/Profil/SaveAdmin.jsx";


const Sauvisit = () => {
  const handleLogout = () => {
    console.log("Déconnexion en cours...");
  };

  return (
    <>

      <AccountHeader onLogout={handleLogout} title="Mes Informations" />
      <ProfileInfoSave />
      <SaveAdmin />

    </>
  );  
}
export default Sauvisit ;