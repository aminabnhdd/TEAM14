import React, { useEffect, useState } from "react";
import "../../componentsStyles/ProfilStyles/FormVisiteur.css";
import { FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const FormVisiteur = () => {
  // État initial pour stocker les valeurs saisies
  const [user, setUser] = useState({});

  // Mettre à jour l'état lorsqu'un champ est modifié
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const navigate = useNavigate(); 
  const [authState, setAuthState] = useState({email:"",role:"",accessToken:""});
  useEffect(() => {
    axios.get("http://localhost:3001/refresh",{withCredentials:true})
        .then((response) => {
            // if (response.data.error) return navigate('/')
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
          axios.put("http://localhost:3001/profil/mon-compte/modifier",user,{headers:{Authorization:`Bearer ${authState.accessToken}`}})
          .then((response) => {
            navigate(`/modifier-visiteur`)
          })
          .catch((error) => {
            console.log(error);
          });}}>
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
