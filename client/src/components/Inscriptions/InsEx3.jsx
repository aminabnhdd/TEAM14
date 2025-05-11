// Import CSS and required assets
import "../../componentsStyles/Insctiptions styles/InsEx3.css";
import image2 from "../../assets/Screenshot 2025-03-03 at 8.53.06 AM 2.png";

import arrLeft from "../../assets/arrow-left-solid.svg";
import doc from "../../assets/uil_file-upload-alt.png";

// Import React and hooks
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

// Component InsEx3 definition with props to control navigation and visibility
function InsEx3({ prevPopUp2, car3, connexionPopUp, hideAll3, funct }) {
    // Ref for the hidden file input
    const fileInputRef = useRef(null);
    
    // State to store selected files, uploading status, and error messages
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Hook to navigate programmatically
    const navigate = useNavigate();

    // Redirect to home on logo click
    const handleClick2 = () => {
      navigate('/');
    };

    // Handle file selection
    const handleFileChange = async (event) => {
        const selectedFiles = Array.from(event.target.files); // Convert FileList to array
        setFiles(selectedFiles); // Save selected files to state
        setErrorMessage(""); // Clear any previous error message
        await uploadFiles(selectedFiles); // Trigger upload
    };

    // Trigger click on hidden file input
    const handleClick = () => {
        fileInputRef.current.click();
    };

    // Upload selected files to backend
    const uploadFiles = async (selectedFiles) => {
        if (selectedFiles.length === 0) return; // Skip if no files selected
        setUploading(true); // Set uploading flag
        
        const formData = new FormData(); // Prepare multipart form data
        selectedFiles.forEach((file) => {
            formData.append("files", file); // Append each file
        });

        try {
            // Send POST request to upload endpoint
            const response = await axios.post("/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Upload successful:", response.data); // Log success
        } catch (error) {
            console.error("Upload failed:", error); // Log failure
        }
        
        setUploading(false); // Reset uploading flag
    };

    // Handle form submission
    const handleSubmit = () => {
        if (files.length === 0) {
            setErrorMessage("Aucun fichier n'a été téléchargé"); // Show error if no files
        } else {
            funct(); // Proceed if at least one file is uploaded
        }
    };

    // Component UI rendering block (only when hideAll3 is true)
    return (
        hideAll3 && (
            <div className="main-page-four">
                {/* Header with logo and introduction text */}
                <div className="back-home">
                    <img src={image2} className="backHome-logo-four" onClick={handleClick2}/>
                    <div className="pres4">
                        <p className="pre">ATHAR, une </p>
                        <p className="pre">communauté dédiée au</p>
                        <p className="pre">patrimoine algérien.</p>
                    </div>
                </div>

                {/* Form container */}
                <div className="form-container-four">
                    {car3 && (
                        <div className="inscription-form-four">
                            {/* Welcome and login redirection */}
                            <div className="texts-four">
                                <p className="bien-four">Bienvenue sur </p>
                                <p className="athar-four">ATHAR</p>
                                <p className="compte-four">
                                    Vous avez déjà un compte ?
                                    <span className="connexion-four" onClick={connexionPopUp}> Connectez vous.</span>
                                </p>
                            </div>

                            {/* File upload section */}
                            <div className="documents-four">
                                <p className="documents">Documents</p>
                                <div className="documents-square-four" onClick={handleClick} style={{ border: "1px dashed #A0A5A6", padding: "20px", cursor: "pointer", borderRadius: "10px", textAlign: "center" }}>
                                    <img src={doc} alt="Upload" className="circle" style={{ width: "50px", height: "50px" }} />
                                    <div className="par" style={{ marginTop: "10px", color: "#555" }}>
                                        <p>Ajoutez un fichier</p>
                                        <p>Cliquez ici pour sélectionner</p> 
                                        <p>un fichier.</p>
                                    </div>
                                </div>

                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    multiple
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />

                                {/* Upload status or errors */}
                                {uploading && <p style={{ color: "#C57642" }}>Uploading...</p>}
                                {files.length > 0 && (
                                    <div className="file-list" style={{ marginTop: "10px", color: "#333" }}>
                                        {files.map((file, index) => (
                                            <p key={index}>{file.name}</p>
                                        ))}
                                    </div>
                                )}
                                {errorMessage && <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>}
                            </div>

                            {/* Footer: navigation arrows and submit button */}
                            <div className="footer-four">
                                <div className="lr-four">
                                    <img src={arrLeft} alt="ll" onClick={prevPopUp2} />
                                </div>
                                <button className="cnct-btn" onClick={handleSubmit}>S'inscrire</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    );
}

// Export the component
export default InsEx3;
