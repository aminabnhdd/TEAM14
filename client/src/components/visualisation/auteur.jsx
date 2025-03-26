
export function Auteur (props){

    const visitProfile = () => {

    }
    return(
        <div onClick={visitProfile}  key={props.user._id}  className="flex gap-3 items-center align-items gap-3 rounded-[12px] hover:bg-neutral-100 py-2 px-4 cursor-pointer  ">
        <div  className="w-8 h-8 mr-2 bg-neutral-500 rounded-full">
            <img src={props.user.pfp} className="w-full h-full rounded-full object-cover" alt="Profile" />
        </div>
        <div>
        <p className="main-text mb-[2px]">{props.user.nom} {props.user.prenom}</p>
        <p className="thinner-text" >Expert en {props.user.discipline}</p>   
       </div>
    </div>
    )
}