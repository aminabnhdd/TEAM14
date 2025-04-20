import "./PinterestLayout.css";
import Card from "../Card/Card";




function PinterestLayout({projects,fav}){




    return(
        

        <div>
    
        <div className="layoutDiv">
          {projects.map((project, index) => (
            <Card key={index} size={project.size} data={project} fav={fav} />
          ) )}
            
        </div>
        </div>
    )
}


export default PinterestLayout;

