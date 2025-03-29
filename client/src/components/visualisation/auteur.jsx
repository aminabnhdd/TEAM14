import { useState } from 'react';
import removeIcon from '../../assets/remove-user.png'

export function Auteur (props){
    const [showConfirmation, setShowConfirmation] = useState(false);

    const visitProfile = (event) => { 
        console.log(props.user._id);
    };

    const removeUser = (event) => { 
        event.stopPropagation();
        const newCollaborateurs = props.projet.collaborateurs.filter(
            (collab) => collab !== props.user._id
        );
        
        props.setProjet((prevProjet) => ({
            ...prevProjet,
            collaborateurs: newCollaborateurs
        }));
        
        setShowConfirmation(false);
        console.log(props.projet);
    };

    const openConfirmation = (event) => {
        event.stopPropagation();
        setShowConfirmation(true);
    };

    return (
        <>
            <div onClick={visitProfile} id={props.user._id} key={props.user._id} className="flex relative gap-3 items-center align-items gap-3 rounded-[12px] hover:bg-neutral-100 py-2 px-4 cursor-pointer break-words ">
                <div className="w-8 h-8 mr-2 bg-neutral-500 rounded-full">
                    <img src={props.user.pfp} className="w-full h-full rounded-full object-cover" alt="Profile" />
                </div>
                <div className="max-w-full">
                    <p className="main-text mb-[2px]">{props.user.nom} {props.user.prenom}</p>
                    <p className="thinner-text">Expert en {props.user.discipline}</p>   
                </div>
                {props.isChef &&
                    <button
                        onClick={openConfirmation}
                        className="absolute right-2 bottom-2 w-8 h-8 text-black hover:text-warning bg-neutral-200/60 flex items-center justify-center rounded-full hover:brightness-105 hover:shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer"
                    >
                        <img src={removeIcon} className="w-4 h-4" alt="Remove" />
                    </button>
                } 
            </div>
            
            {/* Confirmation Popup */}
            {showConfirmation && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1001]">
                    <div className="bg-white rounded-[20px] shadow-lg w-100 px-10 py-7 relative border border-black">
                        {/* Close Button */}
                        <button
                            className="absolute top-3 right-5 text-black text-xl hover:text-warning cursor-pointer"
                            onClick={() => setShowConfirmation(false)}
                        >
                            &times;
                        </button>

                        {/* Popup Title */}
                        <h2 className="buttons text-black mb-5">Confirmation</h2>

                        {/* Confirmation Message */}
                        <p className="main-text mb-5">Êtes-vous sûr de vouloir retirer ce collaborateur?</p>

                        {/* Action Buttons */}
                        <div className="flex justify-around gap-3 mt-5">
                            <button 
                                onClick={removeUser}
                                className="main-text text-black bg-dune py-3 w-36 mt-4 rounded-[36px] items-center justify-center hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer"
                            >
                                Retirer
                            </button>
                            <button 
                                onClick={() => setShowConfirmation(false)}
                                className="main-text text-black bg-neutral-100 py-3 w-36 mt-4 rounded-[36px] items-center justify-center hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}