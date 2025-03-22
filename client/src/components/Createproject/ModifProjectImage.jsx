import React, { useState, useEffect } from "react";
import { ImagePlus } from "lucide-react"; 
import "../../componentsStyles/CreateprojectStyles/ModifProjectImage.css";
import { FetchProjectData } from "../../services/FetchProjectData.js";

const ModifProjectImageUploader = ({ onImageChange }) => {
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchProjectData();
      if (data && data.photoUrl) {
        setImage(data.photoUrl); 
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(image);
    };
  }, [file]);

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setImage(imageUrl);
      setFile(selectedFile);
      onImageChange(selectedFile); 
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
            <p className="Text-img">Modifier l'image de votre projet</p>
          </>
        )}
      </label>
    </div>
  );
};

export default ModifProjectImageUploader;