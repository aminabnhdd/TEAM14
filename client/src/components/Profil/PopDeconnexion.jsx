// popup to confirm log out

import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../helpers/AuthContext.jsx";
import { useContext } from "react";
import "../../ComponentsStyles/ProfilStyles/PopDeconnexion.css";
const PopDeconnexion = ({ onClose }) => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);

  // log out
  const handleDisconnect = () => {
    axios
      .post("http://localhost:3001/profil/deconnexion", {}, {withCredentials: true })
      .then((response) => {
        setAuthState({ email: "", role: "", accessToken: "" });
        navigate("/connexion");                                       // the user is sent to the log in page after log out
   
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
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

      {/* Title */}
      <div className="text-center font-semibold text-[22px]">
        <p>Déconnexion</p>
      </div>

      {/* Message */}
      <p className="text-md text-black text-center leading-relaxed">
        Êtes-vous sûr de vouloir vous déconnecter de votre compte ?
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-8 mt-2">
        <button
          onClick={onClose}
          className="flex w-[40%] py-3 justify-center items-center cursor-pointer rounded-[27px] bg-success hover:scale-102 hover:brightness-105 text-white font-semibold transition-all"
        >
          Annuler
        </button>
        <button
          onClick={() => { handleDisconnect() }}
          className="flex w-[40%] py-3 justify-center items-center cursor-pointer rounded-[27px] bg-warning hover:scale-102 hover:brightness-105 text-white font-semibold transition-all"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  </div>
)
};

export default PopDeconnexion;