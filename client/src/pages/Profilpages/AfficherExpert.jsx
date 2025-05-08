import React, { useState } from "react";
import InfosProjets from "../../components/Profil/InfosProjets.jsx";
import ProfilInfowithoutlink from "../../components/Profil/ProfilInfowithoutlink.jsx";
import AffichCardExpert from "../../components/Profil/AffichCardExpert.jsx";
import "../../pagesStyles/ProfilpagesStyle/AfficherExpert.css";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import SideNav from "../../components/SideNav";
import SearchBar from "../../components/SearchBar.jsx";
import { PuffLoader } from "react-spinners";
import { useContext } from "react";
import AuthContext from "../../helpers/AuthContext.jsx";

const AfficherExpert  = () => {
  const [usersData,setUsersData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [loading, setLoading] = useState(true);
  const { authState,setAuthState } = useContext(AuthContext);
  useEffect(() => {
    axios.get("http://localhost:3001/refresh",{withCredentials:true})
        .then((response) => {
            if (response.data.error) return navigate('/connexion')
            setAuthState({email:response.data.email,role:response.data.role,accessToken:response.data.accessToken});
            axios.get(`http://localhost:3001/profil/expert/${id}`,{headers:{Authorization:`Bearer ${response.data.accessToken}`}})
            .then((response) => {
              const updatedUsers = [...usersData, response.data].map((user) => ({
                ...user, 
                role:
                  user.discipline.toLowerCase() === "histoire"
                    ? "historien"
                    : user.discipline.toLowerCase() === "architecture"
                    ? "architecte"
                    : (user.discipline.toLowerCase() === "archéologie" || user.discipline.toLowerCase() === "archeologie")
                    ? "archéologue"
                    : "",
              }));
          
              setUsersData(updatedUsers);
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
  return(
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
    <div className="affexpertsearchbar">
        <SearchBar />
       </div>
    <SideNav />
    <div className="root1">
    <InfosProjets id = {id} />
    <ProfilInfowithoutlink usersData={usersData} />
    <AffichCardExpert usersData={usersData} />
    <br/>
    </div>
    </>
      )
    }
    
    
    </>
    
  );
}
export default AfficherExpert ;