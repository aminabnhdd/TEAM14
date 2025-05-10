import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect, useContext } from "react";
import AnnotationService from "../../../services/AnnotationService";
import AuthContext from "../../../helpers/AuthContext.jsx";

export default function ReferencesButton({ editor, projet, references, setReferences }) {
  const [showPopup, setShowPopup] = useState(false);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const popupRef = useRef(null);
  const { authState } = useContext(AuthContext);

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
        id: refId,
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
    insertReferenceNode(references[refIndex]._id, references[refIndex].number);
  };

  const handleCreateReference = async () => {
    try {
      const referenceParts = [author, title, date].filter(part => part.trim() !== "");
      if (referenceParts.length === 0) return;

      const respon = await AnnotationService.Reference(
        projet._id,
        references.length + 1,
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
        <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/30">
          <div className="relative z-[11000] w-[32%] p-8 flex flex-col gap-6 bg-white rounded-[29px] animate-fadeIn">
            <div className="text-center font-semibold text-[22px] mb-3 text-black">
              <p>Insérer une référence</p>
            </div>

            <button
              className="absolute top-5 right-5 text-black text-[25px] hover:text-warning cursor-pointer"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>

            <div className="text-[13px] font-medium text-justify z-[1100] text-black">
              <p>Sélectionner une référence existante :</p>
              <div className="max-h-30 overflow-y-auto mt-2">
                {references.length === 0 ? (
                  <p className="text-sm text-gray-500">Aucune référence existante</p>
                ) : (
                  references.map((ref) => (
                    <div
                      key={ref._id}
                      className="p-2 hover:bg-neutral-100 rounded-lg cursor-pointer text-sm flex justify-between items-center  transition-colors duration-200 text-neutral-500"
                      onClick={() => handleInsertReference(ref._id)}
                    >
                      <span className="font-medium">[{ref.number}] {ref.text.substring(0, 25)}{ref.text.length > 25 ? "..." : ""}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2 border-t border-gray-200">
              <p className="font-medium text-sm text-black">Créer une nouvelle référence :</p>

              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Auteur"
                className="px-4 py-2 border border-neutral-300 rounded-xl text-black focus:outline-none focus:ring-1 focus:ring-dune"
              />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titre"
                className="px-4 py-2 border border-neutral-300 rounded-xl text-black focus:outline-none focus:ring-1 focus:ring-dune"
              />
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Date de publication"
                className="px-4 py-2 border border-neutral-300 rounded-xl text-black focus:outline-none focus:ring-1 focus:ring-dune"
              />
            </div>

            <div className="flex justify-center gap-8 mt-3">
              <button
                onClick={handleCreateReference}
                className="flex w-[40%] py-3 justify-center items-center rounded-[27px] bg-success hover:scale-102 hover:brightness-105 text-white font-semibold transition-colors cursor-pointer"
              >
                Ajouter
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="flex w-[40%] py-3 justify-center items-center rounded-[27px] bg-warning text-white font-semibold transition-colors hover:brightness-105 hover:scale-102 cursor-pointer"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
