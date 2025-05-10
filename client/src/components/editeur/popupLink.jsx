

//popup that allows the user to enter a link that will applyed to the selected text in tiptap editor

import { useState } from "react";

const PopLink = ({ initialUrl, onClose, onSubmit }) => {
  const [url, setUrl] = useState(initialUrl);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(url); // Pass the URL to the parent component
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[4001]">
      <div className="bg-white rounded-[29px] shadow-lg w-[30%] px-8 py-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          className="absolute top-3 cursor-pointer right-5 text-black hover:text-warning text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Title and Explanation */}
        <div className="flex flex-col items-start text-black mb-4">
          <h2 className="text-[22px] font-semibold mb-1">Insérer un lien</h2>
          <p className="text-[13px]">
            Ce lien sera attaché au contenu sélectionné.
          </p>
        </div>

        {/* URL Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            className="w-full px-4 py-2 border border-neutral-300 rounded-xl text-black placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-dune"
          />

          {/* Action Buttons */}
          <div className="flex justify-center gap-6 mt-2 w-full">
            <button
              type="submit"
              className="text-white bg-success py-3 w-[40%] rounded-[27px] font-semibold hover:brightness-105 hover:scale-102 transition-all duration-300 cursor-pointer"
            >
              Sauvegarder
            </button>
            <button
              onClick={onClose}
              className="text-white bg-warning py-3 w-[40%] rounded-[27px] font-semibold hover:brightness-105 hover:scale-102 transition-all duration-300 cursor-pointer"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopLink;
