import React from "react";
import PasswordHeader from "../../components/Profil/PasswordHeader.jsx";
import PasswordCard from "../../components/Profil/PasswordCard.jsx";
import "../../pagesStyles/ProfilpagesStyle/ChangerMotdePasse.css";
import SideNav from "../../components/SideNav";
import SearchBar from "../../components/SearchBar.jsx";
import { useEffect } from "react";
import axios from "axios";
import AuthContext from "../../helpers/AuthContext.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";



const ChangerMotDePasse = () => {
  const {authState,setAuthState} = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get("http://localhost:3001/refresh",{withCredentials:true})
    .then((response) => {
        if (response.data.error) return navigate('/connexion');
        console.log(response.data);
        setAuthState({email:response.data.email,role:response.data.role,accessToken:response.data.accessToken});
    })
    .catch((error)=>{
      console.log(error);
      navigate('/connexion')
    })
  },[])

  return (
    <>
    <div className="mdpsearchbar">
        <SearchBar />
    </div>
    
    <SideNav />
    <div className="root1">
    <div className="password-page">
      <PasswordHeader />
      <PasswordCard />
    </div>
    </div>
    </>

  );
};

export default ChangerMotDePasse;