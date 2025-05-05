


import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar/SearchBar';
import SideNav from '../components/SideNav';
import HeaderFavourites from '../components/HeaderFavourites/HeaderFavourites';
import PinterestLayout from '../components/PinterestLayout/PinterestLayout';
import axios from "axios"; 
import { useState, useEffect, useContext } from "react";
import AuthContext from '../helpers/AuthContext';
import { PuffLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import Pfp from '../components/pfp';
function Favoris() {
    const [favoriteProjects, setFavoriteProjects] = useState([]);
    const [user, setUser] = useState({});
    const { authState,setAuthState } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [projects,setProjects] = useState([]);

    const override = {
    display: "block",
    position:"absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50%,-50%)"
};


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get refreshed token and user info
                const refreshResponse = await axios.get("http://localhost:3001/refresh", {
                    withCredentials: true,
                });

                console.log(refreshResponse.data);

                // Update auth state with refreshed info
                setAuthState({
                    email: refreshResponse.data.email,
                    role: refreshResponse.data.role,
                    accessToken: refreshResponse.data.accessToken,
                });

                const userResponse = await axios.get('http://localhost:3001/profil/mon-compte',{
                    headers: {
                        Authorization: `Bearer ${refreshResponse.data.accessToken}`,
                    }
                });
                setUser(userResponse.data);

                console.log(userResponse.data);

                // Fetch favorite projects
                const res = await axios.get('http://localhost:3001/projects/favourite', {
                    headers: {
                        Authorization: `Bearer ${refreshResponse.data.accessToken}`,
                    },
                    withCredentials: true,
                });

                setFavoriteProjects(res.data);
                setProjects(res.data)
                setLoading(false); 
            } catch (err) {
                console.error('Error fetching favorite projects or refreshing token:', err);
            }
        };

        fetchData();
    }, [setAuthState]);

    
const handleSearch = async (query) => {

  if (!query.trim()) {

      setProjects(favoriteProjects); 
      return;
    }

  try {
    const res = await axios.get(`http://localhost:3001/projects/search?keyword=${query}`);
    const data = res.data;

    console.log("Ids of searched projects are", res.data);
    console.log('Ids of favorite project IDs:', favoriteProjects.map(p => p._id));

    // Get IDs of favorite projects
    const favoriteIds = new Set(favoriteProjects.map(project => project._id));

    // Filter only those projects that are in the user's favorites
    const filteredResults = data.filter(project => favoriteIds.has(project._id));

    // Format the result (e.g. adding 'size')
    const projects = filteredResults.map(project => ({
      ...project,
      size: 'medium',
    }));

    console.log("searched projects that are favourite also are:", projects);

    setProjects(projects);
  } catch (err) {
    console.error("Search error:", err);
  }
};

    


//     const navigate = useNavigate();
//   const handleClick = () => {
//     navigate(`/modifier-${authState.role === "Expert" ? "expert" : "visiteur"}`); // Change this to your desired route
//     };

//     const imgUrl = user.pfp ;
    
  
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
         {/* <div
  className={`fixed top-7 right-4 z-5000 w-12 h-12 rounded-full border-2 ${imgUrl ?"border-white" : "border-brown"} 
             bg-white flex items-center justify-center cursor-pointer rounded-full
            hover:scale-105 transition-transform duration-200`}
  onClick={handleClick}
>
  {imgUrl ? <img src={imgUrl} className='rounded-full' /> :
  <FaUser className="text-brown w-6 h-6" /> }
</div> */}<Pfp fixed={true}/>
     <div className="flex-1 flex relative  max-w-full ">
       <SideNav className="" />
       <div className="flex-1 w-full bg-white main-content">
         
         <main className="text-black">
      
           <HeaderFavourites />
           <SearchBar  onSearch={handleSearch} />
           {favoriteProjects.length === 0 ? <p className='pl-20 main-text text-black text-center my-10'>Aucun projet trouvé.</p> :<PinterestLayout projects={ projects}  pageFav={true}/>}
 
          
          </main>
         
        
       </div>

     </div>
   <Footer/> 
   </div>
      )
    }
    
    
    </>
        
    );
}

export default Favoris;
