import React from "react";
import AccountHeader from "../components/AccountHeader.jsx";
import ProfileInfo from "../components/ProfilInfo.jsx";
import InfoCardExpert from "../components/InfoCardExpert.jsx";

const ProfilExpert = () => {
  const handleLogout = () => {
    console.log("Déconnexion en cours...");
  };
  return (
    <>
  
      <AccountHeader onLogout={handleLogout} title="Mes Informations" />
      <ProfileInfo />
      {<InfoCardExpert />}

    </>
  );
};

export default ProfilExpert;




                
                
                
                
                
                
                
