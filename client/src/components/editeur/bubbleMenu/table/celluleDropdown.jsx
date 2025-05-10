import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown  } from "@fortawesome/free-solid-svg-icons";

// dropdown list that allows the user to perform modifications in a cell in a table in the tiptap editor, appears in the table bubble menu

export default function CelluleDropdown(props){
    return (
    
    <div className="relative inline-block py-[6px] hover:bg-neutral-100">
    <label className="px-2 cursor-pointer text-neutral-500">
    <svg className="w-5  mr-[-2px] inline-block ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M2.5 1h15A1.5 1.5 0 0 1 19 2.5v15a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 1 17.5v-15A1.5 1.5 0 0 1 2.5 1zM2 2v16h16V2H2z" opacity=".6"></path><path d="M7 2h1v16H7V2zm5 0h1v7h-1V2zm6 5v1H2V7h16zM8 12v1H2v-1h6z" opacity=".6"></path><path d="M7 7h12a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zm1 2v9h10V9H8z"></path></svg>    <FontAwesomeIcon icon={faCaretDown} className="w-5 h-5 text-neutral-400" />
      </label>  <select defaultValue=""
        className="absolute right-1 top-0  opacity-0 w-full h-full cursor-pointer"
        onChange={(e) => {
          const value = e.target.value;
    
          if (value === "1") {
            props.editor.chain().focus().mergeCells().run();
          } else if (value === "2") {
            props.editor.chain().focus().splitCell().run();
          } else if (value === "3") {
            props.editor.chain().focus().deleteCell().run();
          } else if (value === "4") {
            props.editor.chain().focus().toggleHeaderCell().run();
          }
    
          // Reset selection so it always shows "Column"
          e.target.value = "";
        }}
      >
        <option value="" disabled  hidden>Cellule</option>
        <option value="1">Fusionner cellules</option>
        <option value="2">Diviser cellule</option> 
        <option value="3">Supprimer cellule</option>
        <option value="4">Basculer cellule en-tête &nbsp; </option>
      </select>
    </div>
    )       
}