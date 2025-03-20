import React from "react";
import '../../componentsStyles/editeur/tiptap.css'

import Tooltip from "./tooltip";
import BoldButton from "./buttons/boldButton";
import ItalicButton from "./buttons/italicButton";
import StrikeButton from "./buttons/strikeButton";
import UnderlineButton from "./buttons/underlineButton";
import SizeDropdown from "./buttons/sizeDropDown";
import UnorderedListButton from "./buttons/unorderedListButton";
import OrderedListButton from "./buttons/orderedListButtton";
import BlockQuoteButton from "./buttons/blockQuoteButton";
import LinkButton from "./buttons/linkButton";
import InsertImageButton from "./buttons/insertImageButton";
import InsertTableButton from "./buttons/insertTableButton";
import UndoButton from "./buttons/undoButton";
import RedoButton from "./buttons/redoButton.jsx";
import AlignmentDropdown from "./buttons/alignementDropdown.jsx";

export default function Toolbar(props){

    return(

      <div className="toolbar border-b border-neutral-400 px-4 py-2.5 text-neutral-500 flex flex-wrap gap-y-2">
       
        <div className="inline-flex px-2 border-r ">
          <Tooltip element={<SizeDropdown editor={props.editor}/>} text="Taille du text" />
        </div>

        <div className="inline-flex px-2 border-r ">
          <Tooltip element={<BoldButton editor={props.editor}/>} text="Gras" />
          <Tooltip element={<ItalicButton editor={props.editor}/>} text="Italique" />
          <Tooltip element={<StrikeButton editor={props.editor}/>} text="Rayé" />
          <Tooltip element={<UnderlineButton editor={props.editor}/>} text="Souligné" />
        </div>
        
        <div className="inline-flex px-2 border-r ">
          <Tooltip element={<UnorderedListButton editor={props.editor}/>} text="Liste non ordonnée" />
          <Tooltip element={<OrderedListButton editor={props.editor}/>} text="Liste ordonnée" />
        </div>

        <div className="inline-flex px-2 border-r ">
          <Tooltip element={<AlignmentDropdown editor={props.editor}/>} text="Aligner le text" />        
        </div>

        <div className="inline-flex px-2 border-r ">
          <Tooltip element={<BlockQuoteButton editor={props.editor}/>} text="Citation" />
          <Tooltip element={<LinkButton editor={props.editor}/>} text="Lien" />
        </div>

        <div className="inline-flex px-2 border-r ">
          <Tooltip element={<InsertImageButton editor={props.editor}/>} text="Inserer image" />
          <Tooltip element={<InsertTableButton editor={props.editor}/>} text="Inserer tableau" />
        </div>
        
        <div className="inline-flex px-2 border-r ">
          <Tooltip element={<UndoButton editor={props.editor}/>} text="Annuler" />
          <Tooltip element={<RedoButton editor={props.editor}/>} text="Rétablir" />
        </div>
        
       </div>   
         
    )
}