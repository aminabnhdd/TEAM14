import React, { useState , useEffect  } from "react";
import { ImagePlus, X } from "lucide-react";
import "../../componentsStyles/CreateprojectStyles/ModifProjectImage.css";

const ModifProjectImageUploader = ({ photoUrl ,onImageChange }) => {
  
  const handleRemoveImage = () => {
    setImage(null);
    onImageChange(null);
  };

  const [image, setImage] = useState(photoUrl || null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onImageChange(imageUrl);
    }
  };

  useEffect(() => {
    if (photoUrl) {
      setImage(photoUrl);
    }
  }, [photoUrl]);

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
    <button type="button" className="remove-buttonMd" onClick={handleRemoveImage}>
      <X size={20} />
    </button>
  </>
) : (
          <>
            <div className="upload-icon-container">
              <ImagePlus className="upload-icon" />
            </div>
            <p className="Text-img">Modifier l'image de votre projet</p>
          </>
        )}
      </label>
    </div>
  );
};

export default ModifProjectImageUploader;
