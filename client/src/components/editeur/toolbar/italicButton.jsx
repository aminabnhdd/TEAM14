
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faItalic} from "@fortawesome/free-solid-svg-icons";

export default function ItalicButton(props){
    return (
    <button className={`px-2 cursor-pointer ${props.editor.isActive('italic') ? 'text-black' : 'text-neutral-500'}`} 
    onClick={() => props.editor.chain().focus().toggleItalic().run()}>
    <FontAwesomeIcon icon={faItalic} className="w-5 h-5" />
    </button>
    )       
}