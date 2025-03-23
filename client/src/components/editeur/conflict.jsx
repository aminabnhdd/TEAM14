import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck} from "@fortawesome/free-solid-svg-icons";

export default function Conflict(props){
    const resoudreConflit = () => {
        props.setConflits((prevConflits) => {
            return prevConflits.map((conflict) => {
                if (conflict.id === props.conflit.id) {
                    // Mark the specific conflict as resolved
                    return {
                        ...props.conflit,
                        resolu: true,
                    };
                }
                // Return the conflict unchanged if it's not the one to resolve
                return props.conflit;
            });
        });
    };
console.log(props.conflits) 
    return(
    <div id={props.id} className="border border-neutral-300 rounded-[12px] p-5 mb-3">
    <div className="flex items-center align-items mb-3">
    <div className="w-8 h-8 mr-2 bg-neutral-500 rounded-full overflow-hidden">
    <img src={props.conflit.signaleur.pfp} className="w-full h-full object-cover" alt="Profile" />
</div>

         <p className="thinner-text">{props.conflit.signaleur.nom} {props.conflit.signaleur.prenom}</p>
    </div> 
    <p className="small-remark break-words whitespace-pre-wrap  overflow-y-auto text-black text-justify mb-3" >{props.conflit.content}</p>   
    {(props.projet.chef.id === props.user.id || props.conflit.signaleur.id ===props.user.id) && <button onClick={resoudreConflit} className="main-text text-center w-full text-success cursor-pointer hover:underline">
    <FontAwesomeIcon icon={faCircleCheck} className=" w-4 h-4 mr-2" />Supprimer conflit
    </button>}
</div> )
}


