import Annotation from "./annotation";

export default function Annotations({annotations}){
 

    const projetId=1;
    const sectionId=1;
  
    const validAnnotations = annotations.filter(annotation => 
         annotation.projetId === projetId && annotation.sectionId === sectionId
    );

    const annotationsElement = validAnnotations.map((annotation) => {
      
        return <Annotation key={annotation.id} auteur={annotation.auteur} content={annotation.content} />
});
    if  (annotationsElement.length > 0){
    return(
        <>
        
        <p className="buttons text-black mb-4">Annotations</p>
        {annotationsElement}
        </>
    )}
}