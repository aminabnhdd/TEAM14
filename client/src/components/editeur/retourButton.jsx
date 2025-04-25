import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function RetourButton({projetId}){
    const navigate = useNavigate();
    function handleReturn(){
        localStorage.setItem("hasLoadedBefore", true);
        navigate(`/visualisation/${projetId}`);
    }

    return(
        <button onClick={handleReturn}
         className=" main-text text-black bg-dune flex gap-2 py-3 px-5 mt-4 rounded-[36px] items-center justify-center hover:brightness-105  hover:scale-102 transition-all duration-300 cursor-pointer">
            <FontAwesomeIcon icon={faRotateLeft} className="w-4 h-4"  />
            Retourner au projet
        </button>
    )
}