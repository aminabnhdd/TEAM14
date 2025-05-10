
// button to insert a table in the tiptap editor

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable} from "@fortawesome/free-solid-svg-icons";

export default function InsertTableButton(props){
    return (
    <button    className="px-2 cursor-pointer text-neutral-500"
    onClick={() => props.editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
    <FontAwesomeIcon icon={faTable} className="w-5 h-5 " />
    </button>              
    )       
}