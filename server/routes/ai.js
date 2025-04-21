

require('dotenv').config();

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const annotationAIModel = require('../model/AnnotationAI');
const cloudinary = require('../config/cloudinary');


// Initialize AI models
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const visionClient = new ImageAnnotatorClient();


const upload = multer({ storage: multer.memoryStorage() });
// Gemini AI Analysis
async function analyzeWithGemini(imageBuffer, prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const imagePart = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/jpeg"
      }
    };
    
    const result = await model.generateContent([prompt, imagePart]);
    return {
      text: result.response.text(),
      model: "Gemini Pro Vision"
    };
  } catch (error) {
    console.error("Gemini error:", error);
    throw new Error("AI analysis failed");
  }
}

// API Endpoints
router.post('/api/analyze/gemini', upload.single('image'), async (req, res) => {
  try {
    console.log('Received request with file:', req.file);
    if (!req.file) return res.status(400).json({ error: "No image provided" });
    
    const { prompt } = req.body;
    const result = await analyzeWithGemini(req.file.buffer, prompt);
    console.log(result)
    let imageUrl = "";
    if (req.file) {
      const base64Image = `data:image/jpeg;base64,${req.file.buffer.toString('base64')}`;
      const resultUpload = await cloudinary.uploader.upload(base64Image);
      imageUrl = resultUpload.secure_url;
      
    }
  const annotation = await annotationAIModel.create({imageUrl ,content: result.text   });
  await annotation.save();
    res.json(annotation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
// Cloud Vision Analysis
async function analyzeWithCloudVision(imageBuffer) {
  try {
    const [result] = await visionClient.annotateImage({
      image: { content: imageBuffer },
      features: [
        { type: 'LABEL_DETECTION' },
        { type: 'TEXT_DETECTION' },
        { type: 'LANDMARK_DETECTION' },
        { type: 'LOGO_DETECTION' },
        { type: 'OBJECT_LOCALIZATION' }
      ]
    });

    const architecturalElements = result.localizedObjectAnnotations
      .filter(obj => obj.name.toLowerCase().includes('building') || 
                   obj.name.toLowerCase().includes('architecture') ||
                   obj.name.toLowerCase().includes('structure'))
      .map(obj => ({
        name: obj.name,
        confidence: obj.score,
        boundingPoly: obj.boundingPoly
      }));

    return {
      labels: result.labelAnnotations.map(label => ({
        description: label.description,
        score: label.score
      })),
      objects: architecturalElements,
      text: result.textAnnotations?.[0]?.description || '',
      model: "Google Cloud Vision"
    };
  } catch (error) {
    console.error("Vision error:", error);
    throw new Error("Vision analysis failed");
  }
}

router.post('/api/analyze/vision', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image provided" });
    
    const result = await analyzeWithCloudVision(req.file.buffer);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});*/

module.exports = router;