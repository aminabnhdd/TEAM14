import Section from "./section";
import ReferencesSection from "./referencesSection";
import ArchiverProjet from "./archiverProjet";
import AjouterSection from "./ajouterSection";


export default function LeftSection(props){

   

    return(
        <div className="border border-neutral-400 w-[67%] rounded-[10px] p-7">
           {props.sectionsExistantes.map((sec)=>{
            const section = props.projet.sections.find(sect => sect.type === sec);
        return(
            <Section key={section._id} id={section._id} section={section} user={props.user} isExpert={props.isExpert} isChef={props.isChef} isCollaborateur={props.isCollaborateur} isAdmin={props.isAdmin} />
         )
           })} 
           <AjouterSection  user={props.user} isCollaborateur={props.isCollaborateur} isChef={props.isChef} sectionsExistantes={props.sectionsExistantes} projet={props.projet} setProjet={props.setProjet} />
           <div className="flex justify-between">
           <ReferencesSection  projet={props.projet} />
           {props.isAdmin || props.isChef && <ArchiverProjet user={props.user} projet={props.projet} setProjet={props.setProjet} />}
           </div>

    </div>
    )
}