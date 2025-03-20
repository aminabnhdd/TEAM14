import "../../ComponentsStyles/popUps styles/Demande.css";
import imj from "../../assets/x.png";

function Demande({popUp,foncone}) {
    

    return (
        popUp && (
            <div className="main-background2">
            <div className="popUp2-main-message">
                <div className="popUp2-main-div">
                    <p className="popUp2-h1-title">Demande de création de compte envoyée !</p>
                    <p className="popUp2-main-paragraph">
                        <p className="popUp2-paragraph">Votre demande de création de compte a été transmise à l’<span className="popUp2-admin">administrateur.</span></p>
                        <p className="popUp2-paragraph">Un <span className="popUp2-email">email de confirmation</span> vous sera envoyé dès que votre compte aura été approuvé.</p>
                        <p className="popUp2-paragraph">Merci de patienter et de <span className="popUp2-verification">vérifier</span> votre boîte de réception pour la suite.</p>
                    </p>
                </div>
                <img className="popUp2-close-button" src={imj} alt="xx" onClick={foncone} />
            </div>
            </div>
        )
    );
}

export default Demande;