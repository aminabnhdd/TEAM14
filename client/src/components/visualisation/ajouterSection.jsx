// Add collaborator button
// Available for collaborators if there is in the project a section that hasn't been created yet and that he has the right to create (same discipline) 
// Displays a popup for the user to chose the section he wants to add


import { useState } from "react";
import addIcon from "../../assets/add-symbol.png";
import VisuService from "../../services/VisuService";
import  AuthContext from "../../helpers/AuthContext.jsx"
import {useContext} from "react"

export default function AjouterSection(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  const sections = ['description', 'architecture', 'histoire', 'archeologie', 'autre'];
  const {authState} = useContext(AuthContext);
  const sectionsNonExistantes = sections.filter((section) =>
    !props.sectionsExistantes.includes(section)
  );


  // get the sections he can add
  const filteredSections = sectionsNonExistantes.filter((section) => {
    if (section === 'description') return props.isChef;
    if (section === 'autre') return true;
    if (section === 'histoire') return props.user.discipline === 'histoire';
    if (section === 'architecture') return props.user.discipline === 'architecture';
    if (section === 'archeologie') return props.user.discipline === 'archeologie';
    return false;
  });
  console.log(props.user.discipline)


  // add a new section to the project
  const handleAjouterSection = async (section) => {
    try{
    // Here you would handle adding the section
    console.log("Adding section:", section);
    setSelectedSection(section);

    const newSection =  await VisuService.AjouterSection(
      props.projet._id,
      section,
      authState.accessToken
    );

    props.setProjet((prevProjet)=>{
        return{
            ...prevProjet,
            sections:[
                ...prevProjet.sections,
                newSection,
            ]
        }
    })
  } catch (error) {
    console.error("Error Annotation:", error);
}finally{
  setShowPopup(false);
}
    
  };

  const showButton = props.isCollaborateur && filteredSections.length > 0;

  return (
    <>
      {showButton && (
        <button
          onClick={() => setShowPopup(true)}
          className="mb-6 text-brown bg-white border border-neutral-300 
          rounded-[30px] py-3 flex align-items items-center gap-3 bolder-text px-5 mt-4
          hover:brightness-105 hover:scale-102 transition-all duration-300 cursor-pointer"
        >
          <img src={addIcon} className="w-5 h-5" />
          Ajouter une section
        </button>
      )}

      {showPopup &&(
  <div className="fixed inset-0 z-[40000] flex items-center justify-center bg-black/30">
    <div className="relative z-[11000] w-[28%] p-8 flex flex-col gap-6 bg-white rounded-[29px] animate-fadeIn">
      {/* Close Button */}
      <button
        className="absolute top-4 right-5 text-black text-2xl font-normal hover:text-warning cursor-pointer"
        onClick={() => setShowPopup(false)}
      >
        &times;
      </button>

      {/* Popup Title */}
      <div className="text-center font-semibold text-[22px]">
        <p>Ajouter une section</p>
      </div>
      <p className="text-md text-black">Choisissez la section à ajouter</p>

      {/* Sections List */}
      <div className="space-y-3">
        {filteredSections.map((section) => (
          <div key={section} className="flex justify-between items-center">
            <span className="capitalize text-md text-black">{section}</span>
            <button
              onClick={() => handleAjouterSection(section)}
              className="text-md text-black bg-dune py-2 px-6 rounded-[27px] hover:brightness-105 hover:scale-102 cursor-pointer transition-colors"
            >
              Ajouter
            </button>
          </div>
        ))}
      </div>

      {/* Cancel Button */}
      <div className="flex justify-center gap-8 mt-2">
        <button
          onClick={() => setShowPopup(false)}
          className="flex w-[40%] py-3 justify-center items-center rounded-[27px] bg-brown text-white font-semibold hover:brightness-105 hover:scale-102 cursor-pointer transition-colors"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
}