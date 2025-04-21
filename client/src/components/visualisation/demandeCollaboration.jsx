import { useState, useEffect, useRef } from "react";
import VisuService from "../../services/VisuService";
import  AuthContext from "../../helpers/AuthContext.jsx"
import {useContext} from "react"


export default function DemandeCollaboration(props) {
  const [isSticky, setIsSticky] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showWaitingPopup, setShowWaitingPopup] = useState(false);
  const confirmPopupRef = useRef(null);
  const waitingPopupRef = useRef(null);
  const {authState} = useContext(AuthContext);
  // Handle click outside for both popups
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showConfirmPopup && confirmPopupRef.current && !confirmPopupRef.current.contains(event.target)) {
        setShowConfirmPopup(false);
      }
      if (showWaitingPopup && waitingPopupRef.current && !waitingPopupRef.current.contains(event.target)) {
        setShowWaitingPopup(false);
      }
    };

    if (showConfirmPopup || showWaitingPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showConfirmPopup, showWaitingPopup]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 130);
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  const disciplineExiste = props.collaborateurs.some((collaborateur) => 
    collaborateur.discipline === props.user.discipline
  );

  const showButton = props.isExpert && !props.isCollaborateur && !disciplineExiste;

  const handleRequestClick = () => {
    setShowConfirmPopup(true);
  };

  const confirmRequest = async () => {
    try{
      console.log('user who sent demande:',props.user, 'chef du projet:',props.projet.chef,'projet:', props.projet)
      const response = await VisuService.demandeCollaboration(props.projet._id,authState.accessToken);
    }catch (error) {
      console.error("Error sending request:", error);
    }finally{
      setShowWaitingPopup(true);
      setShowConfirmPopup(false);
    }
    
  };

  return (
    <>
      {showButton && (
        <div className={`fixed left-[115px] z-[400] transition-all duration-300 ${isSticky ? 'top-[190px]' : 'top-[285px]'}`}>
          <div className="relative">
            <button 
              onClick={handleRequestClick}
              className="border border-neutral-400 bg-white rounded-full w-14 h-14 cursor-pointer flex justify-center items-center hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="#2d2d2d" width="23px" height="23px" viewBox="0 0 16 16" id="request-new-16px">
                <path id="Path_46" data-name="Path 46" d="M-17,11a2,2,0,0,0,2-2,2,2,0,0,0-2-2,2,2,0,0,0-2,2A2,2,0,0,0-17,11Zm0-3a1,1,0,0,1,1,1,1,1,0,0,1-1,1,1,1,0,0,1-1-1A1,1,0,0,1-17,8Zm2.5,4h-5A2.5,2.5,0,0,0-22,14.5,1.5,1.5,0,0,0-20.5,16h7A1.5,1.5,0,0,0-12,14.5,2.5,2.5,0,0,0-14.5,12Zm1,3h-7a.5.5,0,0,1-.5-.5A1.5,1.5,0,0,1-19.5,13h5A1.5,1.5,0,0,1-13,14.5.5.5,0,0,1-13.5,15ZM-6,2.5v5A2.5,2.5,0,0,1-8.5,10h-2.793l-1.853,1.854A.5.5,0,0,1-13.5,12a.489.489,0,0,1-.191-.038A.5.5,0,0,1-14,11.5v-2a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v.793l1.146-1.147A.5.5,0,0,1-11.5,9h3A1.5,1.5,0,0,0-7,7.5v-5A1.5,1.5,0,0,0-8.5,1h-7A1.5,1.5,0,0,0-17,2.5v3a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5v-3A2.5,2.5,0,0,1-15.5,0h7A2.5,2.5,0,0,1-6,2.5ZM-11.5,2V4.5H-9a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-2.5V8a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V5.5H-15a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h2.5V2a.5.5,0,0,1,.5-.5A.5.5,0,0,1-11.5,2Z" transform="translate(22)"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      {showConfirmPopup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[1001]">
          <div 
            ref={confirmPopupRef}
            className="bg-white rounded-[36px] shadow-lg w-110 px-10 py-7 relative border border-black"
          >
            <button
              className="absolute top-4 right-6 text-black text-2xl cursor-pointer hover:text-warning"
              onClick={() => setShowConfirmPopup(false)}
            >
              &times;
            </button>
            <h2 className="big-remark text-center text-black mb-5">Confirmer la demande</h2>
            <p className="mb-2 text-justify main-text">Voulez-vous vraiment envoyer une demande de collaboration pour ce projet?</p>
            <div className="flex justify-around gap-3 mt-5">
              <button
                onClick={confirmRequest}
                className="buttons text-black bg-dune py-3 w-40 mt-2 rounded-[36px] items-center justify-center hover:brightness-105  hover:scale-102 transition-all duration-300 cursor-pointer"
              >
                Confirmer
              </button>
              <button
                onClick={() => setShowConfirmPopup(false)}
                className="buttons text-black bg-neutral-100 py-3 w-40  mt-2 rounded-[36px] items-center justify-center hover:brightness-95 hover:scale-102 transition-all duration-300 cursor-pointer"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Waiting Approval Popup */}
      {showWaitingPopup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[1001]">
          <div 
            ref={waitingPopupRef}
            className="bg-white rounded-[36px] shadow-lg w-120 px-10 py-7 relative border border-black"
          >
            <button
              className="absolute top-4 right-6 text-black text-2xl cursor-pointer hover:text-warning"
              onClick={() => setShowWaitingPopup(false)}
            >
              &times;
            </button>
            <h2 className="big-remark text-center text-black mb-5">Demande envoyée</h2>
            <p className="mb-2 main-text text-justify">
            Votre demande de collaboration sur ce projet a été envoyée et est 
            <span className="text-success" > en attente de validation </span>
            par le chef du projet.
            </p>
              <p className="mb-2 main-text text-justify "> 
            Veuillez vérifier vos notifications pour suivre son statut.
            </p>
          </div>
        </div>
      )}
    </>
  );
}