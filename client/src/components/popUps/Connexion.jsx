import { useState } from "react";
import "../../ComponentsStyles/popUps styles/Connexion.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Connect({   mdpPopUp }) {
    const [visible, setVisible] = useState(false);
    const [typo, setTypo] = useState("password");
    const [formData, setFormData] = useState({ email: "", password: "" });
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
            console.log("Connexion réussie", formData);
        }
    };

    return  (
        <div className="popUp1-inscription-form">
            <div className="popUp1-texts">
                <p className="popUp1-bien">Heureux de vous revoir !</p>
                <p className="popUp1-compte">
                    Vous n'avez pas de compte ?
                    <span className="popUp1-connexion"> Inscrivez-vous.</span>
                </p>
            </div>

            <form className="popUp1-info">
                <div className="popUp1-form-group">
                    <label className="popUp1-label" htmlFor="email">Adresse email</label>
                    <input className={`popUp1-input ${errors.email ? "input-error" : ""}`} 
                        type="email" 
                        id="email" 
                        placeholder="adresse email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        onFocus={(e) => { e.target.style.border = "1px solid #E8C07D"; e.target.style.outline = "0.5px solid #E8C07D"; }} 
                        onBlur={(e) => { e.target.style.border = errors.email ? "" : "1px solid #A0A5A6"; e.target.style.outline = "none"; }}
                    />
                    {errors.email && <p className="err_message3">{errors.email}</p>}
                </div>

                <div className="popUp1-form-group">
                    <label className="popUp1-label" htmlFor="password">Mot de passe</label>
                    <div className="popUp1-eye" onClick={TogglePass}>
                    {visible ? <FiEyeOff /> : <FiEye />}
                    </div>
                    <input className={`popUp1-input eye-pass ${errors.password ? "input-error" : ""}`} 
                        type={typo} 
                        id="password" 
                        placeholder="mot de passe" 
                        value={formData.password} 
                        onChange={handleChange} 
                        onFocus={(e) => { e.target.style.border = "1px solid #E8C07D"; e.target.style.outline = "0.5px solid #E8C07D"; }} 
                        onBlur={(e) => { e.target.style.border = errors.password ? "" : "1px solid #A0A5A6"; e.target.style.outline = "none"; }}
                    />
                    
                    {errors.password && <p className="err_message3">{errors.password}</p>}
                    <p className="popUp1-mdp-oublie" onClick={mdpPopUp}>Mot de passe oublié ?</p>
                </div>
            </form>
            <button className="popUp1-btn1" onClick={handleSubmit}>Se connecter</button>
        </div>
    ) 
}

export default Connect;
