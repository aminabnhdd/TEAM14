import React , { useState } from "react";
import InfosProjets2 from "../../components/Profil/InfosProjets2.jsx";
import ProfilInfowithoutlink from "../../components/Profil/ProfilInfowithoutlink.jsx";
import DesactCardExpert from "../../components/Profil/DesactCardExpert.jsx";
import "../../pagesStyles/ProfilpagesStyle/DesactiverExpert.css";
import PopDesactiver from "../../components/Profil/PopDesactiver.jsx";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../helpers/AuthContext.jsx";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import SideNav from "../../components/SideNav";
import SearchBar from "../../components/SearchBar.jsx";
import { PuffLoader } from "react-spinners";


const DesactiverExpert = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [usersData,setUsersData] = useState([]);
  const {authState,setAuthState} = useContext(AuthContext);
  const { id } = useParams(); 
    const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const override = {
    display: "block",
    position:"absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50%,-50%)"
};
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
console.log(usersData)
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

      <div className="desactxpertsearchbar">
        <SearchBar />
       </div>
      <SideNav />
      <div className="root1">
      <InfosProjets2 id={id} />
      <ProfilInfowithoutlink usersData={usersData} />
      <DesactCardExpert usersData={usersData} />

      {/* Bouton Désactiver */}
      {usersData.userValide ?

<button className="desactiver-btn" onClick={() =>setShowPopup(true)}>
  Désactiver le compte
</button> : <br/> }
      {showPopup && <PopDesactiver usersData={usersData} onClose={() => setShowPopup(false)} />}
        </div>
     </>
      )
    }
    
    
    </>
     
 
  );
};

export default DesactiverExpert;