import Conflict from "./conflict"
import { useEffect } from "react";
export default function Conflicts({conflits,setConflitExist}){


    const projetId=1;
    const sectionId=1;
  
    const validConflicts = conflits.filter(conflict => 
        !conflict.resolu && conflict.valide && conflict.projetId === projetId && conflict.sectionId === sectionId
    );

    const conflictsElement = validConflicts.map((conflict) => {
       
        return <Conflict key={conflict.id} signaleur={conflict.signaleur} content={conflict.content} resolu={conflict.resolu} />
});

useEffect(()=>{
    setConflitExist(validConflicts.length>0)
},[validConflicts])
    if  (conflictsElement.length > 0){
    return(
        <>
        
        <p className="buttons text-black mb-4">Conflits</p>
        {conflictsElement}
        </>
    )}
}