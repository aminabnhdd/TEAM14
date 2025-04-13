import SearchBar from '../components/SearchBar/SearchBar';
import SideNav from '../components/SideNav/SideNav';
import HeaderFavourites from '../components/HeaderFavourites/HeaderFavourites';
import PinterestLayout from '../components/PinterestLayout/PinterestLayout';
import axios from "axios";
import {useState, useEffect} from "react";

function Favoris(){

    const [favoriteProjects, setFavoriteProjects] = useState([]);

    useEffect(() => {
        
        const userId = '67c1deb48c91379392eb7c51'; 

        
        axios.get(`http://localhost:3001/projects/favourite/${userId}`)
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

export default Favoris;