import React , { useState }  from "react";
import ProfilInfowithoutlink from "../../components/Profil/ProfilInfowithoutlink.jsx";
import AfficherCardVisiteur from  "../../components/Profil/AfficherCardVisiteur.jsx";
import HeaderSection from "../../components/Profil/HeaderSectionVisiteur.jsx";
import "../../pagesStyles/ProfilpagesStyle/DesactiverVisiteur.css";
import PopDesactiver from "../../components/Profil/PopDesactiver.jsx";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../helpers/AuthContext.jsx";
import { useContext } from "react";


const DesactiverVisiteur = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [usersData,setUsersData] = useState([]);
    const {authState,setAuthState} = useContext(AuthContext);
      const navigate = useNavigate();
      useEffect(() => {
        axios.get("http://localhost:3001/refresh",{withCredentials:true})
            .then((response) => {
                if (response.data.error) return navigate('/connexion')
                setAuthState({email:response.data.email,role:response.data.role,accessToken:response.data.accessToken});
                axios.get("http://localhost:3001/profil/mon-compte",{headers:{Authorization:`Bearer ${response.data.accessToken}`}})
                .then((response) => {
                  setUsersData([{...response.data,role:"Visiteur"}]);
                }
                )
                .catch((error) => {
                    console.log(error);
                });
            })
            .catch((error) => {
                console.log(error);
            });
                  
      }, []);
  
  return (
     <>
      <HeaderSection />
      <ProfilInfowithoutlink usersData={usersData} />
      <AfficherCardVisiteur usersData={usersData} />
      <button className="desactiver-btn" onClick={() => setShowPopup(true)}>
        Désactiver le compte
      </button>
      {showPopup && <PopDesactiver onClose={() => setShowPopup(false)} usersData={usersData} />}
     </>
 
  );
};

export default DesactiverVisiteur;