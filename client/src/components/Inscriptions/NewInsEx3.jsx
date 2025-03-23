import arrLeft from "../../assets/arrow-left-solid.svg";
import doc from "../../assets/uil_file-upload-alt.png";
import { useRef, useState } from "react";
import axios from "axios";
import Demande from "../popUps/Demande";
import "../../ComponentsStyles/Insctiptions styles/NewInsEx3.css";

function NewInsEx3({ prevPopUp2, connexionPopUp }) {
    const fileInputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [popDem, setPopDem] = useState(false);
    const [preview, setPreview] = useState(null); // Store file preview URL
    const [borderColor, setBorderColor] = useState("#A0A5A6"); // Default border color

    const handleFileChange = async (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);
        setBorderColor("#A0A5A6"); // Reset border to default

        // Set preview image if it's an image file
        if (selectedFiles.length > 0) {
            const file = selectedFiles[0];
            if (file.type.startsWith("image/")) {
                setPreview(URL.createObjectURL(file));
            }
        }

        await uploadFiles(selectedFiles);
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const uploadFiles = async (selectedFiles) => {
        if (selectedFiles.length === 0) return;
       
        
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
        
      
    };

    const handleSubmit = () => {
        if (files.length === 0) {

            setBorderColor("red"); // Set border to red if no file is uploaded
        } else {
            setPopDem(true);
        }
    };

    return (
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
                <p className="documents">Documents <span className="redstar">*</span></p>
                <div 
                    className="documents-square-four" 
                    onClick={handleClick} 
                    style={{ 
                        border: `1px dashed ${borderColor}`, 
                        padding: "20px", 
                        cursor: "pointer", 
                        borderRadius: "10px", 
                        textAlign: "center",
                        backgroundImage: preview ? `url(${preview})` : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        height: "200px", // Fixed height
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                    }}
                >
                    {!preview && (
                        <>
                            <img src={doc} alt="Upload" className="circle" style={{ width: "19%", height: "31%" }} />
                            <div className="par" style={{ marginTop: "10px", color: "#555" }}>
                                <p>Ajoutez un fichier</p>
                                <p>Cliquez ici pour sélectionner</p> 
                                <p>un fichier.</p>
                            </div>
                        </>
                    )}
                </div>
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
            </div>
            <div className="footer-four">
                <div className="lr-four">
                    <img src={arrLeft} alt="ll" onClick={prevPopUp2} />
                </div>
                <button className="cnct-btn" onClick={handleSubmit}>S'inscrire</button>
            </div>
            {<Demande popUp={popDem} foncone={() => setPopDem(false)} />}
        </div>
    );
}

export default NewInsEx3;
