import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload} from "@fortawesome/free-solid-svg-icons";

export default function SaveIntern(){
    return (
    <button className={`px-2 cursor-pointer `}>
    <FontAwesomeIcon icon={faDownload} className=" w-5 h-5" />
    </button>
    )       
}