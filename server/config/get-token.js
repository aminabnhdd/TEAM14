require('dotenv').config();
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'http://localhost:3001/oauth2callback'
);


const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: [
    'https://www.googleapis.com/auth/calendar',
  ],
});

console.log('Authorize this app by visiting this url:', authUrl);


const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('Enter the code from that page here: ', async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  console.log('Tokens:', tokens);
  readline.close();
});