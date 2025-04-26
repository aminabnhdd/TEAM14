import PinterestLayout from '../components/PinterestLayout/PinterestLayout';
import SearchBar from '../components/SearchBar/SearchBar';
import SideNav from '../components/SideNav';
import Header from '../components/Header/Header';
import Footer from "../components/Footer"
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Filters from '../components/Filters/Filters';
import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import AuthContext from '../helpers/AuthContext';
import Pfp from '../components/pfp';
function Decouvrir() {
  const [projects, setProjects] = useState([]);
  const { authState,setAuthState } = useContext(AuthContext);

  const [user,setUser]=useState({});
 

  

  const handleSearch = async (query) => {
    try {
      const res = await axios.get(`http://localhost:3001/projects/search?keyword=${query}`);
      const data = res.data;

      console.log(data);
      const projectsWithSizes = data.map((project) => ({
        ...project,
        size: getRandomSize(),
      }));

      setProjects(projectsWithSizes);

    } catch (err) {
      console.error("Search error:", err);
    }
  };



  /*const fetchFilteredProjects = async (filter) => {
      try{

        // Get refreshed token and user info
         /* const refreshResponse = await axios.get("http://localhost:3001/refresh", {
           withCredentials: true,
          });

          setAuthState({
            email: refreshResponse.data.email,
            role: refreshResponse.data.role,
            accessToken: refreshResponse.data.accessToken,
        });

          let url = 'http://localhost:3001/projects/search/filters';
          if(filter != "Tout"){
              url += `?filters=${filter}`;
          }else{
              url = 'http://localhost:3001/projects';
          }

          console.log("fetchig from", url);

          const response = await axios.get(url);

         /* console.log("Access Token:", refreshResponse.data.accessToken);

         const data = response.data;

         console.log("full response : ", response);
         console.log("data : ", data);

         if (!Array.isArray(response.data)) {
          console.error("Unexpected API response format:", response.data);
          return;
      }

          const projectsWithSizes = data.map((project) => ({
              ...project,
              size: getRandomSize(),
            }));
      
            setProjects(projectsWithSizes);
          } catch (error) {
            console.error("Error fetching filtered projects", error);
          }
      };*/

  const fetchFilteredProjects = async (filter) => {
    try {
      
      let url = 'http://localhost:3001/projects/search/filters';
      if (filter != "Tout") {
        url += `?filters=${filter}`;
      } else {
        url = 'http://localhost:3001/projects';
      }

      console.log("fetchig from", url);

      const response = await axios.get(url);
      const data = response.data;

      console.log("full response : ", response);
      console.log("data : ", data);

      if (!Array.isArray(response.data)) {
        console.error("Unexpected API response format:", response.data);
        return;
      }

      const projectsWithSizes = data.map((project) => ({
        ...project,
        size: getRandomSize(),
      }));

      setProjects(projectsWithSizes);
    } catch (error) {
      console.error("Error fetching filtered projects", error);
    }
  };




  useEffect(() => {
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
    fetchFilteredProjects("Tout"); // Load all projects on page load
  }, []);

  function getRandomSize() {
    const sizes = ["small", "medium", "large"];
    return sizes[Math.floor(Math.random() * sizes.length)];
  }
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/modifier-${authState.role === "Expert" ? "expert" : "visiteur"}`);
    };
    const imgUrl = user.pfp ;
  return (
    <div className='min-h-screen relative flex flex-col'>
       <Pfp fixed={true}/>
      <div className="flex-1 flex relative  max-w-full ">
        <SideNav className="" />
        <div className="flex-1 w-full bg-white main-content">
          
          <main className="text-black">
       
            <Header />
            <SearchBar onSearch={handleSearch} />
    
             <Filters fetchFilteredProjects={fetchFilteredProjects}/> 
            {projects.length === 0 ? <p className='pl-20 main-text text-black text-center my-10'>Aucun projet trouvé.</p> : <PinterestLayout projects={projects} fav={false}/>} 
           
           </main>
          
         
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default Decouvrir;