import annoterIcon from "../../assets/message.png";
import { useState } from "react";
import PopAnnotation from "./popupAnnot";
import AnnotationService from "../../services/AnnotationService";
import  AuthContext from "../../helpers/AuthContext.jsx"
import {useContext} from "react"

    
export default function AnnotationButton({
  editor,
  annotations,
  setAnnotations,
  user,
  projet,
  section,
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const {authState} = useContext(AuthContext);

  const handleAddAnnotation = async (content) => {
    try {
      if (!editor) {
        console.error("Editor is not available.");
        return;
      }
 

      const respon = await AnnotationService.Annoter(
        section._id,
        projet._id,
        content,
        authState.accessToken
      );
      console.log("here is the annotation", respon.annotation);
      setAnnotations([...annotations, respon.annotation]);
      // Apply the annotation mark to the selected text in the editor
      editor
        .chain()
        .focus()
        .setMark("annotation", { id: respon.annotation._id }) // Use the custom annotation mark
        .run();

        const json = editor.getJSON();
        const respon2 = await AnnotationService.Update(section._id, projet._id,json,authState.accessToken);
        console.log("here is the new content",respon2.section);

    } catch (error) {
      console.error("Error Annotation:", error);
    } finally {
      setIsPopupOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsPopupOpen(true)} // Open the popup when clicked
        className="main-text text-brown border border-neutral-300 px-5 py-3 flex gap-2 rounded-[36px] items-center justify-center hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer"
      >
        <img className="w-4 h-4" src={annoterIcon} alt="Annotation Icon" />
        Ajouter une annotation
      </button>

      {/* Render the PopAnnotation popup if isPopupOpen is true */}
      {isPopupOpen && (
        <PopAnnotation
          onClose={() => setIsPopupOpen(false)} // Close the popup
          onSubmit={handleAddAnnotation} // Handle annotation creation
        />
      )}
    </>
  );
}
