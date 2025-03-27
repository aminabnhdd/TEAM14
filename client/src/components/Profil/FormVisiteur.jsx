import React, { useState } from "react";
import "../../componentsStyles/ProfilStyles/FormVisiteur.css";
import { FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const FormVisiteur = () => {
  // État initial pour stocker les valeurs saisies
  const [user, setUser] = useState({
    nom: "Benhaddad",
    prenom: "Amina",
    email: "aminabenhaddad200876@gmail.com",
    telephone: "0550 ** ** **",
    password : "1234",
  });

  // Mettre à jour l'état lorsqu'un champ est modifié
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };



  const navigate = useNavigate(); 

  return (
    <div className="frmv-container">
      {/* En-tête */}
      <div className="frmv-header">
        <h2>Informations Personnelles</h2>
        <button className="frmv-save-button" onClick={() => navigate("/modifier-visiteur")}>
          Sauvegarder <FiSave size={16} />
        </button>
      </div>

      {/* Contenu */}
      <div className="frmv-content">
        <div className="frmv-group">
          <label>Nom</label>
          <input
            type="text"
            name="nom"
            value={user.nom}
            onChange={handleChange}
          />
        </div>
        <div className="frmv-group">
          <label>Prénom</label>
          <input
            type="text"
            name="prenom"
            value={user.prenom}
            onChange={handleChange}
          />
        </div>
        <div className="frmv-group">
          <label>Adresse email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="frmv-group">
          <label>Numéro de téléphone</label>
          <input
            type="text"
            name="telephone"
            value={user.telephone}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FormVisiteur;
