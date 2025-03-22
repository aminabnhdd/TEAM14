import { BubbleMenu } from "@tiptap/react";
import Tooltip from "../../tooltip";
import BreakLinkButton from "./breakLinkButton";
import EditLinkButton from "./editLinkButton";
import OpenLinkButton from "./openLinkButton";

export default function BubbleMenuLink(props) {
  if (!props.editor) return null;

  return (
    <BubbleMenu
      editor={props.editor}
      tippyOptions={{
        duration: 100,
        placement: "top", // Position at the top-left of the link
        offset: [0, 4], // [horizontal, vertical] offset
        getReferenceClientRect: () => {
          // Get the link node's bounding box
          const { view, state } = props.editor;
          const { from } = state.selection;
          const node = view.domAtPos(from).node;

          // Traverse up the DOM to find the link element
          let linkElement = node;
          while (linkElement && linkElement.nodeName !== "A") {
            linkElement = linkElement.parentElement;
          }

          if (linkElement) {
            const rect = linkElement.getBoundingClientRect();
            console.log("Link bounding box:", rect); // Debugging: Log the bounding box
            return rect;
          }

          // Fallback to the current node's bounding box if no link is found
          const fallbackRect = node.getBoundingClientRect();
          console.log("Fallback bounding box:", fallbackRect); // Debugging: Log the fallback bounding box
          return fallbackRect;
        },
      }}
      shouldShow={({ editor }) => editor.isActive("link")} // Show only for links
    >
      <div className="bg-white small-remark bubble-menu border rounded-[12px] border-neutral-400 flex items-center gap-0 pl-2 pr-2 py-1 h">
        
        <Tooltip element={<OpenLinkButton editor={props.editor}/>} text="Ouvrir le lien" />
        <Tooltip element={<EditLinkButton editor={props.editor}/>} text="Modifier le lien" />
        <Tooltip element={<BreakLinkButton editor={props.editor}/>} text="Supprimer le lien" />

      </div>
    </BubbleMenu>
  );
}