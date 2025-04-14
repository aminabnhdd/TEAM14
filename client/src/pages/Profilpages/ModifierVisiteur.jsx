import React from "react";
import InfoHeaderBtn from "../../components/Profil/Infoheaderbtn.jsx";
import ProfilInfolink from "../../components/Profil/ProfilInfolink.jsx";
import ModifCardVisiteur from "../../components/Profil/ModifCardVisiteur.jsx";
import "../../pagesStyles/ProfilpagesStyle/ModifierVisiteur.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModifierVisiteur = () => {
  const [usersData,setUsersData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3001/refresh",{withCredentials:true})
        .then((response) => {
            if (response.data.error) return navigate('/connexion')
            // setAuthState({email:response.data.email,role:response.data.role,accessToken:response.data.accessToken});
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
        <div className="root1">
      <InfoHeaderBtn />
      <ProfilInfolink usersData={usersData}  />
      <ModifCardVisiteur usersData={usersData} />
      </div>
    </>

  );
};

export default ModifierVisiteur;
