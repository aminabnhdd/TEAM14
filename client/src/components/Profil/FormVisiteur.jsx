
// form for the editor to change his informations


import React, { useEffect, useState, useContext } from "react";
import "../../componentsStyles/ProfilStyles/FormVisiteur.css";
import { FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../helpers/AuthContext";

const FormVisiteur = ({ image }) => {

    // define the fields that the user is allowed to modify

  const allowedFields = [
    "nom", "prenom", "email", "telephone", "image"
  ];

  const [user, setUser] = useState({
    nom: "", prenom: "", email: "", telephone: "", image: image
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

    // get the old informations

  useEffect(() => {
    axios.get("http://localhost:3001/refresh", { withCredentials: true })
      .then((response) => {
        setAuthState({
          email: response.data.email,
          role: response.data.role,
          accessToken: response.data.accessToken,
        });

        return axios.get("http://localhost:3001/profil/mon-compte", {
          headers: { Authorization: `Bearer ${response.data.accessToken}` }
        });
      })
      .then((response) => {
        setUser(prev => ({ ...prev, ...response.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


    // handle the changes

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  
    // Clear email error if corrected
    if (errors.email) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.email;
        return newErrors;
      });
    }
  
    // Reset formError when modifying the email
    if (name === "email" && formError) {
      setFormError("");
    }
  };


    // check for erros

  const validate = () => {
    const newErrors = {};
    if (!user.email || user.email.trim() === "") {
      newErrors.email = true;
    }
    return newErrors;
  };

    // submit the new user informations


  const handleSubmit = () => {
    setSubmitted(true);
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const data = new FormData();
    user.image = image;
    for (const key of allowedFields) {
      if (user[key] !== null && user[key] !== undefined) {
        data.append(key, user[key]);
      }
    }

    axios.put("http://localhost:3001/profil/mon-compte/modifier", data, {
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
        "Content-Type": "multipart/form-data"
      }
    })
    .then(() => {
      navigate(`/modifier-visiteur`);
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.message === "Email déja utilisé") {
        setFormError("Cette adresse email est déjà utilisée");
      } 
      if (error.response && error.response.data && error.response.data.message === "Email format invalide.") {
        setFormError("Email format invalide");
      }
      console.error(error);
    });
  };

  return (
    <div className="frmv-container">
      <div className="frmv-header">
        <h2>Informations Personnelles</h2>
        <button className="frmv-save-button" onClick={handleSubmit}>
          Sauvegarder <FiSave size={16} />
        </button>
      </div>

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
        <div className={`frmv-group ${(errors.email || formError) ? "error" : ""}`}>
          <label>Adresse email <span className="required-star">*</span></label>
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

            {/* display errors if they exist*/}


      {(submitted && Object.keys(errors).length > 0 || formError) && (
        <p className="error-message text-right">
          {formError || "L'adresse email est requise."}
        </p>
      )}
    </div>
  );
};

export default FormVisiteur;