import React from "react";
import MyProjectsHeader from "../../components/MyProjects/MyProjectsHeader.jsx";
import MyProjectsContainer from "../../components/MyProjects/MyProjectsContainer.jsx";
import "../../pagesStyles/MyProjectspagesStyle/MyProjects.css";
import SideNav from "../../components/SideNav";
import SearchBar from "../../components/SearchBar.jsx";
import { PuffLoader } from "react-spinners";
import { useState,useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import mesProjets  from "../../services/mesProjets.js"; 
import AuthContext from '../../helpers/AuthContext'
import RefreshService from "../../services/RefreshService";
import Footer from "../../components/Footer.jsx";
const MyProjects = () => {
  const [myProjects, setMyProjects] = useState([]);
  const {authState,setAuthState} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProjects = async () => {
      try {
        const response1= await  RefreshService.Refresh();
        console.log("here is the response from refresh: ",response1);
        setAuthState({email:response1.email,role:response1.role,accessToken:response1.accessToken})
        console.log("the token: ",response1.accessToken);
        const projects = await mesProjets.Get(response1.accessToken);
        setMyProjects(projects);
      } catch (err) {
        console.error("Erreur lors du getting des projets :", err);
      }
      finally{
        setLoading(false);
        console.log('loading set to false');
      }
    };
    getProjects();
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
        <div style={{ minHeight: 'full', display: 'flex', flexDirection: 'column' }}>
  {/* Top Part */}
  <div style={{ flex: 1 }}>
    <div className="myprojectssearchbar">
      <SearchBar title="Rechercher un projet dans le site..." />
    </div>
    <SideNav />
    <div className="root1">
      <MyProjectsHeader />
      <MyProjectsContainer myProjects={myProjects} />
    </div>
  </div>

  {/* Footer stays at the bottom when content is short */}
</div>
      )
    }
    
    
    </>
    

  );
}
export default MyProjects;