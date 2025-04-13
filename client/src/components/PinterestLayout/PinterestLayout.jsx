import "./PinterestLayout.css";
import Card from "../Card/Card";




function PinterestLayout({projects}){




    return(
        

        <div>
    
        <div className="layoutDiv">
          {projects.map((project, index) => (
            <Card key={index} size={project.size} data={project} />
          ) )}
            
        </div>
        </div>
    )
}


export default PinterestLayout;

