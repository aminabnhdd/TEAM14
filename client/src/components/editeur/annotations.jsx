import Annotation from "./annotation";
import { useEffect } from "react";
export default function Annotations({annotations,setAnnotExist}){
 

    const projetId=1;
    const sectionId=1;
  
    const validAnnotations = annotations.filter(annotation => 
         annotation.projetId === projetId && annotation.sectionId === sectionId
    );

    const annotationsElement = validAnnotations.map((annotation) => {
      
        return <Annotation key={annotation.id} auteur={annotation.auteur} content={annotation.content} />
});

useEffect(()=>{
    setAnnotExist(validAnnotations.length>0)
},[validAnnotations]);

    if  (annotationsElement.length > 0){
    return(
        <>
        
        <p className="buttons text-black mb-4">Annotations</p>
        {annotationsElement}
        </>
    )}
}