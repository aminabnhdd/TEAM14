import React from "react";
import PasswordHeader from "../../components/Profil/PasswordHeader.jsx";
import PasswordCard from "../../components/Profil/PasswordCard.jsx";
import "../../pagesStyles/ProfilpagesStyle/ChangerMotdePasse.css";



const ChangerMotDePasse = () => {
  const oldPassword = "Team14"; 

  return (
    <div className="password-page">
      <PasswordHeader />
      <PasswordCard oldPassword={oldPassword} />
    </div>
  );
};

export default ChangerMotDePasse;