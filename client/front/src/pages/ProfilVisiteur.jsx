import React from "react";
import AccountHeader from "../components/AccountHeader.jsx";
import ProfilInfo from "../components/ProfilInfo.jsx"; 
import InfoCardVisiteur from "../components/InfoCardVisiteur.jsx";

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


