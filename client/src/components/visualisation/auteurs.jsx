import { Auteur } from "./auteur"
import AjouterCollaborateur from "./ajouterCollaborateur"
export default function Auteurs(props){
               {/* GET THE CHEF DE PROJETT (using props.projet) */}
               const chef={
                _id:'id1',
                nom:'Benhaddad',
                prenom:'Amina',
                email:'',
                role:'',
                userValid:true,
                pfp:'https://photosrush.com/wp-content/uploads/black-cat-pfp.jpg',
                favorites:[],
                discipline:'architecture',
                labo:'',
                etablissement:"",
                niveau:'',
                projets:[],
                fileUrl:'',
                 }
    return (

    <><div>

        <div className="bg-dune buttons py-1 px-[10px] text-black  rounded-[4px] overflow-hidden mb-4" >
            Auteurs
        </div>
        <ul>
            <li className="mb-4 bolder-text  break-words text-black">
                Chef du projet
            </li>
        </ul>
 

        <Auteur user={chef} />

        {props.projet.collaborateurs.length>0 &&
        <ul>
            <li className="mb-4 bolder-text  break-words text-black">
                Collaborateurs
            </li>
        </ul>}
        {props.projet.collaborateurs.length>0 &&   props.projet.collaborateurs.map ((collaborateurId)=>{

            // GET THE COLLABORATEUR WITH THAT SPECIFIQUE ID 

            const collaborateur={
            _id:'id1',
            nom:'Rahim',
            prenom:'Sarah',
            email:'',
            role:'',
            userValid:true,
            pfp:'https://i.pinimg.com/236x/dd/f0/11/ddf0110aa19f445687b737679eec9cb2.jpg',
            favorites:[],
            discipline:'histoire',
            labo:'',
            etablissement:"",
            niveau:'',
            projets:[],
            fileUrl:'',
             }
            return(
            
            <Auteur user={collaborateur}  isChef={props.isChef} projet={props.projet} setProjet={props.setProjet} />
            )
        })

        }
    
        </div>
        {props.isChef && <AjouterCollaborateur />}
    </>
    )
}