
// unordered list button to change text into an unordered list in the tiptap editor 


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl} from "@fortawesome/free-solid-svg-icons";

export default function UnorderedListButton(props){
    return (
        <button className={`px-2 cursor-pointer ${props.editor.isActive('bulletList') ? 'text-black' : 'text-neutral-500'}`}
        onClick={() => props.editor.chain().focus().toggleBulletList().run()}>
        <FontAwesomeIcon icon={faListUl} className="w-5 h-5" />
        </button>
    )       
}