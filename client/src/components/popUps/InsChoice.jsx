import "../../ComponentsStyles/popUps styles/InsChoice.css";
import imej from "../../assets/x.png";
import { useState } from "react";

function InsChoice({onClickExpert,onClickVisiteur}) {
    const [popUp, setPopUp] = useState(true);

    function backLanding(e) {
        setPopUp(false);
        e.target.style.display = " none";
    }
    

    return (
        <>
            {popUp && (
                <div className="sah1">
                <div className="popUp3-main-container">
                    <div className="popUp3-main-div">
                        <div className="popUp3-titles">
                            <p className="popUp3-big-title">Inscription en tant que:</p>
                            <p className="popUp3-small-title">Voulez vous vous inscrire en tant qu’expert ou visiteur?</p>
                        </div>
                        <div className="popUp3-buttons">
                            <button className="popUp3-btn5" onClick={onClickExpert}>Expert</button>
                            <button className="popUp3-btn6" onClick={onClickVisiteur}>Visiteur</button>
                        </div>
                    </div>
                    <img className="popUp3-close-button" src={imej} alt="x" onClick={backLanding} />
                </div>
                </div>
            )}
        </>
    );
}

export default InsChoice;