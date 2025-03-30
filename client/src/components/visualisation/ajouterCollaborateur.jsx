import { useState } from "react";
import addIcon from "../../assets/add-symbol.png";
import PopAjouterCollaborateur from "./popupAjouterCollaborateur";
export default function AjouterCollaborateur(props) {
  const [showPopup, setShowPopup] = useState(false);
    
  const ajouterCollab = () => {

    setShowPopup(true);
  };

  return (
    <>
      <button 
        onClick={ajouterCollab}
        className="ml-auto mr-auto text-brown bg-white border border-neutral-300 
        rounded-[30px] py-3 flex align-items items-center gap-3 bolder-text px-5 mt-4
        hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer"
      >
        <img src={addIcon} className="w-5 h-5" />
        Ajouter un collaborateur
      </button>
      
      {showPopup && (
        <PopAjouterCollaborateur onClose={() => setShowPopup(false)} projet={props.projet} setProjet={props.setProjet} collaborateurs={props.collaborateurs} setCollaborateurs={props.setCollaborateurs} />
      )}
    </>
  );
}