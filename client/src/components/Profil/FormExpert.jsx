import React, { useEffect, useState } from "react";
import "../../componentsStyles/ProfilStyles/FormExpert.css";
import { FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const FormExpert = ({id}) => {
  // État initial vide pour stocker les valeurs saisies par l'utilisateur
  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    email: "",
    etablissement: "",
    labo: "",
    telephone: "",
    niveau: "",
    discipline: ""
  });
  const [authState, setAuthState] = useState({email:"",role:"",accessToken:""});
  useEffect(() => {
    axios.get("http://localhost:3001/refresh",{withCredentials:true})
        .then((response) => {
            // if (response.data.error) return navigate('/')
            setAuthState({email:response.data.email,role:response.data.role,accessToken:response.data.accessToken});
            axios.get(`http://localhost:3001/profil/expert/${id}`,{headers:{Authorization:`Bearer ${response.data.accessToken}`}})
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

  //  mettre à jour l'état lorsqu'un champ est modifié
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name] : e.target.value });
    console.log(user);
  };


  const navigate = useNavigate(); 

  return (
    <div className="form-expert-container">
      {/* En-tête */}
      <div className="form-header">
        <h2>Informations Personnelles & Professionnelles</h2>
        <button className="save-button" onClick={() =>{
          axios.put("http://localhost:3001/profil/mon-compte/modifier/expert",user,{headers:{Authorization:`Bearer ${authState.accessToken}`}})
          .then((response) => {
          navigate(`/modifier-expert/${id}`)
          })
          .catch((error) => {
            console.log(error);
          });
        }}>
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

