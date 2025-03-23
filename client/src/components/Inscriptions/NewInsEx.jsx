import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import arrRight from "../../assets/arrow-right-solid.svg";
import { useState } from "react";

function NewInsEx ({connexionPopUp,fn}) {
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
        if (!formData.password.trim() || formData.password.length < 6) {
          newErrors.password = "Mot de passe doit contenir 6 caractères";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleSubmit = () => {
        if (validateForm()) {
          fn()
        }
      };
    
    

    return (
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
    <label className="label-two" htmlFor={id}>
      {label} {id !== "telephone" && <span className="redstar">*</span>}
    </label>
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
      }}
    />
    {errors[id] && <p className="err_message">{errors[id]}</p>}
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
    )

}

export default NewInsEx