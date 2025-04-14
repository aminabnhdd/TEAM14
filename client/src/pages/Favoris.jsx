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


import SearchBar from '../components/SearchBar/SearchBar';
import SideNav from '../components/SideNav/SideNav';
import HeaderFavourites from '../components/HeaderFavourites/HeaderFavourites';
import PinterestLayout from '../components/PinterestLayout/PinterestLayout';
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AuthContext from '../helpers/AuthContext';

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

    return (
        <div>
            <HeaderFavourites />
            <SearchBar />
            <SideNav />
            <PinterestLayout projects={favoriteProjects} />
        </div>
    );
}

export default Favoris;
