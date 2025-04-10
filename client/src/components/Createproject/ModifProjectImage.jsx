import React, { useState, useEffect,useContext } from "react";
import { ImagePlus } from "lucide-react"; 
import "../../componentsStyles/CreateprojectStyles/ModifProjectImage.css";
import { FetchProjectData } from "../../services/FetchProjectData.js";
import AuthContext from '../../helpers/AuthContext'
import RefreshService from "../../services/RefreshService";

const ModifProjectImageUploader = ({ onImageChange }) => {
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const {authState,setAuthState} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try{
      const response1= await  RefreshService.Refresh();
      setAuthState({email:response1.email,role:response1.role,accessToken:response1.accessToken})
      console.log("the token: ",response1.accessToken)
      console.log("here does ths work");
      const projetid= "67eeb88c363b0902863ad350";
      const data = await FetchProjectData(projetid,response1.accessToken);
      if (data && data.photoUrl) {
        setImage(data.photoUrl); 
      }
    } catch (err) {
      console.error("Erreur lors updating du projet :", err);
    }  finally {
      setIsLoading(false); // Stop loading when fetch is done (success or error)
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
  if (isLoading) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }
  
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