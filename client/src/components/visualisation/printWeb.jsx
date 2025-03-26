
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint} from "@fortawesome/free-solid-svg-icons";

export default function PrintWeb(){
    return (
    <button className={`px-2 cursor-pointer `}>
    <FontAwesomeIcon icon={faPrint} className=" w-5 h-5" />
    </button>
    )       
}