import { BubbleMenu } from "@tiptap/react";
import DeleteImageButton from "./buttons/deleteImageButton";
import Tooltip from "./tooltip";
import imageLeft from "../../assets/image-left.png";
import imageCenter from "../../assets/image-center.png"; // Import the center alignment image
import imageRight from "../../assets/image-right.png"; // Import the right alignment image

export default function BubbleMenuImage(props) {
  if (!props.editor) {
    console.log("Editor not available"); // Debugging: Log if editor is not available
    return null;
  }

  const alignFigure = (align) => {
    // Update the figure's align attribute
    props.editor
      .chain()
      .focus()
      .updateAttributes("figure", { align })
      .run();
  };

  return (
    <BubbleMenu
      editor={props.editor}
      tippyOptions={{
        duration: 100,
        placement: "top-start",
        offset: [0, 4],
        getReferenceClientRect: () => {
          const { view, state } = props.editor;
          const { from } = state.selection;

          // Get the node at the current selection
          const node = view.domAtPos(from).node;

          // Traverse up the DOM to find the figure element
          let figureElement = node;
          while (figureElement && figureElement.nodeName !== "FIGURE") {
            figureElement = figureElement.parentElement;
          }

          if (figureElement) {
            const rect = figureElement.getBoundingClientRect();
            return rect;
          }

          const fallbackRect = node.getBoundingClientRect();
          return fallbackRect;
        },
      }}
      shouldShow={({ editor }) => {
        const isFigureActive = editor.isActive("figure");
        return isFigureActive;
      }}
    >
      <div className="bg-white small-remark bubble-menu border rounded-[12px] border-neutral-400 flex items-center gap-1 px-2 ">
      <Tooltip element={<button
          onClick={() => alignFigure("left")}
          className="p-1 pt-2  hover:bg-neutral-100 rounded"
          aria-label="Align left"
        >
          <img src={imageLeft} alt="Align left" className="w-4 h-4" />
        </button>} text="Aligner l'image à gauche" />
      <Tooltip element={<button
          onClick={() => alignFigure("center")}
          className="p-1 pt-2 hover:bg-neutral-100 rounded"
          aria-label="Align center"
        >
          <img src={imageCenter} alt="Align center" className="w-4 h-4" />
        </button>} text="Centrer l'image  " />
      <Tooltip element={<button
          onClick={() => alignFigure("right")}
          className="p-1 pt-2 hover:bg-neutral-100 rounded"
          aria-label="Align right"
        >
          <img src={imageRight} alt="Align right" className="w-4 h-4" />
        </button>} text="Aligner l'image à droite" />

        
        
        
        <Tooltip element={<DeleteImageButton editor={props.editor} />} text="Supprimer l'image" />

      </div>
    </BubbleMenu>
  );
}