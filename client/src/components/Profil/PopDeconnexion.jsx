import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../helpers/AuthContext.jsx";
import { useContext } from "react";
import "../../componentsStyles/ProfilStyles/PopDeconnexion.css";
const PopDeconnexion = ({ onClose }) => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  const handleDisconnect = () => {
    axios
      .post("http://localhost:3001/profil/deconnexion", {}, {withCredentials: true })
      .then((response) => {
        setAuthState({ email: "", role: "", accessToken: "" });
        navigate("/connexion");
        
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2 className="modal-title">Déconnexion</h2>
        <p className="modal-text">
          Êtes-vous sûr de vouloir vous déconnecter de votre compte ?
        </p>
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>Annuler</button>
          <button className="disconnect-button" onClick={()=>{handleDisconnect()}}>Se déconnecter</button>
        </div>
      </div>
    </div>
  );
};

export default PopDeconnexion;