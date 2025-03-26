
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf} from "@fortawesome/free-solid-svg-icons";

export default function PrintPDF(){
    return (
    <button className={`px-2 cursor-pointer `}>
    <FontAwesomeIcon icon={faFilePdf} className=" w-5 h-5" />
    </button>
    )       
}