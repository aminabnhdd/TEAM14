
// display the main informations of a user in profile page


import "../../componentsStyles/ProfilStyles/ProfilInfosave.css";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import AuthContext from '../../helpers/AuthContext';


const DEFAULT_IMAGE_URL = "https://img.freepik.com/vecteurs-premium/icone-profil-utilisateur-dans-style-plat-illustration-vectorielle-avatar-membre-fond-isole-concept-entreprise-signe-autorisation-humaine_157943-15752.jpg?semt=ais_hybrid";

const ProfilInfosave = ({ usersData,setImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);

      const { authState,setAuthState } = useContext(AuthContext);

    const isExpert = authState.role === "Expert";
    const isAdmin = authState.role === "Admin";

  // change the profile picture
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const navigate = useNavigate();
  
  const handleRemoveImage = () => {
    setSelectedImage(null);
  };
  
  return usersData.map((user) => (
    <div key={user.id} className="user-container">
      <div className="user-details">
        <label htmlFor="imageUpload" className="user-image-label">
          <div className="user-avatar-box">
            <img src={selectedImage || user.pfp || DEFAULT_IMAGE_URL} alt="Avatar" className="user-avatar" />
            <Upload className="user-upload-icon" size={20} />
          </div>
        </label>
        {selectedImage && (
              <button
                className="remove-image-button"
                onClick={handleRemoveImage}
                type="button"
              >
                <X size={16} />
              </button>
            )}
        <input id="imageUpload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
        <div className="user-info">
          <span className="user-fullname">{user.nom || "Non renseigné"} {user.prenom || "Non renseigné"}</span>
          <span className="user-job-title capitalize">{(isAdmin ? 'admin' :((user.role== 'archeologie')?'archéologie':user.role))|| "Non renseigné"}</span>
        </div>
      </div>
      <a className="user-password-link cursor-pointer" onClick={() => navigate("/changer-mdp", { state: { oldPassword: user.password } })}>
        Modifier mon mot de passe</a>
    </div>
  ));
};

export default ProfilInfosave;


