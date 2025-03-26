import Conflict from "./conflict"
import { useEffect } from "react";
export default function Conflicts({conflits,setConflits,user,projet,section}){


    
  
console.log(conflits);

    const conflictsElement = conflits.map((conflit) => {
        return <Conflict key={conflit._id} id={conflit._id} conflit={conflit}  user={user} projet={projet} section={section} conflits={conflits} setConflits={setConflits}/>
});

console.log(conflictsElement);
    if  (conflictsElement.length > 0){
    return(
        <>
        
        <p className="buttons text-black mb-4">Conflits</p>
        
        {conflictsElement}
        </>
    )}
}