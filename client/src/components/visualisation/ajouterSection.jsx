import { useState } from "react";
import addIcon from "../../assets/add-symbol.png";

export default function AjouterSection(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  const sections = ['description', 'architecture', 'histoire', 'archeologie', 'autre'];

  const sectionsNonExistantes = sections.filter((section) =>
    !props.sectionsExistantes.includes(section)
  );

  const filteredSections = sectionsNonExistantes.filter((section) => {
    if (section === 'description') return props.isChef;
    if (section === 'autre') return true;
    if (section === 'histoire') return props.user.discipline === 'histoire';
    if (section === 'architecture') return props.user.discipline === 'architecture';
    if (section === 'archeologie') return props.user.discipline === 'archeologie';
    return false;
  });

  const handleAjouterSection = (section) => {
    // Here you would handle adding the section
    console.log("Adding section:", section);
    setSelectedSection(section);
    const newSection =  {
        id: 'sec-4',
        projetId: '',
        type: section,
        contenu: {
            "type": "doc",
            "content": []
          },
        annotations: '',
        conflits: '',
        images:[],
    };
    props.setProjet((prevProjet)=>{
        return{
            ...prevProjet,
            sections:[
                ...prevProjet.sections,
                newSection,
            ]
        }
    })
    setShowPopup(false);
    // Call your API or state update here
  };

  const showButton = props.isCollaborateur && filteredSections.length > 0;

  return (
    <>
      {showButton && (
        <button
          onClick={() => setShowPopup(true)}
          className="mb-6 text-brown bg-white border border-neutral-300 
          rounded-[30px] py-3 flex align-items items-center gap-3 bolder-text px-5 mt-4
          hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer"
        >
          <img src={addIcon} className="w-5 h-5" />
          Ajouter une section
        </button>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1001]">
          <div className="bg-white rounded-[20px] shadow-lg w-100 px-10 py-7 relative border border-black max-w-md">
            {/* Close Button */}
            <button
              className="absolute top-3 right-5 text-black text-xl cursor-pointer hover:text-warning"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>

            {/* Popup Title */}
            <h2 className="bolder-text text-black mb-5">Ajouter une section</h2>
            <p className="mb-4">Choisissez la section à ajouter</p>

            {/* Sections List */}
            <div className="space-y-3 mb-6">
              {filteredSections.map((section) => (
                <div key={section} className="flex hover:bg-neutral-100 rounded-[36px]  justify-between items-center">
                  <span className="capitalize pl-4 main-text">{section}</span>
                  <button
                    onClick={() => handleAjouterSection(section)}
                    className="main-text text-black bg-dune py-2 px-4 rounded-[36px] 
                    hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer"
                  >
                    Ajouter
                  </button>
                </div>
              ))}
            </div>

            {/* Cancel Button */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowPopup(false)}
                className="main-text text-black bg-neutral-100 py-3 w-36 mt-2 rounded-[36px] 
                items-center justify-center hover:brightness-105 hover:shadow-lg hover:scale-102 
                transition-all duration-300 cursor-pointer"
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