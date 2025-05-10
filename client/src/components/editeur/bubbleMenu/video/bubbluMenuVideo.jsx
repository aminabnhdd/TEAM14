import { BubbleMenu } from "@tiptap/react";
import DeleteVideoButton from "./deleteVideoButton";  
import Tooltip from "../../tooltip";
import imageLeft from "../../../../assets/image-left.png";
import imageCenter from "../../../../assets/image-center.png";  
import imageRight from "../../../../assets/image-right.png"; 

// floating menu that appears when clicking in a video in the tiptap editor

export default function BubbleMenuVideo(props) {
  if (!props.editor) {
    console.log("Editor not available"); // Debugging: Log if editor is not available
    return null;
  }

  const alignVideo = (align) => {
    // Update the videoFigure's align attribute
    props.editor
      .chain()
      .focus()
      .updateAttributes("videoFigure", { align })
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

          // Traverse up the DOM to find the videoFigure element
          let videoFigureElement = node;
          while (
            videoFigureElement &&
            videoFigureElement.nodeName !== "FIGURE" &&
            videoFigureElement.getAttribute("data-type") !== "videoFigure"
          ) {
            videoFigureElement = videoFigureElement.parentElement;
          }

          // If the videoFigure element is found, return its bounding rect
          if (videoFigureElement) {
            const rect = videoFigureElement.getBoundingClientRect();
            return rect;
          }

          // Fallback to the node's bounding rect
          const fallbackRect = node.getBoundingClientRect();
          return fallbackRect;
        },
      }}
      shouldShow={({ editor }) => {
        const isVideoFigureActive = editor.isActive("videoFigure");
        return isVideoFigureActive;
      }}
    >
      <div className="bg-white small-remark bubble-menu border rounded-[12px] border-neutral-400 flex items-center gap-1 px-2 ">
        {/* align the video to the left of the text */}
        <Tooltip
          element={
            <button
              onClick={() => alignVideo("left")}
              className="p-1 pt-2 hover:bg-neutral-100 rounded"
              aria-label="Align left"
            >
              <img src={imageLeft} alt="Align left" className="w-4 h-4" />
            </button>
          }
          text="Aligner la vidéo à gauche"
        />

        {/* center the video in its own line */}
        <Tooltip
          element={
            <button
              onClick={() => alignVideo("center")}
              className="p-1 pt-2 hover:bg-neutral-100 rounded"
              aria-label="Align center"
            >
              <img src={imageCenter} alt="Align center" className="w-4 h-4" />
            </button>
          }
          text="Centrer la vidéo"
        />

        {/* align the video to the right of the tex*/}
        <Tooltip
          element={
            <button
              onClick={() => alignVideo("right")}
              className="p-1 pt-2 hover:bg-neutral-100 rounded"
              aria-label="Align right"
            >
              <img src={imageRight} alt="Align right" className="w-4 h-4" />
            </button>
          }
          text="Aligner la vidéo à droite"
        />

        {/* Delete Button */}
        <Tooltip
          element={<DeleteVideoButton editor={props.editor} />}
          text="Supprimer la vidéo"
        />
      </div>
    </BubbleMenu>
  );
}