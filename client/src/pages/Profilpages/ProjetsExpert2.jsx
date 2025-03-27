import React from "react";
import ProjetsInfos2 from "../../components/Profil/ProjetsInfos2.jsx";
import ProfilInfowithoutlink from "../../components/Profil/ProfilInfowithoutlink.jsx";
import ProjectsContainer from "../../components/Profil/ProjectsContainer.jsx";
import "../../pagesStyles/ProfilpagesStyle/ProjetsExpert2.css";

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
    fileUrl :"Fichier_pour_prouver_expertise",
    password : "1234",
  },
];

const ProjetsExpert2 =() => {
  return(
    <>
      <ProjetsInfos2 />
      <ProfilInfowithoutlink usersData={usersData} />
      <ProjectsContainer />
    </>
  );
}
export default ProjetsExpert2;