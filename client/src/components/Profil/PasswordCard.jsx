import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../../componentsStyles/ProfilStyles/PasswordCard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PasswordChange() {
  const [inputOldPassword, setInputOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authState, setAuthState] = useState({email:"",role:"",accessToken:""});
  const navigate = useNavigate();

  const togglePasswordVisibility = (field) => {
    if (field === "old") setShowOldPassword(!showOldPassword);
    if (field === "new") setShowNewPassword(!showNewPassword);
    if (field === "confirm") setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = () => {
    if (newPassword !== confirmPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas. Veuillez les saisir à nouveau.");
      return;
    }
    axios.get('http://localhost:3001/refresh', { withCredentials: true })
      .then((response) => {
        if (response.data.error) return navigate('/connexion');
        setAuthState({email:response.data.email,role:response.data.role,accessToken:response.data.accessToken});
        axios.put('http://localhost:3001/profil/mon-compte/changer-mdp', {
          oldmdp: inputOldPassword,newmdp: newPassword, new2mdp: confirmPassword
        }, {headers: { Authorization: `Bearer ${response.data.accessToken}` }})
          .then((response) => {
            setInputOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
          })
          .catch((error) => {
            if (error.response) {
              setError(error.response.data.message);
            }
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
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
            {showOldPassword ? <FiEyeOff /> : <FiEye />}
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
            {showNewPassword ? <FiEyeOff /> : <FiEye />}
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
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <button className="password-btn" onClick={handleChange}>Changer</button>
    </div>
  );
}


