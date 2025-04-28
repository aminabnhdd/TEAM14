const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const validateToken = require("../middlewares/authMiddleware");





const compile = async function (templateName, data) {
    const filePath = path.join(process.cwd(), 'puppeteer', 'templates', 'informations.hbs');
    const html = await fs.readFile(filePath, 'utf-8');
   const compiledContent =  hbs.compile(html)(data);
   console.log(compiledContent);
   return compiledContent;
};



router.post('/generate', validateToken, async (req, res) => {
    let browser;
    try {
        const { projet } = req.body;
        
        // Validate input
        if (!projet) {
            return res.status(400).json({ error: 'No project data provided' });
        }

        // Launch browser with proper configuration
        browser = await puppeteer.launch({
            headless: "new",
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage' // Add this for better stability
            ],
            timeout: 30000 // Increase timeout
        });

        const page = await browser.newPage();
        
        // Set default page timeout
        page.setDefaultNavigationTimeout(60000);
        
        // Generate content
        const content = await compile('informations', projet);
        
        // Set content with proper waiting
        await page.setContent(content);

        await page.emulateMediaType('screen');

        // Generate PDF with additional options
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20mm',
                right: '20mm',
                bottom: '20mm',
                left: '20mm'
            },
        });

        // Verify PDF buffer
        if (!pdfBuffer || !pdfBuffer.length) {
            throw new Error('Generated empty PDF buffer');
        }

        // Set proper headers
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${projet.titre.replace(/[^a-z0-9]/gi, '_')}-details.pdf"`,
            'Content-Length': pdfBuffer.length,
            'Cache-Control': 'no-store'
        });

        // Send raw buffer
        res.send(pdfBuffer);

    } catch (error) {
        console.error('PDF generation failed:', error);
        res.status(500).json({ 
            error: 'PDF generation failed',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    } finally {
        if (browser) await browser.close();
    }
});
module.exports = router;