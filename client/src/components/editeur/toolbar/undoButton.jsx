
// undo button in the tiptap editor, allows the user to undo the last modification he made in the editor

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo} from "@fortawesome/free-solid-svg-icons";

export default function UndoButton(props){
    return (
    <button className={`px-2 text-neutral-500 cursor-pointer ${
    !props.editor.can().undo() ? 'opacity-50' : ''
    }`}
            onClick={() => props.editor.chain().focus().undo().run()}
            disabled={
            !props.editor.can()
                .chain()
                .focus()
                .undo()
                .run()
            }
        >
        <FontAwesomeIcon icon={faUndo} className="w-5 h-5" />
        </button>
            
    )       
}