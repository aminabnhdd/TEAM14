import React, { useEffect, useState } from "react";
import "../../componentsStyles/ProfilStyles/FormExpert.css";
import { FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../helpers/AuthContext";

const FormExpert = ({image}) => {
  // État initial vide pour stocker les valeurs saisies par l'utilisateur
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
  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    email: "",
    etablissement: "",
    labo: "",
    telephone: "",
    niveau: "",
    discipline: "",
    image: image
  });
  const {authState, setAuthState} = useContext(AuthContext);
  useEffect(() => {
    axios.get("http://localhost:3001/refresh",{withCredentials:true})
        .then((response) => {
            // if (response.data.error) return navigate('/')
            setAuthState({email:response.data.email,role:response.data.role,accessToken:response.data.accessToken});
            axios.get(`http://localhost:3001/profil/mon-compte`,{headers:{Authorization:`Bearer ${response.data.accessToken}`}})
            .then((response) => {
              
              setUser({...user,...response.data});
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
          user.image = image;
          const data = new FormData();
          for (const key of allowedFields) {
            if (user[key] !== null && user[key] !== undefined) {
              data.append(key, user[key]);
            }
          }
          axios.put("http://localhost:3001/profil/mon-compte/modifier/expert",data,{headers:{Authorization:`Bearer ${authState.accessToken}`,"Content-Type":"multipart/form-data"}})
          .then((response) => {
            // console.log(response.data);
            navigate(`/modifier-expert`)
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
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Prénom</label>
              <input
                type="text"
                name="prenom"
                value={user.prenom}
                onChange={handleChange}
                readOnly
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
            <select
              
              name="niveau"
              required
              className="select-input"
              value={user.niveau}
              onChange={handleChange}
            >
             <option className="" value="">Sélectionnez votre niveau d'expertise</option> 
             <option className="" value="Docteur">Docteur</option>
             <option className="" value="Maître de conférences A">Maître de conférences A</option>
             <option className="" value="Maître de conférences B">Maître de conférences B</option>
             <option className="" value="Professeur">Professeur</option>
           </select>

          </div>
          <div className="form-group">
            <label>Discipline</label>
            <input
              type="text"
              name="discipline"
              value={user.discipline}
              onChange={handleChange}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormExpert;

