import React, { useEffect } from "react";
import RestoreProjectsHeader from "../../components/MyProjects/RestoreProjectsHeader.jsx";
import RestoreProjectsContainer from  "../../components/MyProjects/RestoreProjectsContainer.jsx";
import "../../pagesStyles/MyProjectspagesStyle/RestoreProjects.css";
import SideNav from "../../components/SideNav";
import SearchBar from "../../components/SearchBar.jsx";
import axios from "axios";
import AuthContext from "../../helpers/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


const RestoreProjects = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  useEffect(() => {
    axios.get("http://localhost:3001/refresh",{withCredentials:true})
      .then((response) => {
          if (response.data.error) return navigate('/connexion');
          setAuthState({email:response.data.email,role:response.data.role,accessToken:response.data.accessToken});
      })
      .catch((error)=>{
        console.log(error);
      })
  }, []);
  return(
    <>
      <div className="restaurerprojetssearchbar">
        <SearchBar />
       </div>
      <SideNav />
      <div className="root1">
      <RestoreProjectsHeader token={authState.accessToken}/>
      <RestoreProjectsContainer />
      </div>
    </>
  );
}

export default RestoreProjects;
