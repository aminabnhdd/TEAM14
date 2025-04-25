import defaultPfp from "../../assets/Default_pfp.svg.png"


export default function Annotation(props){
    
    
    return(
    <div   id={`annotation-${props.id}`}  className="border border-neutral-300 rounded-[12px] p-5 mb-3">
    <div className="flex items-center align-items mb-3">
    <div className="w-8 h-8 mr-2 bg-white rounded-full overflow-hidden">
    <img src={props.auteur.pfp || defaultPfp} className="w-full h-full object-cover" alt="Profile" />
</div>

         <p className="thinner-text">{props.auteur.nom} {props.auteur.prenom}</p>
         
    </div> 
   

<p
  className="text-neutral-500 text-md  text-justify mb-3 overflow-hidden"
  style={{
    display: "-webkit-box",
    WebkitLineClamp: 3, // Change this number to the number of lines you want
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  }}
>
  {props.content}
</p>
   
</div> )
}


