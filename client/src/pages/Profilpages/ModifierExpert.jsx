import React from "react";
import ProfilInfolink from "../../components/Profil/ProfilInfolink.jsx";
import ModifExpertCard from "../../components/Profil/ModifCardExpert.jsx";
import InfoHeaderBtn from "../../components/Profil/Infoheaderbtn.jsx";
import "../../pagesStyles/ProfilpagesStyle/ModifierExpert.css";

const usersData = [
  {
    id: 1,
    nom: "Benhaddad",
    prenom: "Amina",
    email: "amina.benhaddad@example.com",
    etablissement: "École nationale supérieure",
    labo: "LMCS",
    telephone: "0550******",
    niveau: "Avancé",
    discipline: "Histoire",
    pfp: "https://img.freepik.com/vecteurs-premium/icone-profil-avatar-dans-style-plat-illustration-vectorielle-du-profil-utilisateur-feminin-fond-isole-concept-entreprise-signe-profil-feminin_157943-38866.jpg",
    role : "Architecte",
    password : "1234",
  },
];

const ModifierExpert = () => {
  return (
    <>
      <InfoHeaderBtn />
      <ProfilInfolink usersData={usersData} />
      <ModifExpertCard usersData={usersData} />
    </>
  );
};

export default ModifierExpert;