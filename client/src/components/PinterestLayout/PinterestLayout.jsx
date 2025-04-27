import "./PinterestLayout.css";
import Card from "../Card/Card";
import { useState } from "react";



function PinterestLayout({projects,fav}){



const [isFavorite,setIsFavorite] = useState(false);
    return(
        

        <div>
    
        <div className="layoutDiv">
        {projects.map((project, index) => {
          setIsFavorite ( false)
          return (
            <Card 
              key={index} 
              size={project.size} 
              data={project} 
              fav={isFavorite}  // Changed from 'favorite' to 'isFavorite'
            />
          );
        })}
        </div>
        </div>
    )
}


export default PinterestLayout;

