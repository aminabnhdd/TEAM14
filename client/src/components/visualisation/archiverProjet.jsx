import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function ArchiverProjet(props){
 
    const [showConfirmation, setShowConfirmation] = useState(false);


    const archive = (event) =>{
        event.stopPropagation();
        props.setProjet((prevProjet)=>
        {return(
            {...prevProjet,
                archivePar:props.user,
                archive:true,
            }
        )}
            )
        // send him to decouvrir or mes projets
        setShowConfirmation(false);

    }
    const openConfirmation = (event) => {
        event.stopPropagation();
        setShowConfirmation(true);
    };

    return(
    <>
        <button  onClick={openConfirmation}
         className="ml-auto mt-auto text-warning bg-white border border-neutral-300 mt-4
        rounded-[30px] py-3 flex align-items items-center gap-3 bolder-text px-5
        hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer">
            <FontAwesomeIcon icon={faArchive} className=" w-5 h-5" />
            Archiver le projet
        </button>

        {showConfirmation && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1001]">
                    <div className="bg-white rounded-[20px] shadow-lg w-110 px-10 py-7 relative border border-black">
                        {/* Close Button */}
                        <button
                            className="absolute top-3 right-5 text-black text-xl hover:text-warning cursor-pointer"
                            onClick={() => setShowConfirmation(false)}
                        >
                            &times;
                        </button>

                        {/* Popup Title */}
                        <h2 className="buttons text-black mb-5">Confirmation</h2>

                        {/* Confirmation Message */}
                        <p className="main-text text-warning mb-5">Êtes-vous sûr de vouloir archiver ce projet ?</p>
                        <p className="main-text mb-5 text-justify">
                        Aucun collaborateur ni visiteur ne pourra consulter ou modifier ce projet tant qu'il est archivé.  
                        Vous aurez toutefois la possibilité de le récupérer depuis la liste des projets archivés.
                        </p>
                        {/* Action Buttons */}
                        <div className="flex justify-around gap-3 mt-5">
                            <button 
                                onClick={archive}
                                className="main-text text-black bg-dune py-3 w-36 mt-4 rounded-[36px] items-center justify-center hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer"
                            >
                                Archiver
                            </button>
                            <button 
                                onClick={() => setShowConfirmation(false)}
                                className="main-text text-black bg-neutral-100 py-3 w-36 mt-4 rounded-[36px] items-center justify-center hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}

    </>
    )
}