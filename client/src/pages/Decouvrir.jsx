import PinterestLayout from '../components/PinterestLayout/PinterestLayout';
import SearchBar from '../components/SearchBar/SearchBar';
import SideNav from '../components/SideNav';
import Header from '../components/Header/Header';
import Footer from "../components/Footer";
import { useNavigate, useSearchParams } from 'react-router-dom';
import Filters from '../components/Filters/Filters';
import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import AuthContext from '../helpers/AuthContext';
import Pfp from '../components/pfp';
import { BarLoader, PuffLoader } from 'react-spinners';

function Decouvrir() {
  const [projects, setProjects] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  const override = {
    display: "block",
    position:"absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50%,-50%)"
};

  // Get initial search query from URL
  const initialQuery = searchParams.get('query') || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/refresh", { withCredentials: true });
        if (response.data.error) {
          navigate('/connexion');
          return;
        }
        
        setAuthState({
          email: response.data.email,
          role: response.data.role,
          accessToken: response.data.accessToken
        });
    
        const response2 = await axios.get("http://localhost:3001/profil/mon-compte", {
          headers: { Authorization: `Bearer ${response.data.accessToken}` }
        });
        setUser(response2.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        navigate('/connexion');
      }
    };
    
    fetchData();
    
    // If there's a query in URL, use it for initial search
    if (initialQuery) {
      handleSearch(initialQuery);
    } else {
      fetchFilteredProjects("Tout");
    }
  }, []);

  const handleSearch = async (query) => {
    // Update URL with search query
    setSearchParams({ query });
    
    if (!query.trim()) {
      fetchFilteredProjects('Tout');
    } else {
      try {
        const res = await axios.get(`http://localhost:3001/projects/search?keyword=${query}`);
        const projectsWithSizes = res.data.map((project) => ({
          ...project,
          size: getRandomSize(),
        }));
        setProjects(projectsWithSizes);
      } catch (err) {
        console.error("Search error:", err);
      }
    }
  };

  const fetchFilteredProjects = async (filter) => {
    try {
      let url = 'http://localhost:3001/projects/search/filters';
      if (filter != "Tout") {
        url += `?filters=${filter}`;
      } else {
        url = 'http://localhost:3001/projects';
      }

      const response = await axios.get(url);
      const data = response.data;

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

  function getRandomSize() {
    const sizes = ["small", "medium", "large"];
    return sizes[Math.floor(Math.random() * sizes.length)];
  }

  const handleClick = () => {
    navigate(`/modifier-${authState.role === "Expert" ? "expert" : "visiteur"}`);
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
        <div className='min-h-screen relative flex flex-col'>
      <Pfp fixed={true}/>
      <div className="flex-1 flex relative max-w-full">
        <SideNav className="" />
        <div className="flex-1 w-full bg-white main-content">
          <main className="text-black">
            <Header />
            <SearchBar onSearch={handleSearch} />
            <Filters fetchFilteredProjects={fetchFilteredProjects}/> 
            {projects.length === 0 ? 
              <p className='pl-20 main-text text-black text-center my-10'>Aucun projet trouvé.</p> : 
              <PinterestLayout projects={projects} fav={user.favorites}/>} 
          </main>
        </div>
      </div>
      <Footer/>
    </div>
      )
    }
    
    
    </>
    
  )
}

export default Decouvrir;