import React from "react";
import InfoHeader from "../../components/Profil/Infosheader";
import ProfilInfosave from "../../components/Profil/ProfilInfosave";
import FormVisiteur from "../../components/Profil/FormVisiteur";
import "../../pagesStyles/ProfilpagesStyle/SaveVisiteur.css";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import SideNav from "../../components/SideNav";
import {useContext} from "react";
import AuthContext from "../../helpers/AuthContext";
import SearchBar from "../../components/SearchBar.jsx";

const SaveVisiteur = () => {
  const [usersData,setUsersData] = useState([]);
  const [image,setImage] = useState(null);
  const { setAuthState } = useContext(AuthContext);
  useEffect(() => {
    axios.get("http://localhost:3001/refresh",{withCredentials:true})
        .then((response) => {
            if (response.data.error) return navigate('/connexion')
            setAuthState({email:response.data.email,role:response.data.role,accessToken:response.data.accessToken});
            axios.get(`http://localhost:3001/profil/mon-compte`,{headers:{Authorization:`Bearer ${response.data.accessToken}`}})
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
    <div className="savevisitsearchbar">
        <SearchBar />
       </div>
    <SideNav />
     <div className="root1">
     <InfoHeader/>
     <ProfilInfosave usersData={usersData} setImage={setImage}/>
     <FormVisiteur image ={image}/>
     </div>
   
    </>

  );
}
export default SaveVisiteur;
