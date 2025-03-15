import React from "react";
import AccountHeader from "../components/AccountHeader.jsx";
import ProfileInfoSave from "../components/ProfilInfoSave.jsx";
import SaveAdmin from "../components/SaveAdmin.jsx";


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