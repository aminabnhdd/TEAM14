import React, { useState } from "react";
import "../../componentsStyles/ProfilStyles/FormExpert.css";
import { FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const FormExpert = () => {
  // État initial vide pour stocker les valeurs saisies par l'utilisateur
  const [user, setUser] = useState({
    nom: "Benhaddad",
    prenom: "Amina",
    email: "aminabenhaddad200876@gmail.com",
    etablissement: "École nationale supérieure",
    labo: "LMCS",
    telephone: "0550 ** ** **",
    niveau: "Avancé",
    discipline: "Histoire",
    password : "1234",
  });

  //  mettre à jour l'état lorsqu'un champ est modifié
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const navigate = useNavigate(); 

  return (
    <div className="form-expert-container">
      {/* En-tête */}
      <div className="form-header">
        <h2>Informations Personnelles & Professionnelles</h2>
        <button className="save-button" onClick={() => navigate("/modifier-expert")}>
          Sauvegarder <FiSave size={16} />
        </button>
      </div>

      {/* Contenu */}
      <div className="form-content">
        {/* Partie gauche */}
        <div className="form-left">
          <div className="form-name-container">
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                name="nom"
                value={user.nom}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Prénom</label>
              <input
                type="text"
                name="prenom"
                value={user.prenom}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Adresse email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Établissement</label>
            <input
              type="text"
              name="etablissement"
              value={user.etablissement}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Centre de recherche / Laboratoire</label>
            <input
              type="text"
              name="labo"
              value={user.labo}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Partie droite */}
        <div className="form-right">
          <div className="form-group">
            <label>Numéro de téléphone</label>
            <input
              type="text"
              name="telephone"
              value={user.telephone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Niveau d'expertise</label>
            <input
              type="text"
              name="niveau"
              value={user.niveau}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Discipline</label>
            <input
              type="text"
              name="discipline"
              value={user.discipline}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormExpert;

