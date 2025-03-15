
import "../Insctiptions styles/InsEx3.css";
import image2 from "../assets/Screenshot 2025-03-03 at 8.53.06 AM 2.png";

import arrLeft from "../assets/arrow-left-solid.svg";
import doc from "../assets/uil_file-upload-alt.png";

function InsEx3({prevPopUp2,car3,connexionPopUp,hideAll3,funct}) {
    
    

    return (
        hideAll3 && 
        (<div className="main-page-four">
           <div className="back-home">
            <img src={image2} className="backHome-logo-four" />
            <div className="pres">
            <p className="pre">ATHAR, une </p>
            <p className="pre">communauté dédiée au</p>
            <p className="pre">patrimoine algérien.</p>
          </div>
                              
                  </div>
            
            <div className="form-container-four">
                {car3 &&
                    <div className="inscription-form-four">
                        
                        <div className="texts-four">
                            <p className="bien-four">Bienvenue sur </p>
                            <p className="athar-four">ATHAR</p>
                            <p className="compte-four">
                                Vous avez déjà un compte ?
                                <span className="connexion-four" onClick={connexionPopUp}> Connectez vous.</span>
                            </p>
                        </div>
                        
                        <div className="documents-four">
                            <p className="documents">Documents</p>
                            <div className="documents-square-four">
                                <img src={doc} alt="imajj" className="circle" />
                                <div className="par">
                                    <p>Ajoutez un fichier pour </p> 
                                    <p> prouver votre domaine et</p>
                                    <p>niveau d’expertise</p>
                                </div>
                            </div>
                        </div>
                        <div className="footer-four">
                            <div className="lr-four">
                                <img src={arrLeft} alt="ll" onClick={prevPopUp2} />
                            </div>
                            <button className="cnct-btn" onClick={funct}>S'inscrire</button>
                        </div>
                    </div>
                }
            </div>
        </div>)
    );
}

export default InsEx3;