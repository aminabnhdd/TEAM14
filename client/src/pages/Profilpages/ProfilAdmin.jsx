import React from "react";
import AccountHeader from "../../components/Profil/AccountHeader.jsx";
import ProfilInfo from "../../components/Profil/ProfilInfo.jsx"; 
import InfoCardAdmin from "../../components/Profil/InfoCardAdmin.jsx";

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