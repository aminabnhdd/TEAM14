import React from "react";
import InfoHeaderBtn from "../../components/Profil/Infoheaderbtn.jsx";
import ProfilInfolink from "../../components/Profil/ProfilInfolink.jsx";
import ModifCardVisiteur from "../../components/Profil/ModifCardVisiteur.jsx";
import "../../pagesStyles/ProfilpagesStyle/ModifierVisiteur.css";

const usersData = [
  {
    id: 1,
    nom: "Benhaddad",
    prenom: "Amina",
    email: "amina.benhaddad@example.com",
    telephone: "0550******",
    pfp: "https://img.freepik.com/vecteurs-premium/icone-profil-avatar-dans-style-plat-illustration-vectorielle-du-profil-utilisateur-feminin-fond-isole-concept-entreprise-signe-profil-feminin_157943-38866.jpg",
    role : "Visiteur",
    password : "1234",
  },
];

const ModifierVisiteur = () => {
  return (
    <>
      <InfoHeaderBtn />
      <ProfilInfolink usersData={usersData}  />
      <ModifCardVisiteur usersData={usersData} />
    </>

  );
};

export default ModifierVisiteur;
