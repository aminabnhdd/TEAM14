import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import "../../componentsStyles/ProfilStyles/PasswordCard.css";

export default function PasswordChange({ oldPassword }) {
  const [inputOldPassword, setInputOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === "old") setShowOldPassword(!showOldPassword);
    if (field === "new") setShowNewPassword(!showNewPassword);
    if (field === "confirm") setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = () => {
    if (inputOldPassword !== oldPassword) {
      setError("L'ancien mot de passe est incorrect. Veuillez le saisir à nouveau.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas. Veuillez les saisir à nouveau.");
      return;
    }
    setError("");
  };

  return (
    <div className="password-container">
      <h2 className="password-container-title">
        Choisissez un nouveau mot de passe et confirmez-le pour sécuriser votre compte.
      </h2>

      <div className="input-group-password">
        <label htmlFor="old-password">Ancien mot de passe</label>
        <div className="password-wrapper">
          <input
            id="old-password"
            type={showOldPassword ? "text" : "password"}
            value={inputOldPassword}
            onChange={(e) => setInputOldPassword(e.target.value)}
            className={`password-input ${error && inputOldPassword !== oldPassword ? "error" : ""}`}
          />
          <span className="eye-icon" onClick={() => togglePasswordVisibility("old")}>
            {showOldPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>

      <div className="input-group-password">
        <label htmlFor="new-password">Nouveau mot de passe</label>
        <div className="password-wrapper">
          <input
            id="new-password"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`password-input ${error && newPassword !== confirmPassword ? "error" : ""}`}
          />
          <span className="eye-icon" onClick={() => togglePasswordVisibility("new")}>
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>

      <div className="input-group-password">
        <label htmlFor="confirm-password">Confirmez le nouveau mot de passe</label>
        <div className="password-wrapper">
          <input
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`password-input ${error && newPassword !== confirmPassword ? "error" : ""}`}
          />
          <span className="eye-icon" onClick={() => togglePasswordVisibility("confirm")}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <button className="password-btn" onClick={handleChange}>Changer</button>
    </div>
  );
}


