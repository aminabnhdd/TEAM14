const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const projet = require('./projet.json');
const chef = require('./chef.json')
const collaborateurs = require('./collaborateurs.json');
const references = require('./references.json');
const {renderTiptap} = require('./tiptapRenderer');

// Register custom helper for equality
hbs.registerHelper('eq', (a, b) => String(a).trim() === String(b).trim());
hbs.registerHelper('ne', (a, b) => String(a).trim() !== String(b).trim());


hbs.registerHelper('capitalizeFirst', (text) => {
    if (typeof text !== 'string') return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  });


  hbs.registerHelper('renderTiptap', (content) => {
    return new hbs.SafeString(renderTiptap(content));
  });

  const preferredOrder = ["description", "architecture", "histoire", "archeologie", "autre"];

projet.sections.sort((a, b) => {
  const aIndex = preferredOrder.indexOf(a.type);
  const bIndex = preferredOrder.indexOf(b.type);
  return aIndex - bIndex;
});



const compile = async function(templateName,data){


    const filePath = path.join(process.cwd(), 'puppeteer','templates', 'informations.hbs');
    const html = await fs.readFile(filePath, 'utf-8');
    const compiledContent = hbs.compile(html)(data);


    return compiledContent;


};



(async function(){
    try{

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const content = await compile('informations', { projet, collaborateurs,chef,references });

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


