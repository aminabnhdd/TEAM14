import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


// button to delete a video in the tiptap editor, appears in the video bubble menu

export default function DeleteVideoButton({ editor }) {
  const handleDelete = useCallback(() => {
    if (editor) {
      editor.chain().focus().deleteNode("videoFigure").run();
    }
  }, [editor]);

  return (
    <button
      onClick={handleDelete}
      className="p-1 hover:bg-neutral-100 rounded"
      aria-label="Delete video"
    >
           <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />

    </button>
  );
}