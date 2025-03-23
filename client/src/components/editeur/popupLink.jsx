import { useState } from "react";

const PopLink = ({ initialUrl, onClose, onSubmit }) => {
  const [url, setUrl] = useState(initialUrl);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(url); // Pass the URL to the parent component
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1001]">
      <div className="bg-white rounded-[20px] shadow-lg w-100 px-10 py-7  relative border border-black">
        {/* Close Button */}
        <button
          className="absolute top-3 right-5  text-black hover:text-neutral-500"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Popup Title */}
        <h2 className="buttons text-black mb-5">Insérer Lien</h2>

        {/* URL Input Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            className="w-full main-text px-4 py-2 border border-neutral-300 rounded-xl text-neutral-500 focus:outline-none focus:ring-1 focus:ring-dune"
          />

          {/* Action Buttons */}
          <div className="flex justify-around gap-3 mt-5">
          <button  type="submit"
                     className="main-text text-black bg-dune  py-3  w-36 mt-4 rounded-[36px] items-center justify-center hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer">
                        Sauvegarder
                    </button>
            <button 
          onClick={onClose}           className="main-text text-black bg-neutral-100 py-3  w-36 mt-4 rounded-[36px] items-center justify-center hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer">
                        Annuler
                    </button>
              
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopLink;