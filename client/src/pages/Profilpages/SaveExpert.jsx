import React from "react";
import InfoHeader from "../../components/Profil/Infosheader";
import ProfilInfosave from "../../components/Profil/ProfilInfosave";
import FormExpert from "../../components/Profil/FormExpert";
import "../../pagesStyles/ProfilpagesStyle/SaveExpert.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const SaveExpert = () => {
  const [usersData,setUsersData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios.get("http://localhost:3001/refresh",{withCredentials:true})
        .then((response) => {
            if (response.data.error) return navigate('/connexion')
            // setAuthState({email:response.data.email,role:response.data.role,accessToken:response.data.accessToken});
            axios.get(`http://localhost:3001/profil/expert/${id}`,{headers:{Authorization:`Bearer ${response.data.accessToken}`}})
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
    <div className="root1">
     <InfoHeader/>
     <ProfilInfosave usersData={usersData} />
     <FormExpert id={id}/>
     </div>
    </>

  );
}
export default SaveExpert;
