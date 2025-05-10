
// button to signal a conflict in the annoter section page
// a popup will appear for the user to write the content of the conflict
// another popup will appear later to indicate to the user that he has to wait for the approval of chef de projet before his conflict is displayed

import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import PopConflit from "./popupConflit";
import ConflitService from "../../services/ConflitService";
import  AuthContext from "../../helpers/AuthContext.jsx"
import {useContext} from "react"
import PopConflit2 from "./popupConflit2.jsx";

export default function SignalerConflit({conflits,setConflits,user,projet,section}){
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const {authState} = useContext(AuthContext);
    const [isChef,setIsChef] =useState(false);

      // create the conflict after the popup is closed
      const handleSignalerConflit = async (content) => {
        try {


          console.log(content);
            const newConflit = await ConflitService.signalerConflit(
              section._id,
              projet._id,
               content,
               authState.accessToken
            );
            console.log(conflits);
            console.log(newConflit.conflit);
            setConflits([...conflits, newConflit.conflit]);
        } catch (error) {
            console.error("Error reporting conflict:", error);
          } finally {
            if (content){
              if(isChef){
                setShowPopup(false);
                //valider sur place
              } else {
            setShowPopup(false);
            setShowPopup2(true);}}
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
    {showPopup2 && (
        <PopConflit2
    
        onClose={() => setShowPopup2(false)}
        
        />
    )}
    </>

   )
}


