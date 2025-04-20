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
function Favoris() {
    const [favoriteProjects, setFavoriteProjects] = useState([]);
    const { setAuthState } = useContext(AuthContext);

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
    navigate('/modifier-profil'); // Change this to your desired route
    };

    return (
        <div className='min-h-screen relative flex flex-col'>
        <div className='sticky top-10 pr-4 self-end z-50 cursor-pointer' onClick={handleClick}>
           <FaUser className="icon text-brown w-6 h-6" />
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
     <Footer/>
   </div>
    );
}

export default Favoris;
