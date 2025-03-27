import React from "react";
import InfosProjets from "../../components/Profil/InfosProjets.jsx";
import ProfilInfowithoutlink from "../../components/Profil/ProfilInfowithoutlink.jsx";
import AffichCardExpert from "../../components/Profil/AffichCardExpert.jsx";
import "../../pagesStyles/ProfilpagesStyle/AfficherExpert.css";

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

const AfficherExpert  = () => {
  return(
    <>
    <InfosProjets />
    <ProfilInfowithoutlink usersData={usersData} />
    <AffichCardExpert usersData={usersData} />
    </>
  );
}
export default AfficherExpert ;
