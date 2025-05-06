
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


export default function PrintWeb(props){

    
    const navigate = useNavigate();
    function sendToPrint(){
        navigate("/impression-web"
        ,{
            state: {
                projet: props.projet,
                chef: props.chef,
                collaborateurs: props.collaborateurs,
                references:props.references,
              }
        })
    }
    return (
    <button className={`px-2 cursor-pointer `}>
    <FontAwesomeIcon icon={faPrint} onClick={sendToPrint} className=" w-5 h-5" />
    </button>
    )       
}