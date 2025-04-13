import React from "react";
import "../../componentsStyles/ProfilStyles/PopDesactiver.css";
import { useContext } from "react";
import AuthContext from "../../helpers/AuthContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PopDesactiver = ({ onClose, onLogout ,usersData}) => {
  const {authState} = useContext(AuthContext);
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2 className="modal-title">Désactivation du compte</h2>
        <p className="modal-text">
        Êtes-vous sûr de vouloir désactiver le compte ?
        </p>
        <div className="modal-actions">
          <button className="cancel-button" onClick={()=>{
            axios.put(`http://localhost:3001/admin/disable/${usersData[0]._id}`,{}, {headers:{Authorization:`Bearer ${authState.accessToken}`}})
            .then((response) => {
              console.log(response.data);     
              onClose();   
            })
            .catch((error) => {
              console.log(error);
            });
          }}>Confirmer</button>
          <button className="disconnect-button" onClick={onClose}>Annuler</button>
        </div>
      </div>
    </div>
  );
};

export default PopDesactiver;