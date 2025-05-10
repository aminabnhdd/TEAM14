
// popup to indicate that the password reinsalisation email is sent

import "../../ComponentsStyles/popUps styles/LienEnv.css";
import { useNavigate } from "react-router-dom";

function LienEnv({popUp,foncone}) {
    
const navigate = useNavigate();
return (
  popUp && (
    <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/30">
      <div className="relative z-[11000] w-[32%] p-8 flex flex-col gap-6 bg-white rounded-[29px] animate-fadeIn">
        {/* Close Button */}
        <button
          className="absolute top-4 right-5 text-black text-2xl font-normal hover:text-warning cursor-pointer"
          onClick={() => { foncone(); navigate('/'); }}
        >
          &times;
        </button>

        {/* Title */}
        <div className="text-center font-semibold text-[22px]">
          <p>Lien de réinitialisation envoyé !</p>
        </div>

        {/* Message */}
        <div className="text-md text-black text-center leading-relaxed">
          <p>Un lien de réinitialisation a été envoyé à votre adresse e-mail. Veuillez <span className="text-success">vérifier</span> votre</p>
          <p>boîte de réception et suivre les instructions pour réinitialiser votre mot de passe.</p>
        </div>
      </div>
    </div>
  )
);
}

export default LienEnv;