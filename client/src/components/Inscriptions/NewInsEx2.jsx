import { lazy, useState } from "react";
import arrRight from "../../assets/arrow-right-solid.svg";
import arrLeft from "../../assets/arrow-left-solid.svg";
import "../../ComponentsStyles/Insctiptions styles/NewInsEx2.css"

function NewInsEx2 ({prevPopUp,fn,connexionPopUP}) {

    const [formData, setFormData] = useState({
        discipline: "",
        etablissement: "",
        laboratoire: "",
        expertise: ""
      });
      const [errors, setErrors] = useState({});
    
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

    return(
        <div className="inscription-form-three">
                      <div className="texts-three">
                        <p className="bien-three">Bienvenue sur </p>
                        <p className="athar-three">ATHAR</p>
                        <p className="compte-three">
                          Vous avez déjà un compte ?
                          <span className="connexion-three" onClick={connexionPopUP}> Connectez vous.</span>
                        </p>
                      </div>
                      <form className="info-three">
                        {["discipline", "etablissement", "laboratoire", "expertise"].map((field) => (
                          <div key={field} className="form-group-three">
                            <label className="label-three" htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}{field !== "laboratoire" && <span className="redstar"> *</span>}</label>
                            <input
                              className={`input-three ${errors[field] ? "input-error" : ""}`}
                              type="text"
                              id={field}
                              placeholder={field}
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
                              
                            />
                            {errors[field] && <p className="err_message">{errors[field]}</p>}
                          </div>
                        ))}
                      </form>
                      <div className="rr-three">
                        <img src={arrRight} alt="rr" onClick={handleSubmit} />
                      </div>
                      <div className="lr-three">
                        <img src={arrLeft} alt="ll" onClick={prevPopUp} />
                      </div>
        </div>
    )

}

export default NewInsEx2