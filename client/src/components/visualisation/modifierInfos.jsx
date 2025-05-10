// modify project informations button
// available to chef de project to change the informations of the project

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


export default function ModifyInfos(props){
    
 
        const navigate = useNavigate();
      

        // navigate to modify project page
        const handleModify = () => {
            
            navigate(`/modifier-projet/${props.projet._id}`);  
        }; 

    return(
        <button onClick={handleModify}
         className="ml-auto mr-auto text-brown bg-white border border-neutral-300 mt-4
        rounded-[30px] py-3 flex align-items items-center gap-3 bolder-text px-5
        hover:brightness-105 hover:scale-102 transition-all duration-300 cursor-pointer">
            <FontAwesomeIcon icon={faPenToSquare} className=" w-5 h-5" />
            Modifier les informations
        </button>
    )
}