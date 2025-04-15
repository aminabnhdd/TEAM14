import PinterestLayout from '../components/PinterestLayout/PinterestLayout';
import SearchBar from '../components/SearchBar/SearchBar';
import SideNav from '../components/SideNav/SideNav';
import Header from '../components/Header/Header';
import Filters from '../components/Filters/Filters';
import {useState, useEffect} from 'react';
import axios from "axios";
/*import AuthContext from '../helpers/AuthContext';*/

function Decouvrir(){
    const [projects, setProjects] = useState([]);
    /*const { setAuthState } = useContext(AuthContext);*/
  
      
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
          try{
              let url = 'http://localhost:3001/projects/search/filters';
              if(filter != "Tout"){
                  url += `?filters=${filter}`;
              }else{
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
        fetchFilteredProjects("Tout"); // Load all projects on page load
      }, []);
    
      function getRandomSize() {
        const sizes = ["small", "medium", "large"];
        return sizes[Math.floor(Math.random() * sizes.length)];
      }
    
  return(
        <div>
            <Header />
            <SearchBar onSearch={handleSearch}/>
            <SideNav />
            <Filters fetchFilteredProjects={fetchFilteredProjects}/> 
            {projects.length === 0 ? <p>No projects found.</p> : <PinterestLayout projects={projects} />}
            
        </div>
    )
}

export default Decouvrir;