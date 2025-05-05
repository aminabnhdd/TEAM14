import "../../ComponentsStyles/popUps styles/Demande.css";
import imj from "../../assets/x.png";
import { useNavigate } from "react-router-dom";

function AttendreMDP({popUp,foncone}) {
    
    const navigate = useNavigate();
    function close (){
        foncone();
        navigate('/')

    }
    return (
        popUp && (
            <div className="main-background2">
            <div className="popUp2-main-message">
                <div className="popUp2-main-div">
                    <p className="popUp2-h1-title">Demande de création de compte envoyée !</p>
                    <p className="popUp2-main-paragraph">
                        <p className="popUp2-paragraph">Un lien de réinitialisation a été envoyé à votre adresse e-mail. Veuillez <span className="popUp2-admin">vérifier </span>votre boîte de réception et suivre les instructions pour réinitialiser votre mot de passe.</p>
                    </p>
                </div>
                <img className="popUp2-close-button" src={imj} alt="xx" onClick={close} />
            </div>
            </div>
        )
    );
}

export default AttendreMDP;