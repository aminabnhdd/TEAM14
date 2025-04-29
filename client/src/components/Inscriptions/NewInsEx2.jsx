import { motion } from "framer-motion";
import { useState } from "react";
import arrRight from "../../assets/arrow-right-solid.svg";
import arrLeft from "../../assets/arrow-left-solid.svg";
import "../../ComponentsStyles/Insctiptions styles/NewInsEx2.css";
import { useNavigate } from "react-router-dom";


function NewInsEx2({ prevPopUp, fn,swipeDirection}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    expertise: "",
    etablissement: "",
    discipline: "",
  });
  const [errors, setErrors] = useState({});


  const goToConnexion = () => {
    navigate("/connexion");
  }
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.discipline.trim()) newErrors.discipline = "Discipline requise";
    if (!formData.etablissement.trim()) newErrors.etablissement = "Etablissement requis";
    if (!formData.expertise.trim()) newErrors.expertise = "Niveau d'expertise requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (localStorage.getItem("formData2")) {
        localStorage.removeItem("formData2");
        
      }
      localStorage.setItem("formData2", JSON.stringify(formData));
      fn();
    }
  };

  const handleBack = () => {
    setTimeout(prevPopUp);
  };
  
  return (
    
    <motion.div
      className="inscription-form-three"
      initial={{ x: swipeDirection === "right" ? -100 : 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: swipeDirection === "left" ? 100 : -100, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
    
      <div className="texts-three">
        <p className="bien-three">Bienvenue sur </p>
        <p className="athar-three">ATHAR</p>
        <p className="compte-three">
          Vous avez déjà un compte ? <span className="connexion-three" onClick={goToConnexion}>Connectez-vous.</span>
        </p>
      </div>

      <form className="info-three">
      {["expertise", "etablissement", "laboratoire"].map((field) => (
  <div key={field} className="form-group-three">
    <label className="label-three" htmlFor={field}>
      {field === "expertise"
        ? "Niveau d'expertise"
        : field.charAt(0).toUpperCase() + field.slice(1)}
      {field !== "laboratoire" && <span className="redstar"> *</span>}
    </label>
    {(field == "expertise") ? 
      <div className="select-wrapper">
    <select
      className={`input-three-select ${errors[field] ? "input-error" : ""}`}

      id={field}
      placeholder={field === "expertise" ? "niveau d'expertise" : field}
      value={formData[field]}
      required
      onChange={handleChange}
      onFocus={(e) => {
        e.target.style.border = "1px solid #E8C07D";
        e.target.style.outline = "0.5px solid #E8C07D";
      }}
      onBlur={(e) => {
        e.target.style.border = errors[field] ? "" : "1px solid #A0A5A6";
        e.target.style.outline = "none";
      }}>
      <option className="opt" value="">Sélectionnez votre niveau d'expertise</option> {/* Default empty option */}
      <option className="opt" value="Docteur">Docteur</option>
      <option className="opt" value="Maître de conférences A">Maître de conférences A</option>
      <option className="opt" value="Maître de conférences B">Maître de conférences B</option>
      <option className="opt" value="Professeur">Professeur</option>
    </select>
    <i className="fa-solid fa-chevron-down dropdown-icon-container"></i></div>
    :
    <input
      className={`input-three ${errors[field] ? "input-error-select" : ""}`}
      type="text"
      id={field}
      placeholder={field === "expertise" ? "niveau d'expertise" : field}
      value={formData[field]}
      onChange={handleChange}
      onFocus={(e) => {
        e.target.style.border = "1px solid #E8C07D";
        e.target.style.outline = "0.5px solid #E8C07D";
      }}
      onBlur={(e) => {
        e.target.style.border = errors[field] ? "" : "1px solid #A0A5A6";
        e.target.style.outline = "none";
      }}
    />}
    {errors[field] && <p className="err_message">{errors[field]}</p>}
  </div>
))}

        
        <div className="form-group-three">
          <label className="label-three" htmlFor="discipline">
            Discipline<span className="redstar"> *</span>
          </label>
          <div className="select-wrapper">

          <select
            className={`input-three-select ${errors.discipline ? "input-error-select" : ""}`}
            id="discipline"
            required
            value={formData.discipline}
            onChange={handleChange}
            onFocus={(e) => {
              e.target.style.border = "1px solid #E8C07D";
              e.target.style.outline = "0.5px solid #E8C07D";
            }}
            onBlur={(e) => {
              e.target.style.border = errors.discipline ? "" : "1px solid #A0A5A6";
              e.target.style.outline = "none";
            }}
          >
            <option className="opt" value="">Sélectionnez une discipline</option>
            <option className="opt" value="archeologie">Archéologie</option>
            <option className="opt" value="histoire">Histoire</option>
            <option className="opt" value="architecture">Architecture</option>
          </select>
              <i className="fa-solid fa-chevron-down dropdown-icon-container"></i>
          </div>
          {errors.discipline && <p className="err_message">{errors.discipline}</p>}
        </div>
      </form>

      <div className="rr-three">
        <img src={arrRight} alt="rr" onClick={handleSubmit} />
      </div>
      <div className="lr-three">
        <img src={arrLeft} alt="ll" onClick={handleBack} />
      </div>
    </motion.div>
  );
}

export default NewInsEx2;
