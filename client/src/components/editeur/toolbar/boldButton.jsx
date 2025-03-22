
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold} from "@fortawesome/free-solid-svg-icons";

export default function BoldButton(props){
    return (
    <button className={`px-2 cursor-pointer ${props.editor.isActive('bold') ? 'text-black' : 'text-neutral-500'}`}
        onClick={() => props.editor.chain().focus().toggleBold().run()}>
    <FontAwesomeIcon icon={faBold} className=" w-5 h-5" />
    </button>
    )       
}