
// form for the editor to change his informations


import { useEffect, useState, useContext } from "react";
import "../../componentsStyles/ProfilStyles/FormExpert.css";
import { FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../helpers/AuthContext";

const FormExpert = ({ image }) => {
  
  // define the fields that the user is allowed to modify
  const allowedFields = [
    "nom", "prenom", "email", "etablissement", "labo", "telephone", "niveau", "discipline", "image"
  ];

  const [user, setUser] = useState({
    nom: "", prenom: "", email: "", etablissement: "", labo: "",
    telephone: "", niveau: "", discipline: "", image: image
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
  
    // Clear specific field error if corrected
    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
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
    const requiredFields = ["email", "etablissement", "niveau"];
    const newErrors = {};
    requiredFields.forEach(field => {
      if (!user[field] || user[field].trim() === "") {
        newErrors[field] = true;
      }
    });
    return newErrors;
  };


  // submit the new user informations
  const handleSubmit = () => {
    setSubmitted(true);
    const validationErrors = validate();
    setErrors(validationErrors);


    const data = new FormData();
    user.image = image;
    for (const key of allowedFields) {
      if (user[key] !== null && user[key] !== undefined) {
        data.append(key, user[key]);
      }
    }

    axios.put("http://localhost:3001/profil/mon-compte/modifier/expert", data, {
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
        "Content-Type": "multipart/form-data"
      }
    })
    .then(() => {
      navigate(`/modifier-expert`);
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
    <div className="form-expert-container">
      <div className="form-header">
        <h2>Informations Personnelles & Professionnelles</h2>
        <button className="save-button" onClick={handleSubmit}>
          Sauvegarder <FiSave size={16} />
        </button>
      </div>

      <div className="form-content">
        <div className="form-left">
          <div className="form-name-container">
            <div className="form-group">
              <label>Nom <span className="required-star">*</span></label>
              <input
                type="text"
                name="nom"
                value={user.nom}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Prénom <span className="required-star">*</span></label>
              <input
                type="text"
                name="prenom"
                value={user.prenom}
                onChange={handleChange}
                readOnly
              />
            </div>
          </div>
          <div className={`form-group ${(errors.email ||formError) ? "error" : ""}`}>
            <label>Adresse email <span className="required-star">*</span></label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className={`form-group ${errors.etablissement  ? "error" : ""}`}>
            <label>Établissement <span className="required-star">*</span></label>
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
          <div className={`form-group ${errors.niveau ? "error" : ""}`}>
            <label>Niveau d'expertise <span className="required-star">*</span></label>
            <select
              name="niveau"
              className="select-input"
              value={user.niveau}
              onChange={handleChange}
            >
              <option value="">Sélectionnez votre niveau d'expertise</option>
              <option value="Niveau initial">Niveau initial</option>
              <option value="Niveau intermédiaire">Niveau intermédiaire</option>
              <option value="Niveau avancé">Niveau avancé</option>
              <option value="Niveau expert">Niveau expert</option>

            </select>
          </div>
          <div className="form-group capitalize">
            <label>Discipline *</label>
            <input
              className="capitalize"
              type="text"
              name="discipline"
              value={user.discipline}
              onChange={handleChange}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* display errors if they exist*/}
      {(submitted && Object.keys(errors).length > 0 || formError) && (
        <p className="error-message text-right">
          {formError || "Veuillez remplir tous les champs nécessaires."}
        </p>
      )}
    </div>
  );
};

export default FormExpert;