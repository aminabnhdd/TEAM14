
export default function Annotation(props){
    console.log(props.id)
    
    return(
    <div   id={`annotation-${props.id}`}  className="border border-neutral-300 rounded-[12px] p-5 mb-3">
    <div className="flex items-center align-items mb-3">
    <div className="w-8 h-8 mr-2 bg-neutral-500 rounded-full overflow-hidden">
    <img src={props.auteur.pfp} className="w-full h-full object-cover" alt="Profile" />
</div>

         <p className="thinner-text">{props.auteur.nom} {props.auteur.prenom}</p>
         
    </div> 
    <p className="small-remark break-words whitespace-pre-wrap  overflow-y-auto text-black text-justify mb-3" >{props.content}</p>   
   
</div> )
}


