import React, { useState } from "react";
import { ImagePlus } from "lucide-react"; 
import "../../componentsStyles/CreateProjectStyles/ProjectImageUploader.css";

const ProjectImageUploader = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

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
            <p>Ajoutez une image pour représenter votre projet</p>
          </>
        )}
      </label>
    </div>
  );
};

export default ProjectImageUploader;

