import React from "react";
import InfoHeader from "../../components/Profil/Infosheader";
import ProfilInfosave from "../../components/Profil/ProfilInfosave";
import FormVisiteur from "../../components/Profil/FormVisiteur";
import "../../pagesStyles/ProfilpagesStyle/SaveVisiteur.css";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const usersData = [
//   {
//     id: 1,
//     nom: "Benhaddad",
//     prenom: "Amina",
//     email: "amina.benhaddad@example.com",
//     telephone: "0550******",
//     pfp: "https://img.freepik.com/vecteurs-premium/icone-profil-avatar-dans-style-plat-illustration-vectorielle-du-profil-utilisateur-feminin-fond-isole-concept-entreprise-signe-profil-feminin_157943-38866.jpg",
//     role : "Visiteur",
//     password : "1234",
//   },
// ];

const SaveVisiteur = () => {
  const [usersData,setUsersData] = useState([]);
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
     <InfoHeader/>
     <ProfilInfosave usersData={usersData} />
     <FormVisiteur  />
    </>

  );
}
export default SaveVisiteur;
