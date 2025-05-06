import { useRef } from "react"; // Import useRef instead of useState

export default function PopConflit2({ onClose }) {
 
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[3000]">
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
        <p className="main-text text-black mb-5">Le conflit doit être validé par le chef du projet avant d'être affiché</p>
       

      </div>
    </div>
  );
}