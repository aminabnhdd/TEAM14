import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import "../../ComponentsStyles/Insctiptions styles/NewInsVs.css"
import { useNavigate } from "react-router-dom";
import Demande from "../popUps/Demande";
import VerificationCode from "../popUps/VerificationCode";

function NewInsvs() {
  const navigate = useNavigate();
  const goToConnexion = () => navigate("/connexion");
  
  const [visible, setVisible] = useState(false);
  const [popDem, setPopDem] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [typo, setTypo] = useState("password");
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    password: "",
  });
  const [errors, setErrors] = useState({}); // Validation errors

  // Toggle visibility of password
  const TogglePass = () => {
    setVisible(!visible);
    setTypo(typo === "password" ? "text" : "password");
  };

  // Update form field state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Basic form validation
  const validateForm = () => {
    let newErrors = {};
    if (!formData.nom.trim()) newErrors.nom = "Nom est requis";
    if (!formData.prenom.trim()) newErrors.prenom = "Prénom est requis";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Adresse email invalide";
    }
    if (!formData.password.trim() || formData.password.length < 6) {
      newErrors.password = "Mot de passe doit contenir 6 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      try {
        // First send the verification code
        const response = await axios.post("http://localhost:3001/auth/send-verification-code", {
          email: formData.email,
          data: formData
        });
        
        if (response.data.success) {
          setShowVerification(true);
        }
      } catch (err) {
        if (err.response && err.response.data.error === 'email already taken') {
          setEmailExist(true);
        } else {
          console.error(err);
          alert("Erreur lors de l'envoi du code de vérification");
        }
      }
    }
  };

  const handleVerify = async (code) => {
    try {
      const response = await axios.post("http://localhost:3001/auth/verify-code", {
        email: formData.email,
        code: code
      });
  
      if (response.data === "Code right") {
        // Only proceed with signup if the form is still valid
        if (validateForm()) {
          try {
            const res = await axios.post("http://localhost:3001/auth/signup/visitor", formData);
  
            if (res.data.error === 'email already taken') {
              setEmailExist(true);
            } else {
              setEmailExist(false);
              setPopDem(true); // Show confirmation popup
            }
          } catch (signupError) {
            console.error(signupError);
            alert("Erreur lors de l'inscription");
          }
        }
  
        // Hide the verification popup regardless
        setShowVerification(false);
      }
    } catch (err) {
      throw new Error(err.response?.data?.error || "Code incorrect ou expiré");
    }
  };

  return (
    <>
      <div className="inscription-form-one">
        <div className="texts-one">
          <p className="bien-one">Bienvenue sur </p>
          <p className="athar-one">ATHAR</p>
          <p className="compte-one">
            Vous avez déjà un compte ?  <span className="connexion-one" onClick={goToConnexion}> Connectez-vous.</span>
          </p>
        </div>

        <form className="info-one">
          {["nom", "prenom", "email", "telephone"].map((id) => (
            <div key={id} className="form-group-one">
              <label className="label-one" htmlFor={id}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
                {id !== "telephone" && <span className="redstar"> *</span>}
              </label>
              <input
                className={`input-one ${(errors[id] || (emailExist && id === 'email')) ? "input-error" : ""}`}
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
              {(emailExist && id === 'email') && <p className="err_message">Cet email est déja pris</p>}
            </div>
          ))}

          <div className="form-group-one">
            <label className="label-one" htmlFor="password">Mot de passe<span className="redstar"> *</span></label>
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
              }} 
            />
            {errors.password && <p className="err_message">{errors.password}</p>}
            <div className="eye-one" onClick={TogglePass}>
              {visible ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>
        </form>
        
        <button className="btn1-one" onClick={handleSubmit}>S'inscrire</button>
      </div>
      
      <VerificationCode 
        popUp={showVerification} 
        onClose={() => setShowVerification(false)}
        email={formData.email}
        onVerify={handleVerify}
      />
      
      <Demande popUp={popDem} foncone={() => setPopDem(false)} />
    </>
  );
}

export default NewInsvs;
;