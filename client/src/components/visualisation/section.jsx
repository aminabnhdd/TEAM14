import TiptapRenderer from "./titapRenderer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Gallerie from "../editeur/gallerie";
import { useNavigate} from 'react-router-dom';
export default function Section(props){
    const navigate = useNavigate();
const [sectionOpen,setSectionOpen] = useState(true);
function toggleOpen(){
    setSectionOpen(!sectionOpen);
}
console.log(props);
const canEdit = () => {
    if (props.isChef) return true;
    if (props.section.type === 'description') return props.isChef;
    if (props.section.type === 'autre') return true;
    if (props.section.type === 'histoire') return props.user.discipline === 'histoire';
    if (props.section.type === 'architecture') return props.user.discipline === 'architecture';
    if (props.section.type === 'archeologie') return props.user.discipline === 'archeologie';
    return false;
  };

function editSection(){
    navigate(`/editeur/editable/${props.section._id}`);  
}

function annoterSection(){
    navigate(`/editeur/annoter/${props.section._id}`);  
}

  return (
        <div id={props.section._id} key={props.section.id} className=" rendered mb-8 flex flex-col gap-4">
            <div className=" text-black flex align-items items-center justify-between border-b border-neutral-300">
                  <button onClick={toggleOpen} className="secondary-titles cursor-pointer" >
                  <FontAwesomeIcon icon={sectionOpen ? faCaretUp : faCaretDown} className="mr-4 w-5 h-5" />
                  {(props.section.type == 'archeologie') ? "Archéologie" :
                  props.section.type.charAt(0).toUpperCase() + props.section.type.slice(1)}
                  </button >
                    {props.isCollaborateur && 
                        <div >
                        {canEdit() ?
                        <button onClick={editSection} className="main-text text-brown hover:underline cursor-pointer px-4" >Editer</button>
                        : 
                        <button className="main-text text-neutral-500 px-4" >Editer</button>}
                        <button onClick={annoterSection} className="main-text text-brown hover:underline cursor-pointer pl-4 border-l border-neutral-400" >Annoter</button>
                    </div>}
                    
                </div>
                { sectionOpen &&
                <>
                <TiptapRenderer  content={props.section.contenu} />
                {props.section.images.length>0 && <Gallerie slides={props.section.images} isExpert={props.isExpert} projetId={props.section.projetId}/>}
                </>
                }

        </div>
    )
}

