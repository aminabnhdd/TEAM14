
// strike button in the tiptap editor, makes the selected text striked

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStrikethrough} from "@fortawesome/free-solid-svg-icons";

export default function StrikeButton(props){
    return (
    <button className={`px-2 cursor-pointer ${props.editor.isActive('strike') ? 'text-black' : 'text-neutral-500'}`} 
    onClick={() => props.editor.chain().focus().toggleStrike().run()}>
    <FontAwesomeIcon icon={faStrikethrough} className="w-5 h-5" />
    </button>
    )       
}