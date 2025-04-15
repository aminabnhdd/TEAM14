import React from "react";
import ProjetsInfos2 from "../../components/Profil/ProjetsInfos2.jsx";
import ProfilInfowithoutlink from "../../components/Profil/ProfilInfowithoutlink.jsx";
import ProjectsContainer from "../../components/Profil/ProjectsContainer.jsx";
import "../../pagesStyles/ProfilpagesStyle/ProjetsExpert2.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../helpers/AuthContext.jsx";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import SideNav from "../../components/SideNav";
import SearchBar from "../../components/SearchBar.jsx";


const ProjetsExpert2 =() => {
  const [usersData,setUsersData] = useState([]);
  const {authState,setAuthState} = useContext(AuthContext);
  const [projects,setProjects] = useState([]);
  const [loading,setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
      axios.get("http://localhost:3001/refresh",{withCredentials:true})
          .then((response) => {
              const accessToken = response.data.accessToken;
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
                      : user.discipline.toLowerCase() === "archéologie"
                      ? "archéologue"
                      : "",
                }));
            
                setUsersData(updatedUsers);
                axios.get(`http://localhost:3001/profil/expert/${updatedUsers[0]._id}/projets`, { headers: { Authorization: `Bearer ${accessToken}` } })
              .then((response) => {
                setProjects(response.data.projects);
                setLoading(false);
              })
              .catch((error) => {
                console.log(error);
              });
              })
              .catch((error) => {
                  console.log(error);
              });
          })
          .catch((error) => {
              console.log(error);
          });
                
    }, []);
  return(
    <>
      <div className="projetexpert2searchbar">
        <SearchBar />
       </div>
      <SideNav />
      <div className="root1">
      <ProjetsInfos2 />
      <ProfilInfowithoutlink usersData={usersData} />
      <ProjectsContainer projets={projects}/>
      </div>
    </>
  );
}
export default ProjetsExpert2;