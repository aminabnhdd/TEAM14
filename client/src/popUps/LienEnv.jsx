import "../popUps styles/LienEnv.css";
import imj from "../assets/x.png";

function LienEnv({popUp,foncone}) {
    

    return (
        popUp && (
         <div className="main-background">
            <div className="popUp2-main-message">
                <div className="popUp2-main-div">
                    <p className="popUp2-h1-title">Lien de réinitialisation envoyé !</p>
                    <p className="popUp2-main-paragraph">
                        <p className="popUp2-paragraph">Un lien de réinitialisation a été envoyé à votre adresse e-mail. Veuillez <span className="popUp2-verification2">vérifier</span> votre </p>
                        <p className="popUp2-paragraph">boîte de réception et suivre les instructions pour réinitialiser votre mot de passe.</p>
                    </p>
                </div>
                <img className="popUp2-close-button" src={imj} alt="xx" onClick={foncone} />
            </div>
            </div>   
        )
    );
}

export default LienEnv;