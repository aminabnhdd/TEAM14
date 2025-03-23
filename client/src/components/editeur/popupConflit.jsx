import { useRef } from "react"; // Import useRef instead of useState

export default function PopConflit({ onClose, onSubmit }) {
  // Create a ref to hold the input element
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Access the value of the input field directly using the ref
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
        <h2 className="buttons text-black mb-5">Signaler un conflit</h2>

        {/* Content Input Form */}
        <form onSubmit={handleSubmit}>
          <textarea
          rows={4}
            type="text"
            ref={inputRef} // Attach the ref to the input
            placeholder="Décrivez le sujet du conflit dans la section afin de clarifier le problème."
            className="w-full text-justify main-text px-4 py-2 border border-neutral-300 rounded-xl text-neutral-500 resize-none focus:outline-none focus:ring-1 focus:ring-dune "
          />

          {/* Action Buttons */}
          <div className="flex justify-around gap-3 ">
          <button
              type="submit"
              className="main-text text-black bg-dune py-3 w-36 mt-4 rounded-[36px] items-center justify-center hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer"
            >
              Signaler
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