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
         className="ml-auto mt-auto text-warning bg-white border border-warning mt-4
        rounded-[30px] py-3 flex align-items items-center gap-3 bolder-text px-5
        hover:brightness-105  hover:scale-102 transition-all duration-300 cursor-pointer">
            <FontAwesomeIcon icon={faArchive} className=" w-5 h-5" />
            Archiver le projet
        </button>

        {showConfirmation && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[1001]">
                    <div className="bg-white rounded-[36px] shadow-lg w-120 px-10 py-7 relative border border-black">
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-6 text-black text-2xl hover:text-warning cursor-pointer"
                            onClick={() => setShowConfirmation(false)}
                        >
                            &times;
                        </button>

                        {/* Popup Title */}
                        <h2 className="big-remark text-center text-black mb-5">Confirmation</h2>

                        {/* Confirmation Message */}
                        <p className="main-text text-warning mb-5 text-justify">Êtes-vous sûr de vouloir archiver ce projet ?</p>
                        <p className="main-text mb-5 text-justify">
                        Aucun collaborateur ni visiteur ne pourra consulter ou modifier ce projet tant qu'il est archivé.  
                        Vous aurez toutefois la possibilité de le récupérer depuis la liste des projets archivés.
                        </p>
                        {/* Action Buttons */}
                        <div className="flex justify-around gap-3 mt-5">
                            <button 
                                onClick={archive}
                                className="buttons text-white bg-warning py-4 w-42 mt-3 rounded-[36px] items-center justify-center hover:brightness-105  hover:scale-102 transition-all duration-300 cursor-pointer"
                            >
                                Archiver
                            </button>
                            <button 
                                onClick={() => setShowConfirmation(false)}
                                className="buttons text-black bg-neutral-100 py-4 w-42 mt-3 rounded-[36px] items-center justify-center hover:scale-102 hover:brightness-95 transition-all duration-300 cursor-pointer"
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