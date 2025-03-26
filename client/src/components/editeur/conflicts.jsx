import Conflict from "./conflict"
import { useEffect } from "react";
export default function Conflicts({conflits,setConflits,user,projet,section}){


    
  
    const validConflicts = conflits.filter(conflict => 
        !conflict.resolu
    );
    
    const conflictsElement = validConflicts.map((conflit) => {
       
        return <Conflict key={conflit.id} id={conflit.id} conflit={conflit}  user={user} projet={projet} section={section} conflits={conflits} setConflits={setConflits}/>
    });


    if  (conflictsElement.length > 0){
    return(
        <>
        
        <p className="buttons text-black mb-4">Conflits</p>
        {conflictsElement}
        </>
    )}
}