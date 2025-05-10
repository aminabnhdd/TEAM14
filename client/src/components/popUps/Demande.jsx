
// popup to instruct the user to wait for admin validation after sign up

import "../../ComponentsStyles/popUps styles/Demande.css";
import { useNavigate } from "react-router-dom";
function Demande({popUp,foncone}) {
    
    const navigate = useNavigate();
    function close (){
        foncone();
        navigate('/')

    }return (
  popUp && (
    <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/30">
      <div className="relative z-[11000] w-[32%] p-8 flex flex-col gap-6 bg-white rounded-[29px] animate-fadeIn">
        {/* Close Button */}
        <button
          className="absolute top-4 right-5 text-black text-2xl font-normal hover:text-warning cursor-pointer"
          onClick={close}
        >
          &times;
        </button>

        {/* Title */}
        <div className="text-center font-semibold text-[22px]">
          <p>Demande de création de compte envoyée !</p>
        </div>

        {/* Message */}
        <div className="text-md text-black text-center leading-relaxed">
          <p>Votre demande de création de compte a été transmise à l'<span className="text-primary">administrateur</span>.</p>
          <p>Un <span className="text-primary">email de confirmation</span> vous sera envoyé dès que votre compte aura été approuvé.</p>
          <p>Merci de patienter et de <span className="text-primary">vérifier</span> votre boîte de réception pour la suite.</p>
        </div>
      </div>
    </div>
  )
);
}

export default Demande;