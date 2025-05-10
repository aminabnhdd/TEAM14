// Modifier Visiteur Page
// - Allows the Visitor to view his own profile
// - Contains the user's personal informations
// - Allows the user to change his informations

import InfoHeaderBtn from "../../components/Profil/Infoheaderbtn.jsx";
import ProfilInfolink from "../../components/Profil/ProfilInfolink.jsx";
import ModifCardVisiteur from "../../components/Profil/ModifCardVisiteur.jsx";
import "../../pagesStyles/ProfilpagesStyle/ModifierVisiteur.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import SideNav from "../../components/SideNav";
import SearchBar from "../../components/SearchBar.jsx";
import { useContext } from "react";
import AuthContext from "../../helpers/AuthContext.jsx";
import { PuffLoader } from "react-spinners";

const ModifierVisiteur = () => {
  const [usersData,setUsersData] = useState([]);
  const navigate = useNavigate();
  const {authState,setAuthState} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // fetch the user's informations
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
        <div className="modifiervisitsearchbar">
          <SearchBar />
         </div>
        <SideNav />  
        <div className="root1">
        <InfoHeaderBtn />
        <ProfilInfolink usersData={usersData}  />
        <ModifCardVisiteur usersData={usersData}/>
        </div>
      </>
      )
    }
    
    
    </>
    

  );
};

export default ModifierVisiteur;
