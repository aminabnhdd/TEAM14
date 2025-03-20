import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
      <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
    </button>
  );
}