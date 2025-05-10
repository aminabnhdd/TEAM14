
// popup to confirm restoration of a project
import "../../componentsStyles/MyProjectsStyles/PopupRestore.css";

const PopupRestore = ({ projectTitle, onClose, onRestore }) => {
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
        <div className="text-center">
          <p className="font-semibold text-[22px] mb-2">Restauration d’un projet</p>
          <p className="text-md text-black leading-relaxed">
            Voulez-vous restaurer le projet <strong>“{projectTitle}”</strong> ?
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-8 mt-2">
          <button
            onClick={onRestore}
            className="flex w-[40%] py-3 justify-center items-center rounded-[27px] bg-success text-white font-semibold transition-all hover:brightness-105 hover:scale-102 cursor-pointer"
          >
            Restaurer
          </button>
          <button
            onClick={onClose}
            className="flex w-[40%] py-3 justify-center items-center rounded-[27px] bg-warning text-white font-semibold transition-all hover:brightness-105 hover:scale-102 cursor-pointer"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupRestore;
