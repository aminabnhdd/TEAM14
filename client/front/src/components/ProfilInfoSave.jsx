import React, { useState } from "react"; 
import { FiUploadCloud } from "react-icons/fi";
import { Link } from "react-router-dom"; 

const ProfilInfoSave = ({ name, role, avatarUrl }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(avatarUrl);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedAvatar(imageUrl);
    }
  };

  return (
    <div className="profil-info">
      <div className="div2">
        <div className="avatar">
          <label htmlFor="avatarInput" className="upload-label">
            {selectedAvatar ? (
              <img src={selectedAvatar}  />
            ) : (
              <div className="upload-placeholder">
                <FiUploadCloud className="upload-icon" />
              </div>
            )}
          </label>
          <input
            type="file"
            id="avatarInput"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </div>

        <div className="details">
          <h5 className="nom">{name ? name : <strong>Nom non disponible</strong>}</h5>
          <h5 className="role">{role ? role : <strong>Rôle non défini</strong>}</h5>
        </div>
      </div>

      {/* Utilisation de Link pour éviter le rechargement de la page */}
      <Link to="/mot-de-passe" className="change-password">
        Modifier mon mot de passe
      </Link>
    </div>
  );
};

export default ProfilInfoSave;


