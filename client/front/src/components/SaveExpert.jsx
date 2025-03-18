import React from "react";
import { FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Import pour la navigation
import {useState} from 'react';
import axios from "axios";


const ExpertSave = ({ name, lastName, email, password, expertise, etablissement, discipline, labo, projets }) => {
  const navigate = useNavigate(); // Initialisation de la navigation

  const [formData, setFormData] = useState({name, lastName, email, password, expertise, etablissement, discipline, labo, projets});

  const handleChange = (e) => { 
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value,
    });
    
  };

   
  const handleSignup = async() => {
  
    try{
      console.log("About to POST to /auth/signup/visiteur");
      const response = await axios.post(
        "http://localhost:3001/auth/signup/expert", 
        formData, 
        {headers: {"Content-Type" : "application/json"},}
      );

      console.log("Success:", response.data);
      alert("User created successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Signup failed!");
    }
    };
  
  const handleSaveClick = () => {
    navigate("/profil-expert"); // Redirection vers la page souhaitée
  };

  return (
    <div className="container3">
      <div className="header">
        <h3>Informations Personnelles & Professionnelles</h3>
        <button className="save-btn" onClick={() => {handleSignup(); handleSaveClick()}}>
          Sauvegarder <FiSave />
        </button>
      </div>

      <div className="content-new"> 
        <div className="group-new first">
          <div className="name-row-new">
            <div className="new-info-item">
              <p className="new-label">Prénom :</p>
              <input type="new-value" className="value input-field" defaultValue={name}
              name="name"
              value={formData.name}
              onChange={handleChange}
             />
            </div>
            <div className="new-info-item">
              <p className="new-label">Nom :</p>
              <input type="new-value" className="value input-field" defaultValue={lastName}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              />
            </div>
          </div>
          <div className="new-info-item">
            <p className="new-label">Adresse email :</p>
            <input type="email" className="value input-field" defaultValue={email} 
            name="email"
            value={formData.email}
            onChange={handleChange}
            />
          </div>
          <div className="new-info-item">
            <p className="new-label">Mot De Passe :</p>
            <input type="new-value" className="value input-field" defaultValue={password} 
            name="password"
            value={formData.password}
            onChange={handleChange}
            />
          </div>
          <div className="new-info-item">
            <p className="new-label">Niveau d'expertise :</p>
            <input type="new-value" className="value input-field" defaultValue={expertise} 
            name="expertise"
            value={formData.expertise}
            onChange={handleChange}/>
          </div>
        
        </div>

        <div className="group-new second">
        <div className="new-info-item">
            <p className="new-label">Etablissement :</p>
            <input type="new-value" className="value input-field" defaultValue={etablissement} 
            name="etablissement"
            value={formData.etablissement}
            onChange={handleChange}
            />
          </div>
          <div className="new-info-item">
            <p className="new-label">Discipline :</p>
            <input type="new-value" className="value input-field" defaultValue={discipline} 
            name="discipline"
            value={formData.discipline}
            onChange={handleChange}
            />
          </div>
          <div className="new-info-item">
            <p className="new-label">Centre de Recherche/Laboratoire :</p>
            <input type="new-value" className="value input-field" defaultValue={labo} 
            name="labo"
            value={formData.labo}
            onChange={handleChange}
            />
          </div>
          
          
          <div className="new-info-item">
            <p className="new-label">Projets :</p>
            <input type="new-value" className="value input-field" defaultValue={projets} 
            name="projets"
            value={formData.projets}
            onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertSave;


