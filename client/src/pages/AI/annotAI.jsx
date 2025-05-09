import React, { useState, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import axios from "axios";
import { Icon } from "@iconify/react";
import SideNav from "../../components/SideNav";
import SearchBar from "../../components/SearchBar";
import { useContext } from "react";
import AuthContext from "../../helpers/AuthContext";
import RefreshService from "../../services/RefreshService";
import { useLocation } from "react-router-dom";

const AnnotationTool = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const location = useLocation();
  const { src: photourl, projetId : projetId } = location.state || {};
  const [requestCount, setRequestCount] = useState(0);
  const [isChef, setIsChef] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  console.log(projetId);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await RefreshService.Refresh();
        setAuthState({
          email: response.email,
          role: response.role,
          accessToken: response.accessToken,
        });
        const response2 = await axios.get(
          "http://localhost:3001/ai/get-annotations",
          {
            params: { photourl },
            headers: {
              Authorization: `Bearer ${response.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response2.data);
        setAnnotations(response2.data.annotations);
        setIsChef(response2.data.isChef);
      } catch (err) {
        console.log("Failed to refresh");
      }
    };

    fetch();
  }, [photourl, setAuthState]);

  const [crop, setCrop] = useState({
    unit: "%",
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const imgRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const storedCount = localStorage.getItem("requestCount");
    if (storedCount) {
      setRequestCount(parseInt(storedCount, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("requestCount", requestCount.toString());
  }, [requestCount]);
  const DEFAULT_PROMPT = `Tu es un expert en architecture et tu t'exprimes uniquement en français, avec un ton professionnel, fluide et naturel, comme un architecte humain le ferait.
  
  À partir de l'image fournie, rédige une analyse complète de l'élément architectural représenté. Le texte doit être structuré sous forme de paragraphes clairs, sans énumérations ni puces. Utilise des titres en gras pour chaque partie (ex : **1. Nom et Type**, etc.).
  
  L'analyse doit inclure :
  1. Le nom et le type de l'élément architectural observé
  2. Ses composants structurels et leur fonction
  3. Les matériaux visibles ou probables utilisés
  4. Sa période historique estimée
  5. Le style architectural (avec références culturelles ou régionales si possible)
  6. Toute information contextuelle ou culturelle pertinente
  
  Le texte doit être cohérent, fluide et rédigé comme un vrai commentaire ou rapport professionnel destiné à un public cultivé. De plus voici des informations contextuelles: `;

  const getCroppedImgBlob = async () => {
    const canvas = document.createElement("canvas");
    const image = imgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.9);
    });
  };

  const analyzeSelection = async () => {
    if (!completedCrop) return;
    if (requestCount >= 10) {
      alert("Trop de requêtes. Veuillez patienter avant de continuer.");
      return;
    }
    setIsAnalyzing(true);
    try {
      const blob = await getCroppedImgBlob();
      const formData = new FormData();
      formData.append("image", blob, "architecture.jpg");
      formData.append("prompt", DEFAULT_PROMPT);
      formData.append("photourl", photourl);
      formData.append("projetId", projetId );
console.log(projetId);
      const response = await axios.post(
        "http://localhost:3001/ai/api/analyze/gemini",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setAnnotations((prev) => [
        ...prev,
        {
          _id: response.data._id,
          content: response.data.content,
          imageUrl: response.data.imageUrl,
          public: false,
        },
      ]);
      setActiveTab(annotations.length);
      setRequestCount((prev) => prev + 1);
    } catch (error) {
      console.error("Analysis error:", error);
      alert(`Analysis failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const approveAnnotation = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/ai/approve-annotation",
        { id },
        {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAnnotations((prev) =>
        prev.map((ann) => (ann._id === id ? { ...ann, approved: true } : ann))
      );
    } catch (error) {
      console.error("Approval failed:", error);
    }
  };
  const nextAnnotation = () => {
    if (activeTab < annotations.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const prevAnnotation = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  return (
    <div className="flex relative h-screen w-full">
      <SideNav className="" />
      <div className="flex-1 w-full bg-white main-content">
        <SearchBar />
        <main>
          <div className="mt-5 bg w-[86%] mx-auto mb-10">
            <div className="flex items-center justify-between w-full mb-4">
              {/* Heading */}
              <h1 className="titles text-black">
                Annoter Illustration avec IA
              </h1>

              {/* Limit Message */}
              <div className="px-4 w-auto border rounded-[12px] text-center py-2 bg-red-100 text-red-600 font-semibold">
                Cet outil est limité en requêtes, veuillez ne pas abuser de son
                utilisation.
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Left side: Image and Crop */}
              <div className="border p-4 rounded-[12px] flex flex-col items-center border-neutral-300 h-[78vh]">
                <div className="flex-1 w-full flex items-center justify-center rounded-[12px] overflow-hidden">
                  <div className="relative w-full h-full">
                    <ReactCrop
                      crop={crop}
                      onChange={setCrop}
                      onComplete={setCompletedCrop}
                      minWidth={100}
                      minHeight={100}
                      className="w-full h-auto"
                      style={{ maxWidth: "100%", height: "auto" }}
                    >
                      <img
                        ref={imgRef}
                        src={photourl}
                        alt="the picture you are gonna annotate"
                        className="w-full h-auto object-contain"
                        style={{
                          display: "block",
                          borderRadius: "12px",
                        }}
                        crossOrigin="anonymous"
                      />
                    </ReactCrop>
                  </div>
                </div>

                <div className="flex justify-end w-full">
                  <button
                    onClick={analyzeSelection}
                    disabled={!completedCrop || isAnalyzing}
                    className="buttons text-black bg-dune flex gap-2 py-3 px-5 mt-4 rounded-[36px] items-center justify-center hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Analyse...
                      </>
                    ) : (
                      <>
                        <Icon
                          icon="mingcute:pic-ai-line"
                          width="24"
                          height="24"
                        />
                        Analyser avec IA
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right side: Annotations */}
              <div className="border p-6 rounded-[12px] border-neutral-300 flex flex-col h-[78vh]">
                {annotations.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-center text-neutral-500">
                      Aucune annotation encore.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Slider Navigation */}
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={prevAnnotation}
                        disabled={activeTab === 0}
                        className="p-2 rounded-full hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Icon
                          icon="tabler:chevron-left"
                          width="24"
                          height="24"
                          className="text-black"
                        />
                      </button>
                      <span className="bolder-text">
                        Annotation {activeTab + 1} / {annotations.length}
                      </span>
                      <button
                        onClick={nextAnnotation}
                        disabled={activeTab === annotations.length - 1}
                        className="p-2 rounded-full hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Icon
                          icon="tabler:chevron-right"
                          width="24"
                          height="24"
                          className="text-black"
                        />
                      </button>
                    </div>

                    {/* Annotation Content */}
                    <div className="flex-1 overflow-auto">
                      {annotations.map((ann, index) => (
                        <div
                          key={ann._id}
                          className={`flex flex-col gap-4 h-full ${
                            activeTab === index ? "block" : "hidden"
                          }`}
                        >
                          {ann.imageUrl && (
                            <img
                              src={ann.imageUrl}
                              alt="Cropped region"
                              className="w-full max-h-[200px] object-contain"
                            />
                          )}
                          {ann.public === false && isChef ? (
                            <div className="flex justify-center">
                              <button
                                onClick={() => approveAnnotation(ann._id)}
                                className="buttons border-2 text-black border-dune flex gap-2 py-2 px-4 rounded-[36px] items-center justify-center hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer w-auto"
                              >
                                <Icon
                                  icon="akar-icons:chat-approve"
                                  width="20"
                                  height="20"
                                />
                                Approuver Annotation
                              </button>
                            </div>
                          ) : (
                            <p className="bolder-text text-center text-red-600 ">
                              Cette annotation n'a pas été approuvée par un
                              expert.
                            </p>
                          )}
                          <div className="overflow-auto flex-1 pr-2 scrollbar-hide">
                            <p className="main-text whitespace-pre-wrap text-justify">
                              {ann.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnnotationTool;
