import React, { useState , useEffect  } from "react";
import { ImagePlus } from "lucide-react"; 
import "../../componentsStyles/CreateprojectStyles/ModifProjectImage.css";

const ModifProjectImageUploader = ({ onImageChange }) => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onImageChange(imageUrl);
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
          <img src={image} alt="Uploaded" className="uploaded-image" />
        ) : (
          <>
            <div className="upload-icon-container">
              <ImagePlus className="upload-icon" />
            </div>
            <p>Modifier l'image de votre projet</p>
          </>
        )}
      </label>
    </div>
  );
};

export default ModifProjectImageUploader;
