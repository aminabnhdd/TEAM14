
// popup to enter a new password


import { useState } from "react";
import "../../componentsStyles/popUps styles/ReiniMdp.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AttendreMDP from "./AttendreMDP";

function ReiniMdp({otl}) {
    const [visible, setVisible] = useState(false);
    const [popup,setPopup] = useState(false);
    const [typo, setTypo] = useState("password");
    const [visible2, setVisible2] = useState(false);
    const [typo2, setTypo2] = useState("password");
    const [formData, setFormData] = useState({
        password: "",
        password2: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // make the password visible
    const TogglePass = () => {
        setVisible(!visible);
        setTypo(typo === "password" ? "text" : "password");
    };

    const TogglePass2 = () => {
        setVisible2(!visible2);
        setTypo2(typo2 === "password" ? "text" : "password");
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // check for erros
    const validateForm = () => {
        let newErrors = {};

        if (formData.password.length < 6) {
            newErrors.password = "Mot de passe doit contenir plus de 6 caractères";
        }

        if (!formData.password2.trim()) {
            newErrors.password2 = "Mot de passe invalide";
        } else if (formData.password !== formData.password2) {
            newErrors.password2 = "Ne correspond pas au mot de passe choisi";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    // submit the new password
    const handleSubmit = () => {
        if (validateForm()) {
            axios.post(`http://localhost:3001/auth/pwd-forgotten/change-pwd/${otl}`, { password: formData.password })
            .then((response) => {
                setPopup(true);
            })
            .catch((error) => {
                console.log(error);
                alert("Erreur lors de la réinitialisation du mot de passe, si elle persiste veuillez recommencer le processus");
            });
        }
    };

    return (
        <>
        <div className="popUp5-inscription-form">
            <div className="popUp5-texts">
                <p className="popUp5-bien">Réinitialisez votre mot de passe</p>
                <p className="popUp5-compte">Choisissez un nouveau mot de passe</p>
                <p className="popUp5-compte">et confirmez-le pour sécuriser votre compte.</p>
            </div>

            <form className="popUp5-info">
                <div className="popUp5-form-group">
                    <label className="popUp5-label" htmlFor="password">Mot de passe</label>
                    {/* new password */}
                    <input
                        className={`popUp5-input eye-pass ${errors.password ? "input-error" : ""}`}
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
                    {errors.password && <p className="err_message4">{errors.password}</p>}
                    <div className="popUp5-eye1" onClick={TogglePass}>
                        {visible ? <FiEyeOff /> : <FiEye />}
                    </div>
                </div>
                <div className="popUp5-form-group">
                    <label className="popUp5-label" htmlFor="password2">Confirmer le mot de passe</label>
                   {/* confirm new password */}

                    <input
                        className={`popUp5-input eye-pass ${errors.password2 ? "input-error" : ""}`}
                        type={typo2}
                        id="password2"
                        placeholder="mot de passe"
                        value={formData.password2}
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
                    {errors.password2 && <p className="err_message4">{errors.password2}</p>}
                    <div className="popUp5-eye2" onClick={TogglePass2}>
                        {visible2 ? <FiEyeOff /> : <FiEye />}
                    </div>
                </div>
            </form>
            <button className="popUp5-btn1" onClick={handleSubmit}>Réinitialiser</button>
        </div>
             { popup && <AttendreMDP popUp={popup} foncone={() => {setPopup(false); navigate('/connexion'); }}/>} </>
    );
}

export default ReiniMdp;