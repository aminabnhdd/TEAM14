// popup where the user writes an annotation

import { useRef, useState } from "react";

export default function PopAnnotation({ onClose, onSubmit }) {
  const inputRef = useRef(null);

  // error if the content is empty
  const [error, setError] = useState(false);


  // submitting the annotation
  const handleSubmit = (e) => {
    e.preventDefault();
    const content = inputRef.current.value;
    setError(!content);
    onSubmit(content);
  };

  return (
    <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/30">
      <div className="relative z-[11000] w-[32%] p-8 flex flex-col gap-6 bg-white rounded-[29px] animate-fadeIn">
        {/* Close Button */}
        <button
          className="absolute top-4 right-5 text-black text-2xl font-normal hover:text-warning cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Title */}
        <div className="text-center font-semibold text-[22px] ">
          <p>Ajouter une annotation</p>
        </div>

        {/* Textarea */}
        <div className="flex flex-col gap-3">
          <textarea
            rows={4}
            type="text"
            ref={inputRef}
            placeholder="Rédigez une annotation sur cette section pour suggérer des modifications ou des ajouts."
            className="w-full placeholder:text-neutral-500
 text-md text-black px-4 py-3 border border-neutral-400 rounded-xl resize-none  focus:border-transparent focus:outline-none focus:ring-1 focus:ring-dune placeholder:text-neutral-400"
          />
          {error && (
            <p className="text-sm text-warning mt-">
              Le contenu de l'annotation ne doit pas être vide.
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-8 mt-2">
          <button
            type="submit"
            onClick={handleSubmit}
            className={`flex w-[40%] py-3 justify-center items-center rounded-[27px] ${error ? "bg-gray-400 cursor-not-allowed" : "bg-success hover:scale-102 hover:brightness-105 cursor-pointer"} text-white font-semibold transition-colors`}
            disabled={error}
          >
            Ajouter
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex w-[40%] py-3 justify-center items-center rounded-[27px] bg-warning text-white font-semibold transition-colors hover:brightness-105 hover:scale-102 cursor-pointer"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
