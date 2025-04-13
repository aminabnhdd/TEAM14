import React , { useState } from "react";
import InfosProjets2 from "../../components/Profil/InfosProjets2.jsx";
import ProfilInfowithoutlink from "../../components/Profil/ProfilInfowithoutlink.jsx";
import DesactCardExpert from "../../components/Profil/DesactCardExpert.jsx";
import "../../pagesStyles/ProfilpagesStyle/DesactiverExpert.css";
import PopDesactiver from "../../components/Profil/PopDesactiver.jsx";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../helpers/AuthContext.jsx";
import { useContext } from "react";


const DesactiverExpert = () => {
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
                const updatedUsers = [...usersData, response.data].map((user) => ({
                  ...user, 
                  role:
                    user.discipline.toLowerCase() === "histoire"
                      ? "historien"
                      : user.discipline.toLowerCase() === "architecture"
                      ? "architecte"
                      : user.discipline.toLowerCase() === "archéologie"
                      ? "archéologue"
                      : "",
                }));
            
                setUsersData(updatedUsers);
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
      <InfosProjets2 />
      <ProfilInfowithoutlink usersData={usersData} />
      <DesactCardExpert usersData={usersData} />

      {/* Bouton Désactiver */}
      <button className="desactiver-btn" onClick={() =>setShowPopup(true)}>
        Désactiver le compte
      </button>
      {showPopup && <PopDesactiver usersData={usersData} onClose={() => setShowPopup(false)} />}
     </>
 
  );
};

export default DesactiverExpert;
