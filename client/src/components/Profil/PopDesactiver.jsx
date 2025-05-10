
// popup to confirm deactivation of a user's account by the admin

import "../../componentsStyles/ProfilStyles/PopDesactiver.css";
import { useContext } from "react";
import AuthContext from "../../helpers/AuthContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PopDesactiver = ({ onClose, onLogout ,usersData}) => {
  const {authState} = useContext(AuthContext);
  const navigate = useNavigate();
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
        <p>Désactivation du compte</p>
      </div>

      {/* Message */}
      <p className="text-md text-black text-center leading-relaxed">
        Êtes-vous sûr de vouloir désactiver le compte ?
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-8 mt-2">
        <button
          onClick={() => {
            axios.put(`http://localhost:3001/admin/disable/${usersData[0]._id}`, {}, {
              headers: { Authorization: `Bearer ${authState.accessToken}` }
            })
            .then((response) => {
              console.log(response.data);
              onClose();
              navigate("/list-utilisateurs");
            })
            .catch((error) => {
              console.log(error);
            });
          }}
          className="flex w-[40%] py-3 justify-center cursor-pointer items-center rounded-[27px] bg-warning hover:scale-102 hover:brightness-105 text-white font-semibold transition-all"
        >
          Confirmer
        </button>
        <button
          onClick={onClose}
          className="flex w-[40%] py-3 justify-center cursor-pointer items-center rounded-[27px] bg-success hover:scale-102 hover:brightness-105 text-white font-semibold transition-all"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
);
};

export default PopDesactiver;