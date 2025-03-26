import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import PopConflit from "./popupConflit";
import ConflitService from "../../services/ConflitService";

export default function SignalerConflit({conflits,setConflits,user,projet,section}){
    const [showPopup, setShowPopup] = useState(false);
 
    const handleSignalerConflit = async (content) => {
        try {
          console.log(content);
            const newConflit = await ConflitService.signalerConflit(
              section._id,
              projet._id,
               content 
            );
            console.log(conflits);
            console.log(newConflit.conflit);
            setConflits([...conflits, newConflit.conflit]);
        } catch (error) {
            console.error("Error reporting conflict:", error);
          } finally {
            setShowPopup(false);
          }            
    };

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


