import React from "react";
import { FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import {useState} from 'react';
import axios from "axios";

const VisiteurSave = ({ name, lastName, email, phone }) => {
  const navigate = useNavigate(); // Initialisation de la navigation
  const [formData, setFormData] = useState({name, lastName, email, phone});
  
  const handleSaveClick = () => {
    navigate("/profil-visiteur"); // Redirection vers la page ProfilVisiteur
  };
  
    const handleChange = (e) => { 
      setFormData({
        ...formData, 
        [e.target.name]: e.target.value,
      });
      
    };
  
    const handleSignup = async(e) => {
      e.preventDefault();
  
      try{
        const response = await axios.post("http://localhost:3001/auth/signup/visiteur", formData, {
          headers: {"Content-Type" : "application/json"},
        });
  
        console.log("Success:", response.data);
        alert("User created successfully!");
      } catch (error) {
        console.error("Error:", error);
        alert("Signup failed!");
      }
      };
    
 

  return (
    <div className="container3">
      <div className="header">
        <h3>Informations Personnelles</h3>
        <button className="save-btn" onClick={() => {handleSaveClick(); handleSignup();}}>
          Sauvegarder <FiSave />
        </button>
      </div>

      <div className="form-content">
        <div className="new-info-item">
          <p className="new-label">Nom :</p>
          <input type="new-value" className="input-field2" defaultValue={name} />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="new-info-item">
          <p className="new-label">Prénom :</p>
          <input type="new-value" className="input-field2" defaultValue={lastName} />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="new-info-item">
          <p className="new-label">Adresse email :</p>
          <input type="email" className="input-field2" defaultValue={email} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="new-info-item">
          <p className="new-label">Numéro de téléphone :</p>
          <input type="new-value" className="input-field2" defaultValue={phone} />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default VisiteurSave;


