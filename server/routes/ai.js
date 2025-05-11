require('dotenv').config();

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const annotationAIModel = require('../model/AnnotationAI');
const cloudinary = require('../config/cloudinary');
const validateToken = require("../middlewares/authMiddleware");
const sectionModel = require("../model/Section");
const projetModel = require("../model/Projet");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const visionClient = new ImageAnnotatorClient();

// Génère un résumé textuel d'un projet (titre, type, coordonnées, style, etc.)
function generateProjetSummary(projet) {
  const {
      titre,
      type,
      latitude,
      longitude,
      localisation,
      style,
      dateConstruction,
      keywords
  } = projet;

  let summary = `Projet: "${titre}"\n`;
  summary += `Type: ${type}\n`;

  if (dateConstruction) summary += `Date de construction: ${dateConstruction}\n`;
  if (localisation) summary += `Localisation: ${localisation}\n`;
  if (latitude && longitude) summary += `Coordonnées: ${latitude}, ${longitude}\n`;
  if (style) summary += `Style architectural: ${style}\n`;

  if (keywords?.length) {
      summary += `Mots-clés: ${keywords.join(", ")}\n`;
  }

  return summary;
}

// Mise en forme Markdown du texte retourné par Gemini
function toFormattedText(text) {
  const lines = text.split('\n').slice(1); // on ignore la première ligne
  return lines
    .filter(line => line.trim() !== '') // on supprime les lignes vides
    .map(line => line.replace(/•/g, '  *')) // on remplace les puces
    .join('\n\n'); // double saut de ligne entre les paragraphes
}

// Configuration de Multer pour l'upload mémoire
const upload = multer({ storage: multer.memoryStorage() });

// Analyse de l'image avec Gemini + prompt
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
    const markdown = toFormattedText(result.response.text());
    return {
      text: markdown,
      model: "Gemini Pro Vision"
    };
  } catch (error) {
    console.error("Gemini error:", error);
    // Gère l'erreur de dépassement de quota
    if (error.status === 429) {
      console.warn('Rate limit reached! Slow down your requests.');
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    throw new Error("AI analysis failed");
  }
}

// Route : analyse d'image via Gemini AI + génération de résumé
router.post('/api/analyze/gemini', upload.single('image'), async (req, res) => {
  try {
    const { photourl, projetId } = req.body;
    if (!req.file) return res.status(400).json({ error: "No image provided" });

    // Récupération du projet associé
    const projet = await projetModel.findById(projetId);
    if (!projet) {
      return res.status(404).json({ message: 'Projet not found' });
    }

    // Appel Gemini avec prompt + résumé du projet
    const { prompt } = req.body;
    const result = await analyzeWithGemini(req.file.buffer, prompt + generateProjetSummary(projet));

    // Upload de l'image sur Cloudinary
    let imageUrl = "";
    if (req.file) {
      const base64Image = `data:image/jpeg;base64,${req.file.buffer.toString('base64')}`;
      const resultUpload = await cloudinary.uploader.upload(base64Image);
      imageUrl = resultUpload.secure_url;
    }

    // Enregistrement de l'annotation générée
    const annotation = await annotationAIModel.create({
      imageUrl,
      content: result.text,
      bigPhoto: photourl
    });

    res.json(annotation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route : approuvement d'une annotation (la rendre publique)
router.post('/approve-annotation', validateToken, async (req, res) => {
  try {
    const { id } = req.body;

    const annot = await annotationAIModel.findById(id);
    if (!annot) {
      return res.status(404).json({ message: "Annotation non trouvée" });
    }

    annot.public = true;
    await annot.save();

    return res.status(200).json({ message: "L'annotation a été approuvée." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

// Route : récupération des annotations liées à une photo
router.get('/get-annotations', validateToken, async (req, res) => {
  try {
    const { photourl } = req.query;

    if (!photourl) {
      return res.status(400).json({ message: 'Photo URL is required' });
    }

    // Récupération des annotations
    const annotations = await annotationAIModel.find({ bigPhoto: photourl });

    // Recherche de la section contenant cette photo
    const section = await sectionModel.findOne({ images: photourl }).populate('projetId');
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    // Vérifie si l'utilisateur est le chef du projet
    const isChef = section.projetId.chef.toString() === req.user.id;

    res.json({ annotations, isChef });
  } catch (error) {
    console.error('Error fetching annotations:', error);
    res.status(500).json({ message: 'Internal server error' });
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
