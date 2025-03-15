import { useState } from "react";
import closeButton from "../assets/x.png";
import "../popUps styles/MdpOublie.css";

function MdpOublie({ carti, fun, fun2 }) {
    const [formData, setFormData] = useState({ email: "" });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Adresse email invalide";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            console.log("Lien de réinitialisation envoyé", formData);
            fun2();
        }
    };

    return (
        carti && (
            <div className="popUp4-inscription-form">
                <button className="popUp4-close-btn">
                    <img src={closeButton} alt="Close" onClick={fun} />
                </button>

                <div className="popUp4-texts">
                    <p className="popUp4-bien">Mot de passe oublié?</p>
                    <p className="popUp4-compte">Saisissez votre e-mail pour recevoir un lien de réinitialisation.</p>
                </div>

                <form className="popUp4-info">
                    <div className="popUp4-form-group">
                        <label className="popUp4-label" htmlFor="email">Adresse email</label>
                        <input 
                            className={`popUp4-input ${errors.email ? "input-error" : ""}`} 
                            type="email" 
                            id="email" 
                            placeholder="adresse email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            onFocus={(e) => { e.target.style.border = "1px solid #E8C07D"; e.target.style.outline = "0.5px solid #E8C07D"; }}
                            onBlur={(e) => { e.target.style.border = errors.email ? "" : "1px solid #A0A5A6"; e.target.style.outline = "none"; }}
                        />
                        {errors.email && <p className="err_message4">{errors.email}</p>}
                    </div>
                </form>
                <button className="popUp4-btn1" onClick={handleSubmit}>Envoyer le lien</button>
            </div>
        )
    );
}

export default MdpOublie;
