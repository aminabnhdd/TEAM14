import { useNavigate } from "react-router-dom";
import defaultPfp from "../../assets/Default_pfp.svg.png"

export function Auteur (props){

    const navigate = useNavigate();

    // const [showConfirmation, setShowConfirmation] = useState(false);

   
    const visitProfile = (event) => { 
        console.log(props.user,props.utilisateur)
        if (props.isAdmin){
           
            navigate(`/desactiver-expert/${props.user._id}`);
         
           
        } else {
            if(props.user._id === props.utilisateur._id){
                navigate(`/modifier-expert/`); 
            } else {
                navigate(`/afficher-expert/${props.user._id}`);

            }
            
        }
         
    };

    // const removeUser = (event) => { 
    //     event.stopPropagation();
    //     const newCollaborateurs = props.projet.collaborateurs.filter(
    //         (collab) => collab !== props.user._id
    //     );
        
    //     props.setProjet((prevProjet) => ({
    //         ...prevProjet,
    //         collaborateurs: newCollaborateurs
    //     }));

    //     const newCollab = props.collaborateurs.filter(
    //         (collab) => collab._id !== props.user._id
    //     )

    //     props.setCollaborateurs(newCollab);
        
    //     setShowConfirmation(false);
    //     console.log(props.projet);
    // };

    // const openConfirmation = (event) => {
    //     event.stopPropagation();
    //     setShowConfirmation(true);
    // };

    return (
        <>
            <div onClick={visitProfile} id={props.user._id} key={props.user._id} className="flex relative gap-3 items-center align-items rounded-[12px] hover:bg-neutral-100 py-2 px-4 cursor-pointer break-words ">
                <div className="w-8 h-8 mr-2 bg-white rounded-full">
                    <img src={props.user.pfp || defaultPfp} className="w-full h-full rounded-full object-cover" alt="Profile" />
                </div>
                <div className="max-w-full">
                    <p className="main-text mb-[2px]">{props.user.nom} {props.user.prenom}</p>
                    <p className="thinner-text">Expert en {props.user.discipline}</p>   
                </div>
                {/* {props.isChef &&
                    <button
                        onClick={openConfirmation}
                        className="absolute right-2 top-3 w-6 h-6 text-warning rounded-full bg-white border border-warning  hover:brightness-105  hover:scale-110 transition-all duration-300 cursor-pointer"
                    >
            <FontAwesomeIcon icon={faMinus} className=" w-5 h-5" />
            </button>
                }  */}
            </div>
            
            {/* 
            {showConfirmation && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[1001]">
                    <div className="bg-white rounded-[36px] shadow-lg w-100 px-10 py-7 relative border border-black">
                         
                        <button
                            className="absolute top-4 right-6 text-black text-2xl hover:text-warning cursor-pointer"
                            onClick={() => setShowConfirmation(false)}
                        >
                            &times;
                        </button>

                         
                        <h2 className="big-remark text-center text-black mb-5">Confirmation</h2>

                     
                        <p className="main-text mb-5">Êtes-vous sûr de vouloir retirer ce collaborateur?</p>

                     
                        <div className="flex justify-around gap-3 mt-5">
                            <button 
                                onClick={removeUser}
                                className="buttons text-white bg-warning py-4 w-36 mt-3 rounded-[36px] items-center justify-center hover:brightness-105  hover:scale-102 transition-all duration-300 cursor-pointer"
                            >
                                Retirer
                            </button>
                            <button 
                                onClick={() => setShowConfirmation(false)}
                                className="buttons text-black bg-neutral-100 py-4 w-36 mt-3 rounded-[36px] items-center justify-center hover:brightness-96  hover:scale-102 transition-all duration-300 cursor-pointer"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
        </>
    )
}