import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown  } from "@fortawesome/free-solid-svg-icons";


// dropdown list that allows the user to perform modifications in a column in a table in the tiptap editor, appears in the table bubble menu


export default function ColonneDropdown(props){
    return (
    <div className="relative inline-block py-[6px] hover:bg-neutral-100">
              <label className="px-2 cursor-pointer text-neutral-500 ">
                <svg className="w-5 mr-[2px] inline-block ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M2.5 1h15A1.5 1.5 0 0 1 19 2.5v15a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 1 17.5v-15A1.5 1.5 0 0 1 2.5 1zM2 2v16h16V2H2z" opacity=".6"></path><path d="M18 7v1H2V7h16zm0 5v1H2v-1h16z" opacity=".6"></path><path d="M14 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1zm-2 1H8v4h4V2zm0 6H8v4h4V8zm0 6H8v4h4v-4z"></path></svg>
                <FontAwesomeIcon icon={faCaretDown} className="w-5 h-5 text-neutral-400" />
              </label>
             <select defaultValue="" className="absolute right-3 top-0 opacity-0 w-full h-full cursor-pointer "
             onChange={(e) => {
              const value = e.target.value;
              if (value === "1") {
                props.editor.chain().focus().addColumnBefore().run();
              } else if (value === "2") {
                props.editor.chain().focus().addColumnAfter().run();
              } else if (value === "3") {
                props.editor.chain().focus().deleteColumn().run();
              } else if (value === "4") {
                props.editor.chain().focus().toggleHeaderColumn().run();
              }
             e.target.value = "";
            }}>
            <option value="" disabled  hidden>Colonne</option>
            <option value="1">Inserer colonne avant</option>
            <option value="2">Inserer colonne après</option>
            <option value="3">Supprimer colonne</option>
            <option value="4">Basculer colonne en-tête &nbsp; </option>
           </select>
          </div>
    )       
}