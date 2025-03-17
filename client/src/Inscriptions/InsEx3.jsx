import "../Insctiptions styles/InsEx3.css";
import image2 from "../assets/Screenshot 2025-03-03 at 8.53.06 AM 2.png";

import arrLeft from "../assets/arrow-left-solid.svg";
import doc from "../assets/uil_file-upload-alt.png";
import { useRef, useState } from "react";
import axios from "axios";

function InsEx3({ prevPopUp2, car3, connexionPopUp, hideAll3, funct }) {
    const fileInputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleFileChange = async (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);
        setErrorMessage(""); // Clear error when a file is selected
        await uploadFiles(selectedFiles);
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const uploadFiles = async (selectedFiles) => {
        if (selectedFiles.length === 0) return;
        setUploading(true);
        
        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append("files", file);
        });

        try {
            const response = await axios.post("/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Upload successful:", response.data);
        } catch (error) {
            console.error("Upload failed:", error);
        }
        
        setUploading(false);
    };

    const handleSubmit = () => {
        if (files.length === 0) {
            setErrorMessage("Aucun fichier n'a été téléchargé");
        } else {
            funct();
        }
    };

    return (
        hideAll3 && (
            <div className="main-page-four">
                <div className="back-home">
                    <img src={image2} className="backHome-logo-four" />
                    <div className="pres">
                        <p className="pre">ATHAR, une </p>
                        <p className="pre">communauté dédiée au</p>
                        <p className="pre">patrimoine algérien.</p>
                    </div>
                </div>
                <div className="form-container-four">
                    {car3 && (
                        <div className="inscription-form-four">
                            <div className="texts-four">
                                <p className="bien-four">Bienvenue sur </p>
                                <p className="athar-four">ATHAR</p>
                                <p className="compte-four">
                                    Vous avez déjà un compte ?
                                    <span className="connexion-four" onClick={connexionPopUp}> Connectez vous.</span>
                                </p>
                            </div>
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
                                <input
                                    type="file"
                                    multiple
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
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

export default InsEx3;