import image from "../assets/Group 38.png";
import image2 from "../assets/Screenshot 2025-03-03 at 8.53.06 AM 2.png";
import "../Insctiptions styles/InsVs.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";  

function InsVs({ connexionPopUP, hide, hideAll }) {
  const [visible, setVisible] = useState(false);
  const [typo, setTypo] = useState("password");
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const TogglePass = () => {
    setVisible(!visible);
    setTypo(typo === "password" ? "text" : "password");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.nom.trim()) newErrors.nom = "Nom est requis";
    if (!formData.prenom.trim()) newErrors.prenom = "Prénom est requis";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Adresse email invalide";
    }
    if (!formData.telephone.trim() || !/^\d{10}$/.test(formData.telephone)) {
      newErrors.telephone = "Numéro invalide";
    }
    if (!formData.password.trim() || formData.password.length < 6) {
      newErrors.password = "Mot de passe doit contenir 6 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      axios.post("http://localhost:3001/auth/signup/visitor", formData)
        .then((res) => {
          // redirect to home page (we'll do it later)
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
          alert("Erreur lors de l'inscription");
        });
    }
  };

  return (
    hideAll && (
      <div className="main-page-one">
        <div className="back-home">
          <img src={image2} className="backHome-logo" />
        </div>
        <div className="img-container-one">
          <img className="main-img-two" src={image} alt="img" />
          <div className="pres">
            <p className="pre">ATHAR, une </p>
            <p className="pre">communauté dédiée au</p>
            <p className="pre">patrimoine algérien.</p>
          </div>
        </div>
        {hide && (
          <div className="form-container-one">
            <div className="inscription-form-one">
              <div className="texts-one">
                <p className="bien-one">Bienvenue sur </p>
                <p className="athar-one">ATHAR</p>
                <p className="compte-one">
                  Vous avez déjà un compte ? {" "}
                  <span className="connexion-one" onClick={connexionPopUP}>Connectez-vous.</span>
                </p>
              </div>

              <form className="info-one">
                {["nom", "prenom", "email", "telephone"].map((id) => (
                  <div key={id} className="form-group-one">
                    <label className="label-one" htmlFor={id}>{id.charAt(0).toUpperCase() + id.slice(1)}</label>
                    <input
                      className={`input-one ${errors[id] ? "input-error" : ""}`}
                      type={id === "email" ? "email" : "text"}
                      id={id}
                      placeholder={id}
                      value={formData[id]}
                      onChange={handleChange}
                      onFocus={(e) => {
                        e.target.style.border = "1px solid #E8C07D"; 
                        e.target.style.outline = "0.5px solid #E8C07D"; 
                      }}
                      onBlur={(e) => {
                        e.target.style.border = errors[id] ? "" : "1px solid #A0A5A6";
                        e.target.style.outline = "none"; 
                      }}          
                    />
                    {errors[id] && <p className="err_message">{errors[id]}</p>}
                  </div>
                ))}

                <div className="form-group-one">
                  <label className="label-one" htmlFor="password">Mot de passe</label>
                  <input
                    className={`input-one ${errors.password ? "input-error" : ""}`}
                    type={typo}
                    id="password"
                    placeholder="mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={(e) => {
                      e.target.style.border = "1px solid #E8C07D"; 
                      e.target.style.outline = "0.5px solid #E8C07D"; 
                    }}
                    onBlur={(e) => {
                      e.target.style.border = "1px solid #A0A5A6";
                      e.target.style.outline = "none"; 
                    }} />

                  <div className="eye-one" onClick={TogglePass}>
                    <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} />
                  </div>
                  {errors.password && <p className="err_message">{errors.password}</p>}
                </div>
              </form>

              <button className="btn1-one" onClick={handleSubmit}>S'inscrire</button>
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default InsVs;
