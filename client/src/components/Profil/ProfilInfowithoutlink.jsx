// display the main informations of a user in profile page

import "../../componentsStyles/ProfilStyles/ProfilInfowithoutlink.css";
import { useState, useEffect, useContext } from "react";
import AuthContext from '../../helpers/AuthContext';


const DEFAULT_IMAGE_URL = "https://img.freepik.com/vecteurs-premium/icone-profil-utilisateur-dans-style-plat-illustration-vectorielle-avatar-membre-fond-isole-concept-entreprise-signe-autorisation-humaine_157943-15752.jpg?semt=ais_hybrid"

const ProfilInfonolink = ({ usersData }) => {

    const { authState,setAuthState } = useContext(AuthContext);

    const isExpert = authState.role === "Expert";
    const isAdmin = authState.role === "Admin";


  return usersData.map((user) => (
    <div key={user._id} className="profil-card">
      {/* Avatar + Infos */}
      <div className="profil-details">
        <img src={user.pfp || DEFAULT_IMAGE_URL} alt="Avatar" className="avatar" />
        <div className="profil-info">
          <span className="profil-name">{user.nom || "Non renseigné"} {user.prenom || "Non renseigné"}</span>
          <span className="profil-job capitalize">{(isAdmin ? 'admin' :((user.role== 'archeologie')?'archéologie':user.role))|| "Non renseigné"}</span>
        </div>
      </div>
    </div>
  ));
};

export default ProfilInfonolink;