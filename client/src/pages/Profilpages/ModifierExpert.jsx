import React from "react";
import ProfilInfolink from "../../components/Profil/ProfilInfolink.jsx";
import ModifExpertCard from "../../components/Profil/ModifCardExpert.jsx";
import InfoHeaderBtn from "../../components/Profil/Infoheaderbtn.jsx";
import "../../pagesStyles/ProfilpagesStyle/ModifierExpert.css";
import  {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"; 
import SideNav from "../../components/SideNav";
import SearchBar from "../../components/SearchBar.jsx";
import { useContext } from "react";
import AuthContext from "../../helpers/AuthContext.jsx";

const ModifierExpert = () => {
  const [usersData,setUsersData] = useState([]);
  const navigate = useNavigate();
  const {authState,setAuthState} = useContext(AuthContext);

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
      <div className="modfexpertsearchbar">
        <SearchBar />
       </div>
      <SideNav />
      <div className="root1">
      <InfoHeaderBtn />
      <ProfilInfolink usersData={usersData} />
      
      <ModifExpertCard usersData={usersData}/>
      </div>
    </>
  );
};

export default ModifierExpert;