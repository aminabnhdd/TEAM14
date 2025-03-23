import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import PopConflit from "./popupConflit";

export default function SignalerConflit({conflits,setConflits,user,projet,section}){
    const [showPopup, setShowPopup] = useState(false);
 console.log(projet)
    const handleSignalerConflit = (content) => {
        console.log(conflits);
    
    
        // Create an annotation object
        const conflit = {
          id: Date.now(), // Generate a unique ID
          projetId: projet.id,
          sectionId:section.id,
          signaleur: user,
          resolu:false,
          valide:false,
          content: content,
          lient:"",
        };


      
        setConflits([...conflits, conflit]);
        setShowPopup(false)
    }

   return(
    <>
   <button   onClick={() => setShowPopup(true)} className="main-text text-warning hover:underline cursor-pointer">
    <FontAwesomeIcon icon={faTriangleExclamation} className="mr-2 w-4 h-4"  />
    Signaler un conflit
    </button>

    {showPopup && (
        <PopConflit
    
        onClose={() => setShowPopup(false)}
        onSubmit={handleSignalerConflit        }
        />
    )}
    </>

   )
}


