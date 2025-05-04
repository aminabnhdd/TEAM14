const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const {renderTiptap} = require('../puppeteer/tiptapRenderer');
const validateToken = require("../middlewares/authMiddleware");


// Register custom helper for equality
hbs.registerHelper('eq', (a, b) => String(a).trim() === String(b).trim());
hbs.registerHelper('ne', (a, b) => String(a).trim() !== String(b).trim());

hbs.registerHelper('or', (a, b) => String(a).trim() || String(b).trim());

hbs.registerHelper('hasMultiple', (array) => {
 return Array.isArray(array) && array.length > 1;
 
});

hbs.registerHelper('capitalizeFirst', (text) => {
    if (typeof text !== 'string') return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  });


  hbs.registerHelper('renderTiptap', (content) => {
    return new hbs.SafeString(renderTiptap(content));
  });




const compile = async function(templateName,data){


    const filePath = path.join(process.cwd(), 'puppeteer','templates', `${templateName}.hbs`);
    const html = await fs.readFile(filePath, 'utf-8');
    const compiledContent = hbs.compile(html)(data);


    return compiledContent;


};

router.post('/generateHTML',async(req,res) =>{
    try {
        const { data } = req.body;
        
        // Validate input
        if (!data) {
            return res.status(400).json({ error: 'No project data provided' });
        }

        const preferredOrder = ["description", "architecture", "histoire", "archeologie", "autre"];

        data.projet.sections.sort((a, b) => {
          const aIndex = preferredOrder.indexOf(a.type);
          const bIndex = preferredOrder.indexOf(b.type);
          return aIndex - bIndex;
        });
        
        const content = await compile('web', data);
        //const content = await compile('informations', { projet, collaborateurs,chef,references });
        
        res.send(content);}
        catch (error) {
            console.error('HTML generation failed:', error);
            res.status(500).json({ 
                error: 'HTML generation failed',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        } 



})

router.post('/generatePDF', async (req, res) => {
  try {
    const { data } = req.body;
    
    if (!data) {
      return res.status(400).json({ error: 'No project data provided' });
    }

    // Sort sections
    const preferredOrder = ["description", "architecture", "histoire", "archeologie", "autre"];
    data.projet.sections.sort((a, b) => {
      const aIndex = preferredOrder.indexOf(a.type);
      const bIndex = preferredOrder.indexOf(b.type);
      return aIndex - bIndex;
    });
    
    const content = await compile('pdf', data);

    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent(content, { waitUntil: 'networkidle0' });
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', right: '7mm', bottom: '10mm', left: '7mm' },
      preferCSSPageSize: true
    });

    await browser.close();

    // Set proper headers
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(data.projet.titre)}.pdf"`,
      'Content-Length': pdfBuffer.length
    });

    res.end(pdfBuffer);

  } catch (error) {
    console.error('PDF generation failed:', error);
    res.status(500).json({ 
      error: 'PDF generation failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});
module.exports = router;

