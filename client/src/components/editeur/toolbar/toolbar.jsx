import React from "react";
import '../../../componentsStyles/editeur/tiptap.css'
import Tooltip from "../tooltip.jsx";
import BoldButton from "./boldButton";
import ItalicButton from "./italicButton";
import StrikeButton from "./strikeButton";
import UnderlineButton from "./underlineButton";
import SizeDropdown from "./sizeDropDown";
import UnorderedListButton from "./unorderedListButton";
import OrderedListButton from "./orderedListButtton";
import BlockQuoteButton from "./blockQuoteButton";
import LinkButton from "./linkButton";
import InsertImageButton from "./insertImageButton.jsx.jsx";
import InsertTableButton from "./insertTableButton";
import UndoButton from "./undoButton";
import RedoButton from "./redoButton.jsx";
import AlignmentDropdown from "./alignementDropdown.jsx";
import InsertVideoButton from "./insertVideoButton.jsx";
import AnnotationButton from "../annotationButton.jsx";
export default function Toolbar(props){

    return(
<div className="toolbar border-b border-neutral-400 px-4 py-2.5 text-neutral-500 flex  justify-between">
  {/* Left-aligned buttons */}
  <div className="flex flex-wrap gap-y-2">
    <div className="inline-flex px-2 border-r">
      <Tooltip element={<SizeDropdown editor={props.editor} />} text="Taille du text" />
    </div>

    <div className="inline-flex px-2 border-r">
      <Tooltip element={<BoldButton editor={props.editor} />} text="Gras" />
      <Tooltip element={<ItalicButton editor={props.editor} />} text="Italique" />
      <Tooltip element={<StrikeButton editor={props.editor} />} text="Rayé" />
      <Tooltip element={<UnderlineButton editor={props.editor} />} text="Souligné" />
    </div>

    <div className="inline-flex px-2 border-r">
      <Tooltip element={<UnorderedListButton editor={props.editor} />} text="Liste non ordonnée" />
      <Tooltip element={<OrderedListButton editor={props.editor} />} text="Liste ordonnée" />
    </div>

    <div className="inline-flex px-2 border-r">
      <Tooltip element={<AlignmentDropdown editor={props.editor} />} text="Aligner le text" />
    </div>

    <div className="inline-flex px-2 border-r">
      <Tooltip element={<BlockQuoteButton editor={props.editor} />} text="Citation" />
      <Tooltip element={<LinkButton editor={props.editor} />} text="Lien" />
    </div>

    <div className="inline-flex px-2 border-r">
      <Tooltip element={<InsertImageButton editor={props.editor} />} text="Inserer image" />
      <Tooltip element={<InsertVideoButton editor={props.editor} />} text="Inserer vidéo" />
      <Tooltip element={<InsertTableButton editor={props.editor} />} text="Inserer tableau" />
    </div>

    <div className="inline-flex px-2 border-r">
      <Tooltip element={<UndoButton editor={props.editor} />} text="Annuler" />
      <Tooltip element={<RedoButton editor={props.editor} />} text="Rétablir" />
    </div>
  </div>

  {/* Right-aligned AnnoterButton */}
  <div className=" ml-4  rounded-[12px] flex align-items text-brown hover:underline">
  <AnnotationButton editor={props.editor} />
    </div>

    

</div>
         
    )
}