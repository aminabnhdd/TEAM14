import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";

export default function DropDownButton(props){

    const openAnnot = ()=> {
       props.setAnnotVisible( (prevAnnotVisible) => !prevAnnotVisible)

       
    }

    if (!props.annotExist && !props.conflitExist)
{return null;} else
    if (props.annotVisible){
        return(
        <button onClick={openAnnot}  className="buttons text-black cursor-pointer">Cacher les annotations et les conflits
        <FontAwesomeIcon icon={faCaretUp} className="ml-[12px] w-5 h-5" />
        </button>)
    }else{
    return(


        <button onClick={openAnnot}  className="buttons text-black cursor-pointer">Afficher les annotations et les conflits
        <FontAwesomeIcon icon={faCaretDown} className="ml-[12px] w-5 h-5" />
        </button>
    )}
}