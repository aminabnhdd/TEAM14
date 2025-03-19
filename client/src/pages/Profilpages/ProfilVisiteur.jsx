import React from "react";
import AccountHeader from "../../components/Profil/AccountHeader.jsx";
import ProfilInfo from "../../components/Profil/ProfilInfo.jsx"; 
import InfoCardVisiteur from "../../components/Profil/InfoCardVisiteur.jsx";

const ProfilVisiteur = () => {
  return (
    <>
      <AccountHeader title="Mes Informations" />
      <ProfilInfo />
      <InfoCardVisiteur />
    </>
  );
};

export default ProfilVisiteur;


