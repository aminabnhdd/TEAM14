import React from "react";
import "../../componentsStyles/ProfilStyles/NewProfilInfo.css";

const NewProfilInfo = ({ name, role, avatarUrl }) => {
  return (
    <div className="profil-info">

     <div className="div2">
         <div className="avatar">
        <img src={avatarUrl ? avatarUrl : "/default-avatar.png"} />
      </div>

      <div className="details">
        <h5 className="nom">{name ? name : <strong>Nom non disponible</strong>}</h5>
        <h5 class="role">{role ? role : <strong>Rôle non défini</strong>}</h5>
      </div>
     </div>
    </div>
  );
};

export default NewProfilInfo;