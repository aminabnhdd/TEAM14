import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import PopConflit from "./popupConflit";

export default function SignalerConflit(){
    const [showPopup, setShowPopup] = useState(false);
    const [infos, setInfos] = useState({});

    const handleSubmit = useCallback(
        (content) => {
          setShowPopup(false); // Close the popup
          console.log(content);
})

    const handleClick =() =>{
        setShowPopup(true)
    }

   return(
    <>
   <button   onClick={handleClick} className="main-text text-warning hover:underline cursor-pointer">
    <FontAwesomeIcon icon={faTriangleExclamation} className="mr-2 w-4 h-4"  />
    Signaler un conflit
    </button>

    {showPopup && (
        <PopConflit
        initialUrl={"hi"}
        onClose={() => setShowPopup(false)}
        onSubmit={handleSubmit}
        />
    )}
    </>

   )
}


