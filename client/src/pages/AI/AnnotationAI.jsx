import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';

const AnnotationTool = () => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', x: 25, y: 25, width: 50, height: 50 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const imgRef = useRef(null);

  const DEFAULT_PROMPT = `
  Tu es un expert en architecture et tu t'exprimes uniquement en français, avec un ton professionnel, fluide et naturel, comme un architecte humain le ferait.
  
  À partir de l'image fournie, rédige une analyse complète de l'élément architectural représenté. Le texte doit être structuré sous forme de paragraphes clairs, sans énumérations ni puces. Utilise des titres en gras pour chaque partie (ex : **1. Nom et Type**, etc.).
  
  L'analyse doit inclure :
  1. Le nom et le type de l'élément architectural observé
  2. Ses composants structurels et leur fonction
  3. Les matériaux visibles ou probables utilisés
  4. Sa période historique estimée
  5. Le style architectural (avec références culturelles ou régionales si possible)
  6. Toute information contextuelle ou culturelle pertinente
  
  Le texte doit être cohérent, fluide et rédigé comme un vrai commentaire ou rapport professionnel destiné à un public cultivé.
  `;



  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => setSrc(reader.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const getCroppedImgBlob = async () => {
    const canvas = document.createElement('canvas');
    const image = imgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;
    const ctx = canvas.getContext('2d');

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
      canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.9);
    });
  };
  const analyzeSelection = async () => {
    if (!completedCrop) return;
  
    setIsAnalyzing(true);
    try {
      const blob = await getCroppedImgBlob();
      const formData = new FormData();
      formData.append('image', blob, 'architecture.jpg');
      formData.append('prompt', DEFAULT_PROMPT);
      
      const response = await axios.post('http://localhost:3001/ai/api/analyze/gemini', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
  
      console.log('Server response:', response.data);

  setAnnotations(prev => [
    {
      _id: response.data._id,
      content: response.data.content,
      imageUrl: response.data.imageUrl
    },
    ...prev
  ]);
  
    } catch (error) {
      console.error("Analysis error:", error);
      alert(`Analysis failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">Architectural AI Annotation</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col items-center gap-6">
          <div className="w-full max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Architectural Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              disabled={isAnalyzing}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          {src && (
            <>
              <div className="border rounded-lg overflow-hidden">
                <ReactCrop
                  crop={crop}
                  onChange={setCrop}
                  onComplete={setCompletedCrop}
                  minWidth={100}
                  minHeight={100}
                >
                  <img 
                    ref={imgRef} 
                    src={src} 
                    alt="Uploaded preview" 
                    className="max-w-full max-h-[60vh]" 
                  />
                </ReactCrop>
              </div>

              <div className="w-full max-w-md space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Analysis Prompt
                  </label>
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder={DEFAULT_PROMPT}
                    className="w-full min-h-[120px] p-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isAnalyzing}
                  />
                </div>

                <button
                  onClick={analyzeSelection}
                  disabled={!completedCrop || isAnalyzing}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </span>
                  ) : 'Analyze Selection'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {annotations.length > 0 && (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Analysis Results</h2>
    <div className="space-y-4">
      {annotations.map((ann) => (
        <div key={ann._id} className="p-5 rounded-lg bg-blue-50 border-l-4 border-blue-500">
          <div className="flex justify-between items-center mb-3 pb-3 border-b border-blue-200">
            <span className="font-bold text-blue-700">Gemini AI Analysis</span>
            {/*<span className="text-sm text-blue-500">{ann.timestamp}</span>*/}
          </div>
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap text-gray-700">{ann.content}</p>
            {ann.imageUrl && (
              <div className="mt-4">
                <img 
                  src={ann.imageUrl} 
                  alt="Analyzed portion" 
                  className="max-w-xs rounded border border-gray-200" 
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)}
    </div>
  );
};

export default AnnotationTool;