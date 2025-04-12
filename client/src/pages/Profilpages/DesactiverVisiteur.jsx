import React , { useState }  from "react";
import ProfilInfowithoutlink from "../../components/Profil/ProfilInfowithoutlink.jsx";
import AfficherCardVisiteur from  "../../components/Profil/AfficherCardVisiteur.jsx";
import HeaderSection from "../../components/Profil/HeaderSectionVisiteur.jsx";
import "../../pagesStyles/ProfilpagesStyle/DesactiverVisiteur.css";
import PopDesactiver from "../../components/Profil/PopDesactiver.jsx";

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

const DesactiverVisiteur = () => {
  const [showPopup, setShowPopup] = useState(false);
  
  return (
     <>
      <HeaderSection />
      <ProfilInfowithoutlink usersData={usersData} />
      <AfficherCardVisiteur usersData={usersData} />
      <button className="desactiver-btn" onClick={() => setShowPopup(true)}>
        Désactiver le compte
      </button>
      {showPopup && <PopDesactiver onClose={() => setShowPopup(false)} />}
     </>
 
  );
};

export default DesactiverVisiteur;