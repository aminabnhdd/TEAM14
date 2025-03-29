import Section from "./section";

export default function LeftSection(props){

    const sections = ['description','architecture','histoire','archeologoie','autre'];

    const sectionsExistantes = sections.filter(section => 
        props.projet.sections.some(sec => sec.type === section)
      );

    console.log(sectionsExistantes);

    return(
        <div className="border border-neutral-400 w-[67%] rounded-[10px] p-7">
            <Section />
    </div>
    )
}