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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[1001]">
      <div className="bg-white rounded-[36px] shadow-lg w-120 px-10 py-7 relative border border-black">
        {/* Close Button */}
        <button
          className="absolute top-4 right-6 text-black text-2xl cursor-pointer hover:text-warning"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Popup Title */}
        <h2 className=" big-remark text-center text-black mb-5">Ajouter un collaborateur</h2>
        <p className="mb-2 main-text ">Entrez l'adresse email de l'expert</p>
        {/* Email Input Form */}
        <form onSubmit={handleSubmit}>
            
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)
            }
            placeholder="Adresse email"
            className={`w-full main-text px-4 py-2 border border-neutral-300 rounded-xl text-neutral-500 focus:outline-none focus:ring-1 focus:ring-dune ${error && 'focus:ring-warning'}`}
          />
            {error && <p className="text-warning small-remark mt-1" >{error}</p>}
          {/* Action Buttons */}
          <div className="flex justify-around gap-3 mt-5">
            <button
              type="submit"
              className="buttons text-black bg-dune py-4 w-42 mt-3 rounded-[36px] items-center justify-center hover:brightness-105 hover:scale-102 transition-all duration-300 cursor-pointer"
            >
              Ajouter
            </button>
            <button
              onClick={onClose}
              className="buttons text-black bg-neutral-100 py-4 w-42 mt-3 rounded-[36px] items-center justify-center hover:brightness-95 hover:scale-102 transition-all duration-300 cursor-pointer"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopAjouterCollaborateur;