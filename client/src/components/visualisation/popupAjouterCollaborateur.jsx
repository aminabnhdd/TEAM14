import { useState } from "react";

const PopAjouterCollaborateur = ({ onClose }) => {
  
  
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // check if the email address exists in the data base
    const EmailExists = (email==='hi@esi.dz');
    if (!EmailExists){
        setError("L'adresse ne correspond à aucun utilisateur"); 
        return;
    } 
        setError("");
        const user={
            _id:'id1',
            nom:'Rahim',
            prenom:'Sarah',
            email:'',
            role:'expert',
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
        // get the role of the user
        const role = user.role;
        const isExpert = (user.role === "expert")
        if (!isExpert){
            setError("L'adresse ne correspond pas à un compte expert"); 
            return;
        
    }

    
   
    onClose(); 
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1001]">
      <div className="bg-white rounded-[20px] shadow-lg w-100 px-10 py-7 relative border border-black">
        {/* Close Button */}
        <button
          className="absolute top-3 right-5 text-black text-xl cursor-pointer hover:text-warning"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Popup Title */}
        <h2 className=" bolder-text text-black mb-5">Ajouter un collaborateur</h2>
        <p className="mb-2 ">Entrez l'adresse email de l'expert</p>
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
            {error && <p className="text-warning small-remark" >{error}</p>}
          {/* Action Buttons */}
          <div className="flex justify-around gap-3 mt-5">
            <button
              type="submit"
              className="main-text text-black bg-dune py-3 w-36 mt-2 rounded-[36px] items-center justify-center hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer"
            >
              Ajouter
            </button>
            <button
              onClick={onClose}
              className="main-text text-black bg-neutral-100 py-3 w-36 mt-2 rounded-[36px] items-center justify-center hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer"
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