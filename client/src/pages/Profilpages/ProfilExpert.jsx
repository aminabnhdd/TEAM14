import React from "react";
import AccountHeader from "../../components/Profil/AccountHeader.jsx";
import ProfileInfo from "../../components/Profil/ProfilInfo.jsx";
import InfoCardExpert from "../../components/Profil/InfoCardExpert.jsx";

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




                
                
                
                
                
                
                
