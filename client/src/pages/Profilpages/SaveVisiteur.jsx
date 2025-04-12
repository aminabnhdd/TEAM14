import React from "react";
import InfoHeader from "../../components/Profil/Infosheader";
import ProfilInfosave from "../../components/Profil/ProfilInfosave";
import FormVisiteur from "../../components/Profil/FormVisiteur";
import "../../pagesStyles/ProfilpagesStyle/SaveVisiteur.css";

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

const SaveVisiteur = () => {
  return (
    <>
     <InfoHeader/>
     <ProfilInfosave usersData={usersData} />
     <FormVisiteur  />
    </>

  );
}
export default SaveVisiteur;
