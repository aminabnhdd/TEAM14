import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import AnnotationService from "../../../services/AnnotationService";
import  AuthContext from "../../../helpers/AuthContext.jsx"
import {useContext} from "react"

    

export default function ReferencesButton({ editor,projet, references, setReferences }) {
  const [showPopup, setShowPopup] = useState(false);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const popupRef = useRef(null);
  const {authState} = useContext(AuthContext);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const insertReferenceNode = (refId, refNumber) => {

    editor.chain().focus().insertContent({
      type: "reference",
      attrs: {
        id:refId,
 
        number: refNumber,
  
      },
    }).run();
  
    setShowPopup(false);

  };

  const handleInsertReference = (refId) => {
    const refIndex = references.findIndex(ref => ref._id === refId);
    if (refIndex === -1) return;

    const updatedReferences = [...references];

    
    setReferences(updatedReferences);
    setShowPopup(false);
   insertReferenceNode(references[refIndex]._id,references[refIndex].number)
 

  };

  const handleCreateReference = async () => {
    try{
      console.log(authState);
    // Concatenate fields, filtering out empty ones
    const referenceParts = [
      author,
      title,
      date
    ].filter(part => part.trim() !== "");

    if (referenceParts.length === 0) return;
console.log("HERE IS THE PROJET ID ",projet._id);
    const respon = await AnnotationService.Reference(
      projet._id,references.length + 1,
       referenceParts.join(", "),
       authState.accessToken
    );
    const newRef = respon.reference;

    setReferences([...references, newRef]);
    
      

    setAuthor("");
    setTitle("");
    setDate("");
    
    insertReferenceNode(newRef._id, newRef.number);
  } catch (error) {
    console.error("Error Reference:", error);
  } finally {
    setShowPopup(false); 
  }
  };

  return (
    <div className="relative" ref={popupRef}>
      <button
        className={`px-2 cursor-pointer ${
          editor.isActive("reference") ? "text-black" : "text-neutral-500"
        }`}
        onClick={() => setShowPopup(!showPopup)}
      >
        <FontAwesomeIcon icon={faQuoteLeft} className="w-5 h-5" />
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[3000]">
          <div className="bg-white rounded-[20px] shadow-lg w-full max-w-[460px] px-10 py-7 relative border border-black">
            {/* Close Button */}
            <button
              className="absolute top-3 right-5 text-black hover:text-gray-600 text-2xl cursor-pointer"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>

            {/* Popup Title */}
            <h2 className="text-black mb-5 text-xl font-medium">Insérer une référence</h2>

            <div className="mb-3">
              <h3 className="font-medium text-sm mb-2 text-brown">Sélectionner une référence existante</h3>
              <div className="max-h-50 overflow-y-auto">
                {references.length === 0 ? (
                  <p className="text-md text-gray-500">Aucune référence existante</p>
                ) : (
                  references.map((ref) => (
                    <div
                      key={ref._id}
                      className="p-3  hover:bg-neutral-100 rounded-lg cursor-pointer text-md flex justify-between items-center mb-1 transition-colors duration-200"
                      onClick={() => handleInsertReference(ref._id)}
                    >
                      <span className="font-medium">[{ref.number}] {ref.text.substring(0, 25)}{ref.text.length > 25 ? "..." : ""}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium text-sm mb-3 text-brown">Créer une nouvelle référence</h3>
              
              <div className="flex flex-col space-y-3">
  <input
    type="text"
    value={author}
    onChange={(e) => setAuthor(e.target.value)}
    placeholder="Auteur"
    className="flex-1 px-4 py-2 border border-neutral-300 rounded-xl text-neutral-700 focus:outline-none focus:ring-1 focus:ring-dune"
  />
  <input
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Titre"
    className="flex-1 px-4 py-2 border border-neutral-300 rounded-xl text-neutral-700 focus:outline-none focus:ring-1 focus:ring-dune"
  />
  <input
    type="text"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    placeholder="Date de publication"
    className="flex-1 px-4 py-2 border border-neutral-300 rounded-xl text-neutral-700 focus:outline-none focus:ring-1 focus:ring-dune"
  />
</div>


              <div className="flex justify-around gap-3 mt-5">
                <button
                  onClick={handleCreateReference}
                  className="text-black bg-dune py-3 w-40 rounded-[36px] items-center justify-center hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer"
                >
                  Ajouter
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-black bg-neutral-100 py-3 w-40 rounded-[36px] items-center justify-center hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}