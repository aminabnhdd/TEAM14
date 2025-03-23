import { useRef } from "react";

export default function PopAnnotation({ onClose, onSubmit }) {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = inputRef.current.value;
    onSubmit(content); // Pass the content to the parent component
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1001]">
      <div className="bg-white rounded-[20px] shadow-lg w-100 px-10 py-7 relative border border-black">
        {/* Close Button */}
        <button
          className="absolute top-3 right-5 text-black hover:text-warning"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Popup Title */}
        <h2 className="buttons text-black mb-5">Ajouter une annotation</h2>

        {/* Content Input Form */}
        <form onSubmit={handleSubmit}>
          <textarea
            rows={4}
            type="text"
            ref={inputRef} // Attach the ref to the input
            placeholder="Rédigez une annotation sur cette section pour suggérer des modifications ou des ajouts."
            className="w-full text-justify main-text px-4 py-2 border border-neutral-300 rounded-xl text-neutral-500 resize-none focus:outline-none focus:ring-1 focus:ring-dune"
          />

          {/* Action Buttons */}
          <div className="flex justify-around gap-3">
            <button
              type="submit"
              className="main-text text-black bg-dune py-3 w-36 mt-4 rounded-[36px] items-center justify-center hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer"
            >
              Ajouter
            </button>
            <button
              onClick={onClose}
              className="main-text text-black bg-neutral-100 py-3 w-36 mt-4 rounded-[36px] items-center justify-center hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}