import Presentation from "./presentation"
import Auteurs from "./auteurs"


export default function RightSection(props){
    return(
    <div className="border border-neutral-400 ml-6 w-[33%] rounded-[10px] p-7">
        <Presentation isChef={props.isChef} projet={props.projet} />
        {(props.isExpert || props.isAdmin) &&
        <Auteurs isChef={props.isChef} projet={props.projet} setProjet={props.setProjet}  />}
    </div>
    )
}