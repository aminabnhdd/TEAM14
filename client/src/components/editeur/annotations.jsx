// list of all anotations in a section, appears in the annoter section page
 
import Annotation from "./annotation";
export default function Annotations({ annotations }) {

    // create the annotation elements
    const annotationsElement = annotations.map((annotation) => {
        return <Annotation key={annotation._id} id={annotation._id} auteur={annotation.auteur} content={annotation.content} />
    });

    //only display if there are existing anotations
    if (annotationsElement.length > 0) {
        return (
            <>
                <p className="buttons text-black mb-4">Annotations</p>
                {annotationsElement}
            </>
        )
    }
}