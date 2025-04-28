import React, { useEffect, useState } from "react";
import "../../componentsStyles/ProfilStyles/FormVisiteur.css";
import { FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../helpers/AuthContext";
import { useParams } from "react-router-dom";

const FormVisiteur = ({image}) => {
  // État initial pour stocker les valeurs saisies
  const [user, setUser] = useState({});

  const allowedFields = [
    "nom",
    "prenom",
    "email",
    "etablissement",
    "labo",
    "telephone",
    "niveau",
    "discipline",
    "image"
  ];

  // Mettre à jour l'état lorsqu'un champ est modifié
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const navigate = useNavigate(); 
  const {authState, setAuthState} = useContext(AuthContext);
  useEffect(() => {
    axios.get("http://localhost:3001/refresh",{withCredentials:true})
        .then((response) => {
            if (response.data.error) return navigate('/connexion')
            setAuthState({email:response.data.email,role:response.data.role,accessToken:response.data.accessToken});
            axios.get(`http://localhost:3001/profil/mon-compte`,{headers:{Authorization:`Bearer ${response.data.accessToken}`}})
            .then((response) => {
          
              setUser(response.data);
            }
            )
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log(error);
        });
              
  }, []);

  return (
    <div className="frmv-container">
      {/* En-tête */}
      <div className="frmv-header">
        <h2>Informations Personnelles</h2>
        <button className="frmv-save-button" onClick={() =>{
          user.image = image;
          console.log(user);
          const data = new FormData();
          for (const key of allowedFields) {
            if (user[key] !== null && user[key] !== undefined) {
              data.append(key, user[key]);
            }
          }
          axios.put("http://localhost:3001/profil/mon-compte/modifier",data,{headers:{Authorization:`Bearer ${authState.accessToken}`,"Content-Type":"multipart/form-data"}})
          .then((response) => {
            console.log(response.data);
            navigate(`/modifier-visiteur`)
          })
          .catch((error) => {
            console.log(error);
          });
        }}>
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
            readOnly
          />
        </div>
        <div className="frmv-group">
          <label>Prénom</label>
          <input
            type="text"
            name="prenom"
            value={user.prenom}
            onChange={handleChange}
            readOnly
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
