import React from "react";
import PasswordHeader from "../../components/Profil/PasswordHeader.jsx";
import PasswordCard from "../../components/Profil/PasswordCard.jsx";
import "../../pagesStyles/ProfilpagesStyle/ChangerMotdePasse.css";
import SideNav from "../../components/SideNav";
import SearchBar from "../../components/SearchBar.jsx";



const ChangerMotDePasse = () => {

  return (
    <>
    <div className="mdpsearchbar">
        <SearchBar />
    </div>
    <SideNav />
    <div className="root1">
    <div className="password-page">
      <PasswordHeader />
      <PasswordCard />
    </div>
    </div>
    </>

  );
};

export default ChangerMotDePasse;