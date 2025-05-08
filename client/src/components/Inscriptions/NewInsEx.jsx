import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import arrRight from "../../assets/arrow-right-solid.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../ComponentsStyles/Insctiptions styles/NewInsEx.css"
import axios from "axios";

function NewInsEx({  fn, swipeDirection }) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [typo, setTypo] = useState("password");
  const [emailExist,setEmailExist] = useState(false);
  const [formData, setFormData] = useState({
    nom: JSON.parse(localStorage.getItem("formData1"))?.nom || "",
    prenom:JSON.parse(localStorage.getItem("formData1"))?.prenom || "",
    email:JSON.parse(localStorage.getItem("formData1"))?.email || "",
    telephone:JSON.parse(localStorage.getItem("formData1"))?.telephone || "",
    password:JSON.parse(localStorage.getItem("formData1"))?.password || "",
  });
  const [errors, setErrors] = useState({});

  const goToConnexion = () => {
navigate("/connexion");
  };

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
    if (!formData.password.trim() || formData.password.length < 6) {
      newErrors.password = "Mot de passe doit contenir 6 caractères";
    }
    if (errors.email) {
      newErrors.email = "Cet email est déja pris";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (localStorage.getItem("formData1")) {
        localStorage.removeItem("formData1");
      }
      localStorage.setItem("formData1", JSON.stringify(formData));
      fn();
    }
  };

  
 
  return (
    <motion.div
      className="inscription-form-two"
      initial={{ x: swipeDirection === "right" ? -100 : 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: swipeDirection === "left" ? 100 : -100, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      
      <div className="texts-two">
        <p className="bien-two">Bienvenue sur </p>
        <p className="athar-two">ATHAR</p>
        <p className="compte-two">
          Vous avez déjà un compte ? <span className="connexion-two" onClick={goToConnexion}>Connectez vous.</span>
        </p>
      </div>

      <form className="info-two">
        {[
          { id: "nom", label: "Nom", type: "text" },
          { id: "prenom", label: "Prénom", type: "text" },
          { id: "email", label: "Adresse email", type: "email" },
          { id: "telephone", label: "Téléphone", type: "tel" }
        ].map(({ id, label, type }) => (
          <div key={id} className="form-group-two">
            <label className="label-two" htmlFor={id}>
              {label} {id !== "telephone" && <span className="redstar">*</span>}
            </label>
            <input
              className={`input-two ${(errors[id]||(emailExist && (id == 'email'
              ) )) ? "input-error" : ""}`}
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
                if (id !== "email") return;
                if(!formData.email) return;
                axios.post("http://localhost:3001/auth/mail/exists",{email:formData.email})
                .then((res)=>{
                  console.log(res.data);
                  setErrors({...errors,email:res.data.email})
                  return;
                })
                .catch((err)=>{
                  alert(err);
                })
              }}
            />
            {errors[id] && <p className="err_message">{errors[id]}</p>}
            { (emailExist && (id == 'email'
                      ) )&& <p className="err_message">Cet email est déja pris</p>}
          </div>
        ))}

        <div className="form-group-two">
          <label className="label-two" htmlFor="password">Mot de passe <span className="redstar">*</span></label>
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
              e.target.style.border = "1px solid #A0A5A6";
              e.target.style.outline = "none"; 
            }}  
          />
          {errors.password && <p className="err_message">{errors.password}</p>}
          <div className="eye-two" onClick={TogglePass}>
            {visible ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>
      </form>

      <div className="rr-two" onClick={handleSubmit}>
        <img src={arrRight} alt="rr" />
      </div>
    </motion.div>
  );
}

export default NewInsEx;
