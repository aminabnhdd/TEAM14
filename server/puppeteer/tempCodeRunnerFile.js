const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const data = require('./database.json');
const compile = async function(templateName,data){


    const filePath = path.join(process.cwd(), 'puppeteer', 'templates', 'informations.hbs');
    const html = await fs.readFile(filePath, 'utf-8');
    const compiledContent = hbs.compile(html)(data);


    return compiledContent;


};



(async function(){
    try{

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const content = await compile('informations',data);

        await page.setContent(content);
        await page.emulateMediaType('screen');

        await page.pdf({
            path: 'mypdf.pdf',
            format:'A4',
            printBackground: true
        });

        console.log('done');
        await browser.close();
        process.exit();
    } catch (e) {
        console.log('our error',e);
    }
})();


