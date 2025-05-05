import "./PinterestLayout.css";
import Card from "../Card/Card";




function PinterestLayout({projects,fav =[],pageFav = false}){



    return( 
        

        <div>
    
        <div className="layoutDiv">
        {projects.map((project, index) => {
const isFavorite = pageFav || (Array.isArray(fav) && fav.includes(project._id));
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

