import { Auteur } from "./auteur"
import AjouterCollaborateur from "./ajouterCollaborateur"
export default function Auteurs(props){
              
            
    return (

    <><div>

        <div className="bg-dune buttons py-1 px-[10px] text-black  rounded-[4px] overflow-hidden mb-4" >
            Auteurs
        </div>
        <ul>
            <li className="mb-2 bolder-text  break-words text-black">
                Chef du projet
            </li>
        </ul>
 

        <Auteur user={props.chef} isAdmin={props.isAdmin} />

        {props.projet.collaborateurs.length>0 &&
        <ul>
            <li className="mb-2 mt-4 bolder-text  break-words text-black">
                Collaborateurs
            </li>
        </ul>}
        {props.collaborateurs.length>0 &&   props.collaborateurs.map ((collaborateur)=>{
            if (props.chef._id !== collaborateur._id)
            return(
            <Auteur key={collaborateur._id} user={collaborateur}  isChef={props.isChef} projet={props.projet} setProjet={props.setProjet} collaborateurs={props.collaborateurs} setCollaborateurs={props.setCollaborateurs} isAdmin={props.isAdmin} />
            )
        })
        }
        </div>
        {props.isChef && props.collaborateurs.length<3 && <AjouterCollaborateur projet={props.projet} setProjet={props.setProjet} collaborateurs={props.collaborateurs} setCollaborateurs={props.setCollaborateurs} showPopup={props.showPopup}
                      setShowPopup={props.setShowPopup} />}
    </>
    )
}