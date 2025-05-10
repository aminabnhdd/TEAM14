import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown  } from "@fortawesome/free-solid-svg-icons";


// dropdown list that allows the user to perform modifications in a line in a table in the tiptap editor, appears in the table bubble menu


export default function LigneDropdown(props){
    return (
    <div className="relative inline-block py-[6px] hover:bg-neutral-100">
    <label className="px-2 cursor-pointer text-neutral-500">
    <svg className="w-5  mr-[2px] inline-block ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M2.5 1h15A1.5 1.5 0 0 1 19 2.5v15a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 1 17.5v-15A1.5 1.5 0 0 1 2.5 1zM2 2v16h16V2H2z" opacity=".6"></path><path d="M7 2h1v16H7V2zm5 0h1v16h-1V2z" opacity=".6"></path><path d="M1 6h18a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm1 2v4h4V8H2zm6 0v4h4V8H8zm6 0v4h4V8h-4z"></path></svg>    <FontAwesomeIcon icon={faCaretDown} className="w-5 h-5 text-neutral-400" />
      </label>  <select defaultValue=""
        className="absolute right-1 top-0 opacity-0 w-full h-full cursor-pointer"
        onChange={(e) => {
          const value = e.target.value;
    
          if (value === "1") {
            props.editor.chain().focus().addRowBefore().run();
          } else if (value === "2") {
            props.editor.chain().focus().addRowAfter().run();
          } else if (value === "3") {
            props.editor.chain().focus().deleteRow().run();
          } else if (value === "4") {
            props.editor.chain().focus().toggleHeaderRow().run();
          }
    
          // Reset selection so it always shows "Column"
          e.target.value = "";
        }}
      >
        <option value="" disabled  hidden>Ligne</option>
        <option value="1">Inserer ligne avant</option>
        <option value="2">Inserer ligne après</option>
        <option value="3">Supprimer ligne</option>
        <option value="4">Basculer ligne en-tête &nbsp; </option>
      </select>
    </div>
    )       
}