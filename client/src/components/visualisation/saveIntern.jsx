// save a project locally

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload} from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import AuthContext from "../../helpers/AuthContext"
import { useContext } from "react"

export default function SaveIntern({projet}){
    const {authState} = useContext(AuthContext);

    const downloadProjet = async (projet) => {
        const response = await fetch(`http://localhost:3001/projects/export-projet/${projet._id}`,{headers:{Authorization:`Bearer ${authState.accessToken}`}});
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
      
        const a = document.createElement('a');
        a.href = url;
        a.download = `ATHAR - ${projet.titre}.json`;
        a.click();
        URL.revokeObjectURL(url);
      };
    return (
    <button className={`px-2 cursor-pointer `} onClick={()=>{downloadProjet(projet)}}>
    <FontAwesomeIcon icon={faDownload} className=" w-5 h-5" />
    </button>
    )       
}