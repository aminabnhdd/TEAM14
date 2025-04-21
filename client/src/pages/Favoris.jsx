/*import SearchBar from '../components/SearchBar/SearchBar';
import SideNav from '../components/SideNav/SideNav';
import HeaderFavourites from '../components/HeaderFavourites/HeaderFavourites';
import PinterestLayout from '../components/PinterestLayout/PinterestLayout';
import axios from "axios";
import {useState, useEffect} from "react";

function Favoris(){

    const [favoriteProjects, setFavoriteProjects] = useState([]);

    useEffect(() => {
        
       
        
        axios.get('http://localhost:3001/projects/favourite')
            .then(res => {
                setFavoriteProjects(res.data);  // Set the response data (list of favorite projects)
            })
            .catch(err => {
                console.error('Error fetching favorite projects:', err);
            });
    }, []);

    return(
    <div>
    <HeaderFavourites />
    <SearchBar />
    <SideNav />
    <PinterestLayout projects={favoriteProjects}/>  
    </div>
    )
}

export default Favoris;*/

import { FaUser } from 'react-icons/fa';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar/SearchBar';
import SideNav from '../components/SideNav';
import HeaderFavourites from '../components/HeaderFavourites/HeaderFavourites';
import PinterestLayout from '../components/PinterestLayout/PinterestLayout';
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AuthContext from '../helpers/AuthContext';
import { useNavigate } from 'react-router-dom';
import defaultPfp from "../assets/Default_pfp.svg.png"

function Favoris() {
    const [favoriteProjects, setFavoriteProjects] = useState([]);
    const [user, setUser] = useState({});
    const { setAuthState } = useContext(AuthContext);

     const [user,setUser]=useState(null);
      //const imgUrl = user.pfp ;
    
      //temporary
      const imgUrl = defaultPfp;

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
            } catch (err) {
                console.error('Error fetching favorite projects or refreshing token:', err);
            }
        };

        fetchData();
    }, [setAuthState]);

    const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/modifier-${authState.role === "Expert" ? "expert" : "visiteur"}`); // Change this to your desired route
    };

    return (
        <div className='min-h-screen relative flex flex-col'>
         <div
  className={`fixed top-7 right-4 z-5000 w-12 h-12 rounded-full border-2 border-white ${!imgUrl && "border-brown"} 
             bg-white flex items-center justify-center cursor-pointer 
              hover:brightness-105 hover:scale-105 transition-transform duration-200`}
  onClick={handleClick}
>
  {imgUrl ? <img src={imgUrl} /> :
  <FaUser className="text-brown w-6 h-6" /> }
</div>
     <div className="flex-1 flex relative  max-w-full ">
       <SideNav className="" />
       <div className="flex-1 w-full bg-white main-content">
         
         <main className="text-black">
      
           <HeaderFavourites />
           <SearchBar/>
           {favoriteProjects.length === 0 ? <p className='pl-20 main-text text-black text-center my-10'>Aucun projet trouvé.</p> : <PinterestLayout projects={favoriteProjects} fav={true}/>} 

          
          </main>
         
        
       </div>

     </div>

   </div>
    );
}

export default Favoris;
