import image from "../assets/Group 38.png";
import image2 from "../assets/Screenshot 2025-03-03 at 8.53.06 AM 2.png";
import "../Insctiptions styles/InsEx.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import arrRight from "../assets/arrow-right-solid.svg";

function InsEx({ nextPopUp, car, connexionPopUp, hideAll1 }) {
  const [visible, setVisible] = useState(false);
  const [typo, setTypo] = useState("password");
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    password: ""
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
      nextPopUp();
    }
  };

  return (
    hideAll1 && (
      <div className="main-page-two">
        <div className="back-home">
          <img src={image2} className="backHome-logo-two" />
          <div className="pres2">
            <p className="pre">ATHAR, une </p>
            <p className="pre">communauté dédiée au</p>
            <p className="pre">patrimoine algérien.</p>
          </div>
        </div>
        <div className="img-container-two">
          <img className="main-img-two" src={image} alt="img" />
        </div>
        {car && (
          <div className="form-container-two">
            <div className="inscription-form-two">
              <div className="texts-two">
                <p className="bien-two">Bienvenue sur </p>
                <p className="athar-two">ATHAR</p>
                <p className="compte-two">
                  Vous avez déjà un compte ? {" "}
                  <span className="connexion-two" onClick={connexionPopUp}>Connectez vous.</span>
                </p>
              </div>

              <form  className="info-two">
                {[
                  { id: "nom", label: "Nom", type: "text" },
                  { id: "prenom", label: "Prénom", type: "text" },
                  { id: "email", label: "Adresse email", type: "email" },
                  { id: "telephone", label: "Téléphone", type: "tel" }
                ].map(({ id, label, type }) => (
                  <div key={id} className="form-group-two">
                    
                    <label className="label-two" htmlFor={id}>{label}</label>
                    <input
                      className={`input-two ${errors[id] ? "input-error" : ""}`}
                      type={type}
                      id={id}
                      placeholder={label.toLowerCase()}
                      value={formData[id]}
                      onChange={handleChange}
                      onFocus={(e) => {
                        e.target.style.border = "1px solid #E8C07D"; 
                        e.target.style.outline = "0.5px solid #E8C07D"; 
                      }}
                      onBlur={(e) => {
                        e.target.style.border = errors[id] ? "" : "1px solid #A0A5A6";
                        e.target.style.outline = "none"; 
                      }}                    />
                    {errors[id] && <p className="err_message">{errors[id]}</p>}
                  </div>
                ))}

                <div className="form-group-two">
                  <label className="label-two" htmlFor="password">Mot de passe</label>
                  <input
                    className={`input-two ${errors.password ? "input-error" : ""}`}
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
                      e.target.style.border =  "1px solid #A0A5A6";
                      e.target.style.outline = "none"; 
                    }}  
                  />
                  <div className="eye-two" onClick={TogglePass}>
                    <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} />
                  </div>
                  {errors.password && <p className="err_message">{errors.password}</p>}
                </div>
              </form>

              <div className="rr-two" onClick={handleSubmit}>
                <img src={arrRight} alt="rr" />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default InsEx;
