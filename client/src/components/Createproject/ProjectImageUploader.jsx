import React, { useState, useEffect } from "react";
import { ImagePlus, X } from "lucide-react";
import "../../componentsStyles/CreateProjectStyles/ProjectImageUploader.css";

const ProjectImageUploader = ({ onImageChange }) => {
  
  const handleRemoveImage = () => {
    setImage(null);
    onImageChange(null);

  };

  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onImageChange(file); 
    }
  };

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);
  

  return (
    <div className="project-image-uploader">
      <input
        type="file"
        accept="image/*"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
      <label htmlFor="fileInput" className="image-placeholder">
      {image ? (
  <>
    <img src={image} alt="Uploaded" className="uploaded-image" />
    <button type="button" className="remove-buttonPr" onClick={handleRemoveImage}>
      <X size={20} />
    </button>
  </>
  
  
) : (
          <>
            <div className="upload-icon-container">
              <ImagePlus className="upload-icon" />
            </div>
            <p className="Text-img">Ajoutez une image pour représenter votre projet</p>
          </>
        )}
      </label>
    </div>
  );
};

export default ProjectImageUploader;

/*
  Commentaires :
  1. Le composant utilise useState pour gérer l'image sélectionnée et afficher un aperçu.
  2. La fonction handleImageUpload :
     - Récupère le fichier sélectionné.
     - Génère une URL temporaire pour l'affichage de l'image.
     - Met à jour l'état local et informe le parent via onImageChange.
  3. useEffect est utilisé pour nettoyer l'URL temporaire lorsqu'une nouvelle image est chargée .

*/

