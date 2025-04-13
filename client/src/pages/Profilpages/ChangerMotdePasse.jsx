import React from "react";
import PasswordHeader from "../../components/Profil/PasswordHeader.jsx";
import PasswordCard from "../../components/Profil/PasswordCard.jsx";
import "../../pagesStyles/ProfilpagesStyle/ChangerMotdePasse.css";



const ChangerMotDePasse = () => {

  return (
    <div classname="root1">
    <div className="password-page">
      <PasswordHeader />
      <PasswordCard />
    </div>
    </div>
  );
};

export default ChangerMotDePasse;