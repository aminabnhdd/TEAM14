import annoterIcon from "../../assets/message.png";
import { useState } from "react";
import PopAnnotation from "./popupAnnot";

export default function AnnotationButton({ editor, annotations, setAnnotations }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddAnnotation = (content) => {
    console.log(annotations);
    if (!editor) {
      console.error("Editor is not available.");
      return;
    }
    const user = {
        id: 1,
        nom: "Rahim",
        prenom: "Sarah",
        email: "ns_rahim@esi.dz",
        photoProfil: "https://media.istockphoto.com/id/1495088043/fr/vectoriel/ic%C3%B4ne-de-profil-utilisateur-avatar-ou-ic%C3%B4ne-de-personne-photo-de-profil-symbole-portrait.jpg?s=612x612&w=0&k=20&c=moNRZjYtVpH-I0mAe-ZfjVkuwgCOqH-BRXFLhQkZoP8=",
        num: "0550550550",
        date: 1742515200000,
        role: "historien",
        uservalide: true,
        favoris: [],
      }
    // Create an annotation object
    const annotation = {
      id: Date.now(), // Generate a unique ID
      projetId: 1,
      sectionId:1,
      auteur: user,
      selected:"text",
      content: content,
    };

    // Add the new annotation to the annotations array
    setAnnotations([...annotations, annotation]);

    // Apply the annotation mark to the selected text in the editor
    editor
      .chain()
      .focus()
      .setMark("annotation", { id: annotation.id }) // Use the custom annotation mark
      .run();

    // Close the popup
    setIsPopupOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsPopupOpen(true)} // Open the popup when clicked
        className="main-text text-brown border border-neutral-300 px-5 py-3 flex gap-2 rounded-[36px] items-center justify-center cursor-pointer hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer"
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