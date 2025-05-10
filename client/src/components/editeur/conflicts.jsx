
// display of all of the approved, non resolved conflicts in the section
// appears in the annoter section

import Conflict from "./conflict"
export default function Conflicts({conflits,setConflits,user,projet,section}){

    // check whether the conflict is valid and non solved
    const validConflicts = conflits.filter(conflict => 
        !conflict.resolu && conflict.valide
    );    

    // create the conflict elements
    const conflictsElement = validConflicts.map((conflit) => {
        return <Conflict key={conflit._id} id={conflit._id} conflit={conflit}  user={user} projet={projet} section={section} conflits={conflits} setConflits={setConflits}/>
});

    // only display if there are existing conflicts 
    if  (conflictsElement.length > 0){
    return(
        <>
        
        <p className="buttons text-black mb-4">Conflits</p>
        
        {conflictsElement}
        </>
    )}
}