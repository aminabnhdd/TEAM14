import Annotation from "./annotation";
import { useEffect } from "react";
export default function Annotations({annotations}){
 



    const annotationsElement = annotations.map((annotation) => {
      
        return <Annotation key={annotation._id} id={annotation._id} auteur={annotation.auteur} content={annotation.content} />
});



    if  (annotationsElement.length > 0){
    return(
        <>
        
        <p className="buttons text-black mb-4">Annotations</p>
        {annotationsElement}
        </>
    )}
}