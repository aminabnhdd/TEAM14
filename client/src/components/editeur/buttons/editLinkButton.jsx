import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare} from "@fortawesome/free-solid-svg-icons";

export default function EditLinkButton(props){
    return (
    <button 
        onClick={() => {
        const url = prompt("Enter new URL", props.editor.getAttributes("link").href);
        if (url) {
            props.editor
            .chain()
            .focus()
            .setLink({ href: url })
            .run();
        }
        }}
        className="p-1 hover:bg-neutral-100 rounded"
    >
        <FontAwesomeIcon icon={faPenToSquare} className="w-5 h-5" />
    </button>
    )       
}