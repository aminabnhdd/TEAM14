import React from "react";
import InfoHeader from "../../components/Profil/Infosheader";
import ProfilInfosave from "../../components/Profil/ProfilInfosave";
import FormExpert from "../../components/Profil/FormExpert";
import "../../pagesStyles/ProfilpagesStyle/SaveExpert.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import SideNav from "../../components/SideNav";
import SearchBar from "../../components/SearchBar.jsx";
import AuthContext from "../../helpers/AuthContext";
import { useContext } from "react";
import { PuffLoader } from "react-spinners";


const SaveExpert = () => {
  const { setAuthState } = useContext(AuthContext);
  const [usersData,setUsersData] = useState([]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("http://localhost:3001/refresh",{withCredentials:true})
        .then((response) => {
            if (response.data.error) return navigate('/connexion')
            setAuthState({email:response.data.email,role:response.data.role,accessToken:response.data.accessToken});
            axios.get(`http://localhost:3001/profil/mon-compte`,{headers:{Authorization:`Bearer ${response.data.accessToken}`}})
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
    <div className="savexpertsearchbar">
        <SearchBar />
    </div>
    <SideNav />
    <div className="root1">
     <InfoHeader/>
     <ProfilInfosave usersData={usersData} setImage={setImage} />
     <FormExpert image={image}/>
     </div>
    </>
      )
    }
    
    
    </>
    

  );
}
export default SaveExpert;
