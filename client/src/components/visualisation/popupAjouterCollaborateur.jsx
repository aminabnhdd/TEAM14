// Button Ajouter collaborateur
// Allows Chef de projet to add a collaborator in a discipline that doesn't have a collaborator yet in the project

import { useState } from "react";
import VisuService from "../../services/VisuService";
import  AuthContext from "../../helpers/AuthContext.jsx"
import {useContext} from "react"

const PopAjouterCollaborateur = ({ onClose,projet,setProjet,collaborateurs,setCollaborateurs }) => {
  
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const {authState} = useContext(AuthContext);



  const handleSubmit = async (e) => {
    try{
    e.preventDefault();
    setError('');
    const response = await VisuService.findEmail(projet._id,email,authState.accessToken);
    // check if the email address exists in the data base
    const EmailExists = response.exist;
    
    if (!EmailExists){
        setError("L'adresse ne correspond à aucun utilisateur"); 
        return;
    } 
    // get the user with that email adress
        setError("");
        const user = response.user;

        const isExpert = (response.expert === "expert")
        if (!isExpert){
            setError("L'adresse ne correspond pas à un compte expert"); 
            return;
        
    }
        setError("");
        const id = user._id;
        const isCollaborateur = projet.collaborateurs.includes(id);
        if (isCollaborateur){
          setError("Cet expert fait déjà partie des collaborateurs du projet");            return;
        
    }

    setError("");
    const discipline = user.discipline;
    let disciplineExist = false;
    collaborateurs.forEach(collab => {
         if (discipline === collab.discipline ){
          disciplineExist = true;
         }
    });

    if (disciplineExist){
      setError(`Il exist déja un expert en ${discipline} dans ce projet`); 
      return;}

   
   

    setProjet((prevProjet)=>{return {...prevProjet,
      collaborateurs : [...prevProjet.collaborateurs,
        user._id]}
    })
     
    // add the new collaborator
    setCollaborateurs((prevCollaborateurs)=>{
      return(
        [...prevCollaborateurs,
          user
        ]
      )
    })

    const reponse2 = await VisuService.addCollaborateur(projet._id,user._id,authState.accessToken);

   
    onClose(); 
  }
  catch (error) {
    console.error("Error adding collaborator:", error);
    setError("Une erreur s'est produite lors de l'ajout du collaborateur.");
  }
  };

  return (
  <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/30">
    <div className="relative z-[11000] w-[32%] p-8 flex flex-col gap-6 bg-white rounded-[29px] animate-fadeIn">
      {/* Close Button */}
      <button
        className="absolute top-4 right-5 text-black text-2xl font-normal hover:text-warning cursor-pointer"
        onClick={onClose}
      >
        &times;
      </button>

      {/* Popup Title */}
      <div className="text-center font-semibold text-[22px]">
        <p>Ajouter un collaborateur</p>
      </div>
      <p className="text-md text-black">Entrez l'adresse email de l'expert</p>

      {/* Email Input Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Adresse email"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 ${
            error ? 'border-warning focus:ring-warning' : 'border-neutral-300 focus:ring-dune'
          }`}
        />
        {error && <p className="text-warning text-sm mt-1">{error}</p>}

        {/* Action Buttons */}
        <div className="flex justify-center gap-8 mt-4">
          <button
            type="submit"
            className="flex w-[40%] cursor-pointer py-3 justify-center items-center rounded-[27px] bg-success hover:scale-102 hover:brightness-105 text-white font-semibold transition-colors"
          >
            Ajouter
          </button>
          <button
            onClick={onClose}
            className="flex w-[40%] cursor-pointer py-3 justify-center items-center rounded-[27px] bg-warning hover:scale-102 hover:brightness-105 text-white font-semibold transition-colors"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  </div>
)
};

export default PopAjouterCollaborateur;