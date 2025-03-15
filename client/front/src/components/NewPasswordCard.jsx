import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const PasswordCard = () => {
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePasswords(e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validatePasswords(password, e.target.value);
  };

  const validatePasswords = (newPassword, newConfirmPassword) => {
    if (newPassword && newConfirmPassword && newPassword !== newConfirmPassword) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleSubmit = () => {
    if (!error && password && confirmPassword) {
      navigate("/profil-visiteur");
    }
  };

  return (
    <div className="password-card">
      <h3>Choisissez un nouveau mot de passe et confirmez-le pour sécuriser votre compte</h3>

      {/* Ancien mot de passe (sans erreur) */}
      <div className="password-field">
        <label>Ancien mot de passe :</label>
        <div className="input-container">
          <input type={showPassword.old ? "text" : "password"} className="input-default" />
          <button type="button" className="icon-btn" onClick={() => togglePasswordVisibility("old")}>
            {showPassword.old ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
      </div>

      {/* Nouveau mot de passe */}
      <div className="password-field">
        <label>Nouveau mot de passe :</label>
        <div className={`input-container ${error ? "error" : ""}`}>
          <input
            type={showPassword.new ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            className={error ? "error-text" : ""}
          />
          <button type="button" className="icon-btn" onClick={() => togglePasswordVisibility("new")}>
            {showPassword.new ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
      </div>

      {/* Confirmez le mot de passe */}
      <div className="password-field">
        <label>Confirmez le nouveau mot de passe :</label>
        <div className={`input-container ${error ? "error" : ""}`}>
          <input
            type={showPassword.confirm ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={error ? "error-text" : ""}
          />
          <button type="button" className="icon-btn" onClick={() => togglePasswordVisibility("confirm")}>
            {showPassword.confirm ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
      </div>

      {/* Message d'erreur */}
      {error && (
        <p className="error-message">
          Les mots de passe ne correspondent pas. Veuillez les saisir à nouveau.
        </p>
      )}

      <button className="change-btn" disabled={error || !password || !confirmPassword} onClick={handleSubmit}>
        Changer
      </button>
    </div>
  );
};

export default PasswordCard;






