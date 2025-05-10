import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


// button to delete an image inside the tiptap editor, it appears in the image bubble menu

export default function DeleteImageButton(props) {
  return (
    <button
      className="p-1 hover:bg-neutral-100 rounded"
      onClick={() => {
        // Delete the figure node
        props.editor.chain().focus().deleteNode("figure").run();
      }}
      disabled={!props.editor.isActive("figure")} // Disable if no figure is active
    >
      <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
    </button>
  );
}