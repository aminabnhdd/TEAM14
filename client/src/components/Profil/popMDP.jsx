import "../../ComponentsStyles/popUps styles/Demande.css";
import imj from "../../assets/x.png";
import { useNavigate } from "react-router-dom";

function PopMDP({popUp,foncone}) {
    
    const navigate = useNavigate();
    function close (){
        foncone();
      

    }
    return (
        popUp && (
            <div className="main-background2 ">
            <div className="popUp2-main-message ">
                <div className="popUp2-main-div">
                    <p className="popUp2-h1-title">Mot de passe réinitialisé!</p>
                    <p className="popUp2-main-paragraph">
                        <p className="popUp2-paragraph">Votre mot de passe a été <span className="text-success">modifié avec succès.</span></p>
                    </p>
                </div>
                <img className="popUp2-close-button" src={imj} alt="xx" onClick={close} />
            </div>
            </div>
        )
    );
}

export default PopMDP