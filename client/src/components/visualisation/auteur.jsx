import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";



export function Auteur (props){

    const visitProfile = (event) => { 
        console.log(props.user._id); // Logs the clicked div's id
      };

      const removeUser = (event) => { 
        event.stopPropagation(); // Prevents click from reaching the parent div
        const newCollaborateurs = props.projet.collaborateurs.filter(
            (collab) => collab !== props.user._id // Strict comparison
          );
          
          props.setProjet((prevProjet) => ({
            ...prevProjet,
            collaborateurs: newCollaborateurs
          }));

        
        console.log(props.projet);
      };

    return(
        <>
        <div onClick={visitProfile} id={props.user._id}  key={props.user._id}  className="flex relative gap-3 items-center align-items gap-3 rounded-[12px] hover:bg-neutral-100 py-2 px-4 cursor-pointer break-words ">
        <div  className="w-8 h-8 mr-2 bg-neutral-500 rounded-full">
            <img src={props.user.pfp} className="w-full h-full rounded-full object-cover" alt="Profile" />
        </div>
        <div className="max-w-full">
        <p className="main-text  mb-[2px]">{props.user.nom} {props.user.prenom}</p>
        <p className="thinner-text" >Expert en {props.user.discipline}</p>   
       </div>
       {props.isChef && <FontAwesomeIcon 
        icon={faTrashCan} 
        onClick={removeUser}
        className="absolute right-2 bottom-2 w-5 h-5 text-black hover:text-warning bg-neutral-300/60 px-[6px] py-2 rounded-[100px]  hover:brightness-105 hover:shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer"
        />  } 
 </div>
           
</>
    )
}