import arrLeft from "../../assets/arrow-left-solid.svg";
import doc from "../../assets/uil_file-upload-alt.png";
import { useRef, useState } from "react";
import axios from "axios";
import ximg from "../../assets/x.png"
import Demande from "../popUps/Demande";
import "../../ComponentsStyles/Insctiptions styles/NewInsEx3.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import VerificationCode from "../popUps/VerificationCode";

function NewInsEx3({ prevPopUp2,swipeDirection }) {
    const navigate = useNavigate();

    const [showVerification, setShowVerification] = useState(false);
    const [emailExist, setEmailExist] = useState(false);
    const onX = () =>{
        setAppX(false)
        setPreview(null)
        navigate("/");
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


    const openFile = () => {
        const file = files[0];
        const blobURL = URL.createObjectURL(file);

        const link = document.createElement('a');
        link.href = blobURL;
        link.download = file.name; // keeps the original filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Optional: revoke the blob URL to free memory
        URL.revokeObjectURL(blobURL);
        }

    const handleRemoveFile = (event) => {
        event.stopPropagation();
        setFiles([]);
        setPreview(null);
        setAppX(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async () => {
          try {
            const response = await axios.post("http://localhost:3001/auth/send-verification-code", {
              email: formData.email,
              data: formData
            });
            
            if (response.data.success) {
              setShowVerification(true);
            }
          } catch (err) {
            if (err.response && err.response.data.error === 'email already taken') {
              setEmailExist(true);
            } else {
              console.error(err);
              alert("Erreur lors de l'envoi du code de vérification");
            }
          }
      };

      const handleVerify = async (code) => {
        try {
          const response = await axios.post("http://localhost:3001/auth/verify-code", {
            email: formData.email,
            code: code,
          });
      
          if (response.data === "Code right") {
            if (files.length === 0) {
              setBorderStyle("1.6px dashed red");
              setErrorMessage("Veuillez ajouter un fichier.");
            } else {
              const data = new FormData();
      
              // Append form data
              for (const key in formData) {
                if (formData[key] !== null) {
                  data.append(key, formData[key]);
                }
              }
      
      
              try {
                const res = await axios.post(
                  "http://localhost:3001/auth/signup/expert",
                  data,
                  {
                    headers: { "Content-Type": "multipart/form-data" },
                  }
                );
                console.log(res.data);
                setShowVerification(false);
                setPopDem(true);
              } catch (uploadError) {
                console.error(uploadError);
                alert("Erreur lors de l'inscription");
              }
            }
          }
        } catch (err) {
          throw new Error(err.response?.data?.error || "Code incorrect ou expiré");
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
                <p className="documents">Document pour prouver l'expertise<span className="redstar">*</span></p>
                 {/* File Upload Area */}
                {(files.length==0) ? (
                    <div 
                        className="documents-square-four" 
                        onClick={handleClick}
                        style={{ border: borderStyle }}
                    >
                        <img src={doc} alt="Upload" className="circle" />
                        <div className="par">
                            <p>Ajoutez un fichier</p>
                            <p>Cliquez ici pour sélectionner</p>
                            <p>un fichier.</p>
                        </div>
                    </div>
                ) : (
 <div className="file-info-container" onClick={openFile}>                        <div className="flex items-center justify-between p-2">
                            <div className="truncate w-4/5">
                                <p className="text-sm truncate">{files[0].name}</p>
                                <p className="text-xs text-gray-400">{Math.round(files[0].size / 1024)} KB</p>
                            </div>
                            <button 
                                onClick={handleRemoveFile}
                                className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                            >
                                <img src={ximg} alt="Remove" className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
                {errorMessage && (
        <p  className="erri">
            {errorMessage}
        </p>
    )}
                <input
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf"
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
            <VerificationCode 
              popUp={showVerification} 
              onClose={() => setShowVerification(false)}
              email={formData.email}
              onVerify={handleVerify}
            />

            {<Demande popUp={popDem} foncone={() => setPopDem(false)} />}
        
        </motion.div>
    );
}

export default NewInsEx3



// import arrLeft from "../../assets/arrow-left-solid.svg";
// import doc from "../../assets/uil_file-upload-alt.png";
// import { useRef, useState } from "react";
// import axios from "axios";
// import ximg from "../../assets/x.png";
// import Demande from "../popUps/Demande"; 
// import "../../ComponentsStyles/Insctiptions styles/NewInsEx3.css";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// function NewInsEx3({ prevPopUp2, swipeDirection }) {
//     const navigate = useNavigate();
//     const fileInputRef = useRef(null);
    
//     // State management
//     const [file, setFile] = useState(null);
//     const [popDem, setPopDem] = useState(false);
//     const [borderStyle, setBorderStyle] = useState("1px dashed #A0A5A6");
//     const [errorMessage, setErrorMessage] = useState("");
//     const [formData, setFormData] = useState({
//         nom: "",
//         prenom: "",
//         email: "",
//         telephone: "",
//         password: "",
//         discipline: "",
//         etablissement: "",
//         labo: "",
//         niveau: "",
//         image: null
//     });

//     const handleRemoveFile = () => {
//         setFile(null);
//         if (fileInputRef.current) fileInputRef.current.value = "";
//     };

//     const goToConnexion = () => navigate("/connexion");
  
//     const handleFileChange = (event) => {
//         const selectedFile = event.target.files[0];
//         if (!selectedFile) return;

//         setFile(selectedFile);
//         setBorderStyle("1px dashed #A0A5A6");
//         setErrorMessage("");

//         // Update form data
//         const formData1 = JSON.parse(localStorage.getItem("formData1")) || {};
//         const formData2 = JSON.parse(localStorage.getItem("formData2")) || {};
        
//         setFormData({
//             ...formData1,
//             ...formData2,
//             labo: formData2.laboratoire,
//             niveau: formData2.expertise,
//             image: selectedFile
//         });
//     };

//     const handleSubmit = async () => {
//         if (!file) {
//             setBorderStyle("1.6px dashed red");
//             setErrorMessage("Veuillez ajouter un fichier.");
//             return;
//         }

//         try {
//             const data = new FormData();
//             for (const key in formData) {
//                 if (formData[key] !== null) {
//                     data.append(key, formData[key]);
//                 }
//             }

//             await axios.post("http://localhost:3001/auth/signup/expert", data, {
//                 headers: { "Content-Type": "multipart/form-data" }
//             });

//             localStorage.removeItem("formData1");
//             localStorage.removeItem("formData2");
//             setPopDem(true);
//         } catch (err) {
//             console.error("Registration error:", err);
//             setErrorMessage("Une erreur est survenue lors de l'inscription.");
//         }
//     };

//     return (
//         <motion.div
//             className="inscription-form-four"
//             initial={{ x: swipeDirection === "right" ? -100 : 100, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             exit={{ x: swipeDirection === "left" ? 100 : -100, opacity: 0 }}
//             transition={{ duration: 0.35, ease: "easeInOut" }}
//         >
//             <div className="texts-four">
//                 <p className="bien-four">Bienvenue sur </p>
//                 <p className="athar-four">ATHAR</p>
//                 <p className="compte-four">
//                     Vous avez déjà un compte ? 
//                     <span className="connexion-four" onClick={goToConnexion}>
//                         Connectez vous.
//                     </span>
//                 </p>
//             </div>

//             <div className="documents-four">
//                 <p className="documents">Documents <span className="redstar">*</span></p>
                
//                 {/* File Upload Area */}
//                 {!file ? (
//                     <div 
//                         className="documents-square-four" 
//                         onClick={() => fileInputRef.current.click()}
//                         style={{ border: borderStyle }}
//                     >
//                         <img src={doc} alt="Upload" className="circle" />
//                         <div className="par">
//                             <p>Ajoutez un fichier</p>
//                             <p>Cliquez ici pour sélectionner</p>
//                             <p>un fichier.</p>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="file-info-container">
//                         <div className="flex items-center justify-between p-2">
//                             <div className="truncate w-4/5">
//                                 <p className="text-sm truncate">{file.name}</p>
//                                 <p className="text-xs text-gray-400">{Math.round(file.size / 1024)} KB</p>
//                             </div>
//                             <button 
//                                 onClick={handleRemoveFile}
//                                 className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
//                             >
//                                 <img src={ximg} alt="Remove" className="w-4 h-4" />
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 {errorMessage && <p className="erri">{errorMessage}</p>}

//                 <input
//                     type="file"
//                     ref={fileInputRef}
//                     style={{ display: "none" }}
//                     onChange={handleFileChange}
//                 />
//             </div>

//             <div className="footer-four">
//                 <div className="lr-four">
//                     <img src={arrLeft} alt="Back" onClick={prevPopUp2} />
//                 </div>
//                 <button className="cnct-btn" onClick={handleSubmit}>
//                     S'inscrire
//                 </button>
//             </div>

//             <Demande popUp={popDem} foncone={() => setPopDem(false)} />
//         </motion.div>
//     );
// }

// export default NewInsEx3;