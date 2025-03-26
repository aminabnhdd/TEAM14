
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import SectionService from "../../services/sectionService";

export default function SaveButton({editor,section,setSaved}){
        const handleSave = async () => {
    
            const jsonContent = editor.getJSON();
    console.log('this is the jsonContent:',jsonContent);
            try {
                await SectionService.updateSection(section._id, jsonContent);
                setSaved(false);
                console.log("Section saved successfully!");
            } catch (error) {
                console.error("Error saving section:", error);
            }
    }

    return(
        <button onClick={handleSave}
         className="main-text text-black bg-dune flex gap-2 py-3 px-5 mt-4 rounded-[36px] items-center justify-center hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer">
            <FontAwesomeIcon icon={faFloppyDisk} className="w-4 h-4"  />
            Sauvegarder
        </button>
    )
}