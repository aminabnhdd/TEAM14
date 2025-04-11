import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowDown} from "@fortawesome/free-solid-svg-icons";

export default function saveExtern(){
    return (
    <button className={`px-2 cursor-pointer `}>
    <FontAwesomeIcon icon={faCloudArrowDown} className=" w-5 h-5" />
    </button>
    )       
}