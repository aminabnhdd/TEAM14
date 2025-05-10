const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const {renderTiptap} = require('../puppeteer/tiptapRenderer');
const validateToken = require("../middlewares/authMiddleware");


/**
 * Helper pour comparer l'égalité de deux valeurs (après nettoyage d'espaces)
 */
hbs.registerHelper('eq', (a, b) => String(a).trim() === String(b).trim());

/**
 * Helper pour vérifier l'inégalité de deux valeurs
 */
hbs.registerHelper('ne', (a, b) => String(a).trim() !== String(b).trim());

/**
 * Helper pour vérifier si au moins une des deux valeurs est vraie
 */
hbs.registerHelper('or', (a, b) => String(a).trim() || String(b).trim());

/**
 * Helper pour vérifier si un tableau contient plusieurs éléments
 */
hbs.registerHelper('hasMultiple', (array) => {
 return Array.isArray(array) && array.length > 1;
});

/**
 * Helper pour mettre en majuscule la première lettre d'un texte
 */
hbs.registerHelper('capitalizeFirst', (text) => {
    if (typeof text !== 'string') return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
});

/**
 * Helper pour rendre le contenu TipTap en HTML
 * Utilise la fonction renderTiptap importée pour transformer le JSON TipTap en HTML
 */
hbs.registerHelper('renderTiptap', (content) => {
    return new hbs.SafeString(renderTiptap(content));
});


/**
 * Fonction pour compiler un template Handlebars avec des données
 */
const compile = async function(templateName, data) {
    // Récupère le chemin complet du fichier template
    const filePath = path.join(process.cwd(), 'puppeteer', 'templates', `${templateName}.hbs`);
    // Lit le contenu du fichier template
    const html = await fs.readFile(filePath, 'utf-8');
    // Compile le template avec les données
    const compiledContent = hbs.compile(html)(data);

    return compiledContent;
};

/**
 * Route POST pour générer du HTML à partir des données du projet
 * Convertit les données du projet en HTML en utilisant un template Handlebars
 */
router.post('/generateHTML', async(req, res) => {
    try {
        const { data } = req.body;
        
        // Validation des données d'entrée
        if (!data) {
            return res.status(400).json({ error: 'No project data provided' });
        }

        // Ordre de tri préféré pour les sections
        const preferredOrder = ["description", "architecture", "histoire", "archeologie", "autre"];

        // Tri des sections selon l'ordre préféré
        data.projet.sections.sort((a, b) => {
          const aIndex = preferredOrder.indexOf(a.type);
          const bIndex = preferredOrder.indexOf(b.type);
          return aIndex - bIndex;
        });

        // Formatage des mots-clés en une chaîne séparée par des virgules
        const keywords = (data.projet.keywords && data.projet.keywords.length > 0)
        ? data.projet.keywords
            .flatMap(keyword => keyword.split(',').map(k => k.trim())) // Découpage par virgules et nettoyage des espaces
            .filter(k => k !== '') // Suppression des chaînes vides
            .join(', ') // Concaténation en une seule chaîne
        : "/"; // Valeur par défaut si aucun mot-clé n'est disponible
      
        data.projet.keywords = keywords;

        // Compilation du template 'web' avec les données
        const content = await compile('web', data);
        
        // Envoi du HTML généré
        res.send(content);
    } catch (error) {
        console.error('HTML generation failed:', error);
        res.status(500).json({ 
            error: 'HTML generation failed',
            // Affichage des détails de l'erreur uniquement en environnement de développement
            details: (process.env.NODE_ENV === 'development') ? error.message : undefined
        });
    }
});

/**
 * Route POST pour générer un PDF à partir des données du projet
 * Utilise Puppeteer pour convertir le HTML en PDF
 */
router.post('/generatePDF', async (req, res) => {
  try {
    const { data } = req.body;
    
    // Validation des données d'entrée
    if (!data) {
      return res.status(400).json({ error: 'No project data provided' });
    }

    // Tri des sections selon l'ordre préféré
    const preferredOrder = ["description", "architecture", "histoire", "archeologie", "autre"];
    data.projet.sections.sort((a, b) => {
      const aIndex = preferredOrder.indexOf(a.type);
      const bIndex = preferredOrder.indexOf(b.type);
      return aIndex - bIndex;
    });
    
    // Formatage des mots-clés
    const keywords = (data.projet.keywords && data.projet.keywords.length > 0)
    ? data.projet.keywords
        .flatMap(keyword => keyword.split(',').map(k => k.trim()))
        .filter(k => k !== '')
        .join(', ')
    : "/";
  
    data.projet.keywords = keywords;

    // Compilation du template 'pdf' avec les données
    const content = await compile('pdf', data);

    // Lancement de Puppeteer en mode headless
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox'] // Options de sécurité pour les environnements serveur
    });
    
    // Création d'une nouvelle page et injection du contenu HTML
    const page = await browser.newPage();
    await page.setContent(content, { waitUntil: 'networkidle0' }); // Attendre que toutes les ressources soient chargées
    
    // Génération du PDF avec des options spécifiques
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', right: '7mm', bottom: '10mm', left: '7mm' },
      preferCSSPageSize: true // Utiliser les tailles de page définies dans le CSS
    });

    // Fermeture du navigateur Puppeteer
    await browser.close();

    // Configuration des en-têtes HTTP pour le téléchargement du PDF
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(data.projet.titre)}.pdf"`,
      'Content-Length': pdfBuffer.length
    });

    // Envoi du PDF généré
    res.end(pdfBuffer);

  } catch (error) {
    console.error('PDF generation failed:', error);
    res.status(500).json({ 
      error: 'PDF generation failed',
      details: (process.env.NODE_ENV === 'development') ? error.message : undefined
    });
  }
});

module.exports = router;