import React from "react";
import InfoHeader from "../../components/Profil/Infosheader";
import ProfilInfosave from "../../components/Profil/ProfilInfosave";
import FormExpert from "../../components/Profil/FormExpert";
import "../../pagesStyles/ProfilpagesStyle/SaveExpert.css";

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

const SaveExpert = () => {
  return (
    <>
     <InfoHeader/>
     <ProfilInfosave usersData={usersData} />
     <FormExpert />
    </>

  );
}
export default SaveExpert;
