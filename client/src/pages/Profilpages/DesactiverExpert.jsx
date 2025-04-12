import React , { useState } from "react";
import InfosProjets2 from "../../components/Profil/InfosProjets2.jsx";
import ProfilInfowithoutlink from "../../components/Profil/ProfilInfowithoutlink.jsx";
import DesactCardExpert from "../../components/Profil/DesactCardExpert.jsx";
import "../../pagesStyles/ProfilpagesStyle/DesactiverExpert.css";
import PopDesactiver from "../../components/Profil/PopDesactiver.jsx";

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

const DesactiverExpert = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
     <>
      <InfosProjets2 />
      <ProfilInfowithoutlink usersData={usersData} />
      <DesactCardExpert usersData={usersData} />

      {/* Bouton Désactiver */}
      <button className="desactiver-btn" onClick={() => setShowPopup(true)}>
        Désactiver le compte
      </button>
      {showPopup && <PopDesactiver onClose={() => setShowPopup(false)} />}
     </>
 
  );
};

export default DesactiverExpert;
