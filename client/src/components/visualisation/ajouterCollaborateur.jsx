// Add collaborator button
// Available for chef de projet if there exists in the project a section that doesnt have a collaborator yet
// Displays a popup for the chef to enter the email of the expert he wants to add

import addIcon from "../../assets/add-symbol.png";
export default function AjouterCollaborateur(props) {
    
  const ajouterCollab = () => {

    props.setShowPopup(true);
  };

  return (
    <>
      <button 
        onClick={ajouterCollab}
        className="ml-auto mr-auto text-brown bg-white border border-neutral-300 
        rounded-[30px] py-3 flex align-items items-center gap-3 bolder-text px-5 mt-4
        hover:brightness-105 hover:scale-102 transition-all duration-300 cursor-pointer"
      >
        <img src={addIcon} className="w-5 h-5" />
        Ajouter un collaborateur
      </button>
      
    
    </>
  );
}