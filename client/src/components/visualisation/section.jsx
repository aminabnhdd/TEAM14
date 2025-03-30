import TiptapRenderer from "./titapRenderer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Gallerie from "../editeur/gallerie";

export default function Section(props){
const [sectionOpen,setSectionOpen] = useState(true);
function toggleOpen(){
    setSectionOpen(!sectionOpen);
}
    return (
        <div className=" rendered mb-8 flex flex-col gap-4">
            <div className=" text-black flex align-items items-center justify-between border-b border-neutral-300">
                  <button onClick={toggleOpen} className="secondary-titles cursor-pointer" >
                  <FontAwesomeIcon icon={faCaretDown} className="mr-4 w-5 h-5" />
                  {props.section.type.charAt(0).toUpperCase() + props.section.type.slice(1)}
                  </button >
                    {props.isCollaborateur && 
                        <div className=" flex align-items items-center gap-2">
                        <button>hi there</button>
                    </div>}
                    
                </div>
                { sectionOpen &&
                <>
                <TiptapRenderer  content={props.section.contenu} />
                {props.section.images.length>0 && <Gallerie slides={props.section.images} />}
                </>
                }

        </div>
    )
}

