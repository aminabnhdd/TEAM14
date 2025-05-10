
// drop down button that allows us to show or hide the annotations + conflicts section

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";

export default function DropDownButton(props){

    // toggle the display of the annotations and conflicts section
    const openAnnot = ()=> {
       props.setAnnotVisible( (prevAnnotVisible) => !prevAnnotVisible)
    }

    // only show the button if there are existing annotations or conflicts
    if (!props.annotExist && !props.conflitExist)
{return null;} else
    if (props.annotVisible){
        return(
        <button onClick={openAnnot}  className="buttons text-black cursor-pointer hover:underline">Cacher les annotations et les conflits
        <FontAwesomeIcon icon={faCaretUp} className="ml-[12px] w-5 h-5" />
        </button>)
    }else{
    return(


        <button onClick={openAnnot}  className="buttons text-black cursor-pointer hover:underline">Afficher les annotations et les conflits
        <FontAwesomeIcon icon={faCaretDown} className="ml-[12px] w-5 h-5" />
        </button>
    )}
}