import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo} from "@fortawesome/free-solid-svg-icons";

export default function RedoButton(props){
    return (
    <button className={`px-2 text-neutral-500 cursor-pointer ${
    !props.editor.can().redo() ? 'opacity-50' : ''
    }`}
        onClick={() => props.editor.chain().focus().redo().run()}
        disabled={
        !props.editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
    >
    <FontAwesomeIcon icon={faRedo} className="w-5 h-5" />

    </button>
            
    )       
}