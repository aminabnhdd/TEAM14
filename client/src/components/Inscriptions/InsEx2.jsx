// Import React's useState hook and styles
import { useState } from "react";
import "../../ComponentsStyles/Insctiptions styles/InsEx2.css";

// Import icons for navigation
import arrRight from "../../assets/arrow-right-solid.svg";
import arrLeft from "../../assets/arrow-left-solid.svg";

// Component definition with props for navigation and state control
function InsEx2({ nextPopUp2, prevPopUp, car2, connexionPopUP }) {
  // Local state for form data and validation errors
  const [formData, setFormData] = useState({
    discipline: "",
    etablissement: "",
    laboratoire: "",
    expertise: ""
  });
  const [errors, setErrors] = useState({});

  // Update form field values in state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Validate form fields and update errors if any are missing
  const validateForm = () => {
    let newErrors = {};

    if (!formData.discipline.trim()) newErrors.discipline = "Discipline requise";
    if (!formData.etablissement.trim()) newErrors.etablissement = "Etablissement requis";
    if (!formData.laboratoire.trim()) newErrors.laboratoire = "Laboratoire requis";
    if (!formData.expertise.trim()) newErrors.expertise = "Niveau d'expertise requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission: validate and proceed to next popup if valid
  const handleSubmit = () => {
    if (validateForm()) {
      nextPopUp2(); // This should navigate to InsEx3
    }
  };

  // Render the form only if car2 is true
  return (
    
          // Conditional rendering block
          car2 && 
        <div className="form-container-three">
            <div className="inscription-form-three">
              {/* Welcome and account message */}
              <div className="texts-three">
                <p className="bien-three">Bienvenue sur </p>
                <p className="athar-three">ATHAR</p>
                <p className="compte-three">
                  Vous avez déjà un compte ?
                  <span className="connexion-three" onClick={connexionPopUP}> Connectez vous.</span>
                </p>
              </div>

              {/* Form fields */}
              <form className="info-three">
                {/* Generate inputs dynamically for all four fields */}
                {["discipline", "etablissement", "laboratoire", "expertise"].map((field) => (
                  <div key={field} className="form-group-three">
                    <label className="label-three" htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input
                      className={`input-three ${errors[field] ? "input-error" : ""}`}
                      type="text"
                      id={field}
                      placeholder={field}
                      value={formData[field]}
                      onChange={handleChange}

                      // Highlight border on focus
                      onFocus={(e) => {
                        e.target.style.border = "1px solid #E8C07D"; 
                        e.target.style.outline = "0.5px solid #E8C07D"; 
                      }}

                      // Restore or remove border on blur depending on validation
                      onBlur={(e) => {
                        e.target.style.border = errors[field] ? "" : "1px solid #A0A5A6";
                        e.target.style.outline = "none"; 
                      }}
                    />
                    {/* Display error message below input */}
                    {errors[field] && <p className="err_message">{errors[field]}</p>}
                  </div>
                ))}
              </form>

              {/* Next step arrow (right) */}
              <div className="rr-three">
                <img src={arrRight} alt="rr" onClick={handleSubmit} />
              </div>

              {/* Previous step arrow (left) */}
              <div className="lr-three">
                <img src={arrLeft} alt="ll" onClick={prevPopUp} />
              </div>
            </div>
        </div>
    
        )  
}

// Export the component for external use
export default InsEx2;
