import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

export default function SaveButton({editor,section,setSaved}){

    const handleSave = ()=> {
        
    const json = editor.getJSON();
    console.log(json,section);
    setSaved(false)
  //save to the database
    }

    return(
        <button onClick={handleSave}
         className="main-text text-black bg-dune flex gap-2 py-3 px-5 mt-4 rounded-[36px] items-center justify-center hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer">
            <FontAwesomeIcon icon={faFloppyDisk} className="w-4 h-4"  />
            Sauvegarder
        </button>
    )
}