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
    return hbs.compile(html)(data);
};

router.post('/generate',
    validateToken,
    async (req, res) => {

        try {
            const { projet } = req.body; // Get data from request body
            console.log('this is inside the route', projet)

            const
                browser = await puppeteer.launch({
                    headless: "new",
                    args: ['--no-sandbox', '--disable-setuid-sandbox']
                });
            const page = await browser.newPage();

            const content = await compile('informations', projet);

            await page.setContent(content);
            await page.emulateMediaType('screen');

            // Generate PDF as buffer (not saving to file)
            const pdfBuffer = await page.pdf({
                format: 'A4',
                printBackground: true
            });

            // Set response headers for PDF download
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename=project-details.pdf',
                'Content-Length': pdfBuffer.length
            });

            // Send the PDF buffer as response
            res.send(pdfBuffer);

            // await page.pdf({
            //     path: 'mypdf.pdf',
            //     format: 'A4',
            //     printBackground: true
            // });

            console.log('done');


            await browser.close();

        } catch (e) {
            console.error('PDF generation error:', e);
            res.status(500).json({ error: 'Failed to generate PDF' });
        }
    });

module.exports = router;