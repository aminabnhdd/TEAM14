import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import ConflitService from "../../services/ConflitService";
import  AuthContext from "../../helpers/AuthContext.jsx"
import {useContext} from "react"
import defaultPfp from "../../assets/Default_pfp.svg.png"

export default function Conflict(props){
    const {authState} = useContext(AuthContext);
    
    const resoudreConflit = async () => {
        try {
            
            
            await ConflitService.resoudreConflit(props.conflit._id,authState.accessToken);
    
            props.setConflits((prevConflits) => {
                return prevConflits.map((conflict) => {
                    if (conflict._id === props.conflit._id) {
                        
                        return {
                            ...props.conflit,
                            resolu: true,
                        };
                    }
                   
                    return props.conflit;
                });
            });
        } catch (error) {
            console.error("Erreur lors de la résolution du conflit:", error);
        }
    };
   
    
    return(
    <div id={props.id} className="border border-neutral-300 rounded-[12px] p-5 mb-3">
    <div className="flex items-center align-items mb-3">
    <div className="w-8 h-8 mr-2 bg-neutral-500 rounded-full overflow-hidden">
    <img src={props.conflit.signaleur.pfp||defaultPfp} className="w-full h-full object-cover" alt="Profile" />
</div>

         <p className="thinner-text">{props.conflit.signaleur.nom} {props.conflit.signaleur.prenom}</p>
    </div> 
    <p className="small-remark break-words whitespace-pre-wrap  overflow-y-auto text-black text-justify mb-3" >{props.conflit.content}</p>   
    {(props.projet.chef._id === props.user._id|| props.conflit.signaleur._id ===props.user._id) && <button onClick={resoudreConflit} className="main-text text-center w-full text-success cursor-pointer hover:underline">
    <FontAwesomeIcon icon={faCircleCheck} className=" w-4 h-4 mr-2" />Résoudre conflit
    </button>}
</div> )
}


