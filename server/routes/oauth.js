const express = require('express');
const { google } = require('googleapis');
const fs = require('fs');
const app = express();
const port = process.env.PORT;
const router = express.Router();
const axios = require('axios');

const redirect_uri = `http://127.0.0.1:3001/oauth`;

function createOAuth2Client() {
    return new google.auth.OAuth2(
      process.env.CLIENT_ID_2,
      process.env.CLIENT_SECRET_2,
      redirect_uri
    );
  }


router.post('/auth/google', (req, res) => {

    const projetId = req.body.projetId; 
    const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID_2, process.env.CLIENT_SECRET_2, redirect_uri);


    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Referer-Policy', 'no-referrer-when-downgrade');

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/drive.file', 
    state: projetId,  
    prompt: 'consent',
  });

  res.json({url:authUrl});
}); 


router.get('/', async (req, res) => {
  const code = req.query.code;  
  const projetId = req.query.state;  

  try {

    const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID_2, process.env.CLIENT_SECRET_2, redirect_uri);

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log({user:tokens});

    res.cookie('access_token', tokens.access_token, {
        httpOnly: true,
        secure: false, 
        sameSite: 'Lax',
        maxAge: tokens.expiry_date ? (tokens.expiry_date - Date.now()) : 3600000
      });
    
      if (tokens.refresh_token) {
        res.cookie('refresh_token', tokens.refresh_token, { 
          httpOnly: true, 
          maxAge: 1000 * 3600 * 24 * 30, 
          sameSite: 'Lax',
          secure: false
        });
      }
      const accessToken = tokens.access_token;
      const refreshToken = tokens.refresh_token || req.cookies.refresh_token;
    res.redirect(`http://localhost:5173/visualisation/${projetId}?access_token=${accessToken}&refresh_token=${refreshToken}&openExplorer=true`);


  } catch (error) {
    res.status(500).send('Error during authentication ');
  }
});
router.post('/save-to-drive', async (req, res) => {
    const { projectData, fileName } = req.body;
  

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token d\'accès manquant ou invalide.' });
    }
  
    const accessToken = authHeader.split(' ')[1];
    const refreshToken = req.headers['x-refresh-token']; 
  
    try {
      const oauth2Client = createOAuth2Client();
      oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken
      });
  
      const drive = google.drive({ version: 'v3', auth: oauth2Client });
  

      const jsonContent = JSON.stringify(projectData, null, 2);
  

      const tempFilePath = `/tmp/${fileName || 'projet-temp.json'}`;
      fs.writeFileSync(tempFilePath, jsonContent);
  
 
      const fileMetadata = {
        name: fileName || `ATHAR - ${projectData.titre}.json`,
        mimeType: 'application/json',
      };
  
      const media = {
        mimeType: 'application/json',
        body: fs.createReadStream(tempFilePath),
      };
  
 
      const file = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id,name,webViewLink',
      });
  
  
      fs.unlinkSync(tempFilePath);
  
      res.json({
        success: true,
        fileId: file.data.id,
        fileName: file.data.name,
        webViewLink: file.data.webViewLink
      });
  
    } catch (error) {
      console.error('Erreur upload Google Drive :', error);
  
      if (error.code === 401) {
        return res.status(401).json({
          error: 'Token expiré. Veuillez vous reconnecter.',
          requireReauth: true
        });
      }
  
      res.status(500).json({
        error: 'Erreur lors de la sauvegarde sur Google Drive',
        details: error.message
      });
    }
  });
  
  router.get('/verify-token', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ valid: false });
  
    const token = authHeader.split(' ')[1];
  
    try {
      const googleResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`);

      res.json({ valid: true });
    } catch (err) {
      console.error("Token invalide ou expiré :", err.response?.data || err.message);
      res.status(401).json({ valid: false });
    }
  });
module.exports = router;