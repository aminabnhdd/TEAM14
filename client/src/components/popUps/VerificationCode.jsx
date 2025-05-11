
import React, { useState } from "react";
import "../../componentsStyles/Insctiptions styles/VerificationCode.css";
import closeIcon from "../../assets/x.png"; 




function VerificationCode({ popUp, onClose, email, onVerify }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!code || code.length !== 6) {
      setError("Veuillez entrer un code valide de 6 chiffres");
      return;
    }

    setIsLoading(true);
    try {
      await onVerify(code);
    } catch (err) {
      setError(err.message || "Une erreur s'est produite");
    } finally {
      setIsLoading(false);
    }
  };

  if (!popUp) return null;

  return (
    <div className="verification-popup">
      <div className="verification-content">
        <button className="verification-close-btn" onClick={onClose}>
        <img src={closeIcon} alt="Close" />
        </button>
        
        <h2 className="verification-title">Vérification par email</h2>
        <p className="verification-subtitle">Nous avons envoyé un code de vérification à <span className="verification-email">{email}</span></p>
        
        <form onSubmit={handleSubmit} className="verification-form">
          <div className="verification-input-group">
            <input
              className="verification-input"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Entrez le code à 6 chiffres"
              maxLength={6}
            />
            {error && <p className="verification-error">{error}</p>}
          </div>
          
          <div className="verification-buttons">
            <button 
              type="submit" 
              className="verification-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? "Vérification..." : "Vérifier"}
            </button>
          </div>
        </form>
        
        <p className="verification-resend">
          Vous n'avez pas reçu de code ?{" "}
          <button className="verification-resend-btn">Renvoyer le code</button>
        </p>
      </div>
    </div>
  );
}

export default VerificationCode;