import closeButton from "../assets/x.png";
import { useState } from "react";
import "../popUps styles/ReiniMdp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function ReiniMdp() {
    const [popUp, setPopUp] = useState(true);
    const [visible, setVisible] = useState(false);
    const [typo, setTypo] = useState("password");
    const [visible2, setVisible2] = useState(false);
    const [typo2, setTypo2] = useState("password");

    function backLanding(e) {
        setPopUp(false);
        e.target.style.display = " none";
    }

    const TogglePass = () => {
        setVisible(!visible);
        setTypo(typo === "password" ? "text" : "password");
    };

    const TogglePass2 = () => {
        setVisible2(!visible2);
        setTypo2(typo2 === "password" ? "text" : "password");
    };

    return (
        <div className="popUp5-main-page">

            <div className="popUp5-form-container">
                {popUp && (
                    <div className="popUp5-inscription-form">
                        <button className="popUp5-close-btn">
                            <img src={closeButton} alt="Close" onClick={backLanding} />
                        </button>

                        <div className="popUp5-texts">
                            <p className="popUp5-bien">Réinitialisez votre mot de passe</p>
                            <p className="popUp5-compte">Choisissez un nouveau mot de passe</p>
                            <p className="popUp5-compte">et confirmez-le pour sécuriser votre compte.</p>
                        </div>

                        <form className="popUp5-info">
                            <div className="popUp5-form-group">
                                <label className="popUp5-label" htmlFor="password">Mot de passe</label>
                                <input
                                    className="popUp5-input eye-pass"
                                    type={typo}
                                    id="password"
                                    placeholder="mot de passe"
                                />
                                <div className="popUp5-eye1">
                                    <FontAwesomeIcon
                                        icon={visible ? faEyeSlash : faEye}
                                        onClick={TogglePass}
                                    />
                                </div>
                            </div>
                            <div className="popUp5-form-group">
                                <label className="popUp5-label" htmlFor="password2">Confirmer le mot de passe</label>
                                <input
                                    className="popUp5-input eye-pass"
                                    type={typo2}
                                    id="password2"
                                    placeholder="mot de passe"
                                />
                                <div className="popUp5-eye2">
                                    <FontAwesomeIcon
                                        icon={visible2 ? faEyeSlash : faEye}
                                        onClick={TogglePass2}
                                    />
                                </div>
                            </div>
                        </form>
                        <button className="popUp5-btn1">Réinitialiser</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReiniMdp;