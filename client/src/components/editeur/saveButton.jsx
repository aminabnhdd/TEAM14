
// button in editeur page to save the content of the tiptap editor and the gallery


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import SectionService from "../../services/sectionService";
import AuthContext from "../../helpers/AuthContext.jsx";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SaveButton({ editor, section, images }) {
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);


    // saving the content of editor and gallery
    const handleSave = async () => {
        if (isLoading) return; // Prevent multiple clicks
        
        setIsLoading(true);
        const jsonContent = editor.getJSON();

        try {
            await SectionService.updateSection(
                section._id, 
                jsonContent, 
                images,
                authState.accessToken
            );
            console.log("Section saved successfully!");
            console.log("here is the projet id of the section: ", section.projetId);
            navigate(`/visualisation/${section.projetId._id}`);
        } catch (error) {
            console.error("Error saving section:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleSave}
            disabled={isLoading}
            className={`main-text text-black bg-dune flex gap-2 py-3 px-5 mt-4 rounded-[36px] items-center justify-center 
                       hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 
                       ${isLoading ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
        >
            <FontAwesomeIcon 
                icon={faFloppyDisk} 
                className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} 
            />
            {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
    );
}