
// popup to chose whether to sign up as expert or visiteur

import "../../componentsStyles/popUps styles/InsChoice.css";
import { useState } from "react";

function InsChoice({onClickExpert,onClickVisiteur}) {
    const [popUp, setPopUp] = useState(true);

    function backLanding(e) {
        setPopUp(false);
        e.target.style.display = " none";
    }
    
return (
  <>
    {popUp && (
      <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/30">
        <div className="relative z-[11000] w-[32%] p-8 flex flex-col gap-6 bg-white rounded-[29px] animate-fadeIn">
          {/* Close Button */}
          <button
            className="absolute top-4 right-5 text-black text-2xl font-normal hover:text-warning cursor-pointer"
            onClick={backLanding}
          >
            &times;
          </button>

          {/* Title */}
          <div className="text-center">
            <p className="font-semibold text-[22px] mb-2">Inscription en tant que:</p>
            <p className="text-md text-black">Voulez-vous vous inscrire en tant qu'expert ou visiteur?</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              onClick={onClickExpert}
            >
              Expert
            </button>
            <button
              className="px-6 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-colors"
              onClick={onClickVisiteur}
            >
              Visiteur
            </button>
          </div>
        </div>
      </div>
    )}
  </>
);
}

export default InsChoice;