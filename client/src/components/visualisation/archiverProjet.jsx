
// button to archive the project
// only chef de project and admin are allowed to use it
// a confirmation popup appears if it is clicked

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VisuService from "../../services/VisuService";
import  AuthContext from "../../helpers/AuthContext.jsx"
import {useContext} from "react"

export default function ArchiverProjet(props){
     const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const {authState} = useContext(AuthContext);

    // archiver le projet
    const archive = async (event) =>{
        try{
        event.stopPropagation();
        props.setProjet((prevProjet)=>
        {return(
            {...prevProjet,
                archivePar:props.user,
                archive:true,
            }
        )}
            )
        await VisuService.Archiver(props.projet._id,authState.accessToken);
    
        navigate(`/restoreprojects`); 
        setShowConfirmation(false);
    } catch (error) {
        console.error("Error Annotation:", error);
    }}

    // open the confirmation popup
    const openConfirmation = (event) => {
        event.stopPropagation();
        setShowConfirmation(true);
    };
console.log(props.projet.archive);
    return(
      
    <>
      {!props.projet.archive ?
        <button  onClick={openConfirmation}
         className="ml-auto mt-auto text-warning bg-white border border-warning mt-4
        rounded-[30px] py-3 flex align-items items-center gap-3 bolder-text px-5
        hover:brightness-105  hover:scale-102 transition-all duration-300 cursor-pointer">
            <FontAwesomeIcon icon={faArchive} className=" w-5 h-5" />
            Archiver le projet
        </button> : <button    className="ml-auto mt-auto text-warning bg-white  mt-4
        rounded-[30px] py-3 flex align-items items-center gap-3 bolder-text px-5">
        Le projet est archivé</button>}

        {showConfirmation && (
  <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/30">
    <div className="relative z-[11000] w-[32%] p-8 flex flex-col gap-6 bg-white rounded-[29px] animate-fadeIn">
      {/* Close Button */}
      <button
        className="absolute top-4 right-5 text-black text-2xl font-normal hover:text-warning cursor-pointer"
        onClick={() => setShowConfirmation(false)}
      >
        &times;
      </button>

      {/* Popup Title */}
      <div className="text-center font-semibold text-[22px]">
        <p>Confirmation</p>
      </div>

      {/* Confirmation Message */}
      <div className="text-md text-black leading-relaxed">
        <p className="text-warning mb-3">Êtes-vous sûr de vouloir archiver ce projet ?</p>
        {props.isAdmin ? <p> Aucun collaborateur ni visiteur ne pourra consulter ou modifier ce projet tant qu'il est archivé.  Cette suppression est <span className="text-warning">définitive.</span></p> :
        <p>
            
          Aucun collaborateur ni visiteur ne pourra consulter ou modifier ce projet tant qu'il est archivé.
          Vous aurez toutefois la possibilité de le récupérer depuis la liste des projets archivés.
        </p>}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-8 mt-2">
        <button
          onClick={archive}
          className="flex w-[40%] py-3 justify-center items-center rounded-[27px] bg-warning hover:scale-102 hover:brightness-105 text-white font-semibold transition-colors cursor-pointer"
        >
          Archiver
        </button>
        <button
          onClick={() => setShowConfirmation(false)}
          className="flex w-[40%] py-3 justify-center items-center rounded-[27px] bg-success hover:scale-102 hover:brightness-105 text-white font-semibold transition-colors cursor-pointer"
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