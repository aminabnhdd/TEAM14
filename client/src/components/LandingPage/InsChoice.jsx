
// popup to chose whether to sign up as an expert or as visiteur

import "../../componentsStyles/LandingPage/InsChoice.css";
import { useNavigate } from "react-router-dom";

function InsChoice({ popUp, setPopUp }) {
  const navigate = useNavigate();

  return (
    <>
      {popUp && (
        <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/30">
          <div className="relative z-[11000] w-[32%] p-8 flex flex-col gap-6 bg-white rounded-[29px] animate-fadeIn">
            {/* Close Button */}
            <button
              className="absolute top-4 right-5 text-black text-2xl font-normal hover:text-warning cursor-pointer"
              onClick={() => setPopUp(false)}
            >
              &times;
            </button>

            {/* Titles */}
            <div className="text-center">
              <p className="font-semibold text-[22px] mb-2">Inscription en tant que:</p>
              <p className="text-md text-black leading-relaxed">
                Voulez-vous vous inscrire en tant qu'expert ou visiteur?
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-8 mt-2">
              <button
                onClick={() => {
                  setPopUp(false);
                  navigate("/signup/expert");
                }}
                className="flex w-[40%] py-3 justify-center items-center rounded-[27px] bg-dune text-black font-semibold transition-all hover:brightness-105 hover:scale-102 cursor-pointer"
              >
                Expert
              </button>
              <button
                onClick={() => {
                  setPopUp(false);
                  navigate("/signup/visiteur");
                }}
                className="flex w-[40%] py-3 justify-center items-center rounded-[27px] bg-dune text-black font-semibold transition-all hover:brightness-105 hover:scale-102 cursor-pointer"
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
