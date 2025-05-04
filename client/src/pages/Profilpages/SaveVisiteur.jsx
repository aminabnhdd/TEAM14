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
import { PuffLoader } from "react-spinners";

const SaveVisiteur = () => {
  const [usersData,setUsersData] = useState([]);
  const [image,setImage] = useState(null);
  const { setAuthState } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
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
            })
            .finally(()=>{
              setLoading(false);
            });
        })
        .catch((error) => {
            console.log(error);
        });
              
  }, []);
  const override = {
    display: "block",
    position:"absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50%,-50%)"
};
  return (
    <>
    {
      loading ? (
        <PuffLoader
                    color="#e8c07d"
                    loading={loading}
                    cssOverride={override}
                    size={70}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
      ) : 
      
      (
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
      )
    }
    
    
    </>
    

  );
}
export default SaveVisiteur;
