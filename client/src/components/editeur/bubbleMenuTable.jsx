import { BubbleMenu } from "@tiptap/react";
import ColonneDropdown from "./buttons/colonneDropdown";
import CelluleDropdown from "./buttons/celluleDropdown";
import LigneDropdown from "./buttons/ligneDropdown";
import DeleteTableDropdown from "./buttons/deleteTableDropdown";
import Tooltip from "./tooltip";

export default function BubbleMenuTable(props) {
  if (!props.editor) return null;

  return (
    <BubbleMenu
  editor={props.editor}
  tippyOptions={{
    duration: 100,
    placement: "top-start", // Position at the top-left of the table
    offset: [0, 4], // [horizontal, vertical] offset
    getReferenceClientRect: () => {
      // Get the table node's bounding box
      const { view, state } = props.editor;
      const { from } = state.selection;
      const node = view.domAtPos(from).node;

      // Traverse up the DOM to find the table element
      let tableElement = node;
      while (tableElement && tableElement.nodeName !== "TABLE") {
        tableElement = tableElement.parentElement;
      }

      if (tableElement) {
        const rect = tableElement.getBoundingClientRect();
        console.log("Table bounding box:", rect); // Debugging: Log the bounding box
        return rect;
      }

      // Fallback to the cell's bounding box if no table is found
      const fallbackRect = node.getBoundingClientRect();
      console.log("Fallback bounding box:", fallbackRect); // Debugging: Log the fallback bounding box
      return fallbackRect;
    },
  }}
  shouldShow={({ editor }) => editor.isActive("table")}
>

      <div className="bg-white small-remark bubble-menu border rounded-[12px] border-neutral-400 flex items-center gap-0 pl-2 pr-1">
        <Tooltip element={<ColonneDropdown editor={props.editor} />} text="Colonne" />
        <Tooltip element={<LigneDropdown editor={props.editor} />} text="Ligne" />
        <Tooltip element={<CelluleDropdown editor={props.editor} />} text="Cellule" />
        <Tooltip element={<DeleteTableDropdown editor={props.editor} />} text="Supprimer le tableau" />
      </div>
    </BubbleMenu>
  );
}