import React from "react";
import AccountHeader from "../components/AccountHeader.jsx";
import ProfilInfo from "../components/ProfilInfo.jsx"; 
import InfoCardAdmin from "../components/InfoCardAdmin.jsx";

const ProfilAdmin = () => {
  return (
    <>
      <AccountHeader title="Mes Informations" />
      <ProfilInfo />
      <InfoCardAdmin />
    </>
  );
};

export default ProfilAdmin;