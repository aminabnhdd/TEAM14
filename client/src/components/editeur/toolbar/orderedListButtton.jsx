
// ordered list button to change text into an ordered list in the tiptap editor 


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListOl} from "@fortawesome/free-solid-svg-icons";

export default function OrderedListButton(props){
    return (
         <button className={`px-2 cursor-pointer ${props.editor.isActive('orderedList') ? 'text-black' : 'text-neutral-500'}`}
        onClick={() => props.editor.chain().focus().toggleOrderedList().run()}>
        <FontAwesomeIcon icon={faListOl} className="w-5 h-5" />
        </button>
    )       
}