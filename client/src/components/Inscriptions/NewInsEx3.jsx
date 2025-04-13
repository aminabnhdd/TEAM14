import arrLeft from "../../assets/arrow-left-solid.svg";
import doc from "../../assets/uil_file-upload-alt.png";
import { useRef, useState } from "react";
import axios from "axios";
import ximg from "../../assets/x.png"
import Demande from "../popUps/Demande";
import "../../ComponentsStyles/Insctiptions styles/NewInsEx3.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function NewInsEx3({ prevPopUp2,swipeDirection }) {
    const navigate = useNavigate();


    const onX = () =>{
        setAppX(false)
        setPreview(null)
    }

  const goToConnexion = () => {
    navigate("/connexion");
  }
  
    const fileInputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [popDem, setPopDem] = useState(false);
    const [preview, setPreview] = useState(null); // Store file preview URL
    const [borderStyle, setBorderStyle] = useState("1px dashed #A0A5A6");
    const [appX,setAppX] = useState(false);
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        password: "",
        discipline: "",
        etablissement: "",
        labo: "",
        niveau: "",
        image: null
    });

    const handleFileChange = async (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);
        setBorderStyle("1px dashed #A0A5A6");

        if (selectedFiles.length > 0) {
            const file = selectedFiles[0];
            setAppX(true)
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
       
        
        const formData1 = JSON.parse(localStorage.getItem("formData1"));
        const formData2 =  JSON.parse(localStorage.getItem("formData2"));
        if (formData1 && formData2) {

           setFormData({...formData1, ...formData2,labo:formData2.laboratoire,niveau:formData2.expertise,image:selectedFiles[0] });
            
            localStorage.removeItem("formData1");
            localStorage.removeItem("formData2");    
        }
    };

    const handleSubmit = () => {
        if (files.length === 0) {
            setBorderStyle("1.6px dashed red");
            setErrorMessage("Veuillez ajouter un fichier.");

        } else {
            const data = new FormData();
            for (const key in formData) {
                if (formData[key] !== null) {
                    data.append(key, formData[key]);
                }
            }
            axios
            .post("http://localhost:3001/auth/signup/expert", data,{headers:{"Content-Type":"multipart/form-data"}})
            .then((res) => {
                console.log(res.data);
                setPopDem(true);
            })
            .catch((err) => {
                console.log(err);
            });
            
        }
    };
    const [errorMessage, setErrorMessage] = useState("");


    return (

        <motion.div
      className="inscription-form-four"
      initial={{ x: swipeDirection === "right" ? -100 : 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: swipeDirection === "left" ? 100 : -100, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
        
            <div className="texts-four">
                <p className="bien-four">Bienvenue sur </p>
                <p className="athar-four">ATHAR</p>
                <p className="compte-four">
                    Vous avez déjà un compte ? <span className="connexion-four" onClick={goToConnexion}>Connectez vous.</span>
                </p>
            </div>
            <div className="documents-four">
                <p className="documents">Documents <span className="redstar">*</span></p>
                <div 
                    className="documents-square-four" 
                    onClick={handleClick} 
                    style={{ 
                        border: borderStyle,
                        padding: "20px", 
                        cursor: "pointer", 
                        borderRadius: "10px", 
                        textAlign: "center",
                        backgroundImage: preview ? `url(${preview})` : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        height: "200px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                    }}
                >
                    {appX && <img onClick={onX} className="xi" src={ximg} alt="x" style={{position:"absolute",width:"23px",top:"6px",right:"6px",cursor:"pointer",zIndex:"100"}} />}
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
                {errorMessage && (
        <p  className="erri">
            {errorMessage}
        </p>
    )}
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
        
        </motion.div>
    );
}

export default NewInsEx3