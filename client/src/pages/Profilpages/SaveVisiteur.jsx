import React from "react";
import InfoHeader from "../../components/Profil/Infosheader";
import ProfilInfosave from "../../components/Profil/ProfilInfosave";
import FormVisiteur from "../../components/Profil/FormVisiteur";
import "../../pagesStyles/ProfilpagesStyle/SaveVisiteur.css";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const SaveVisiteur = () => {
  const [usersData,setUsersData] = useState([]);
  const {id} = useParams();
  useEffect(() => {
    axios.get("http://localhost:3001/refresh",{withCredentials:true})
        .then((response) => {
            if (response.data.error) return navigate('/connexion')
            // setAuthState({email:response.data.email,role:response.data.role,accessToken:response.data.accessToken});
            axios.get(`http://localhost:3001/profil/visiteur/${id}`,{headers:{Authorization:`Bearer ${response.data.accessToken}`}})
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
     <FormVisiteur  id = {id}/>
    </>

  );
}
export default SaveVisiteur;
