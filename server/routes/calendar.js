const express = require('express');
const router = express.Router();
const { google } = require('googleapis');

require('dotenv').config();

// Setup OAuth2 Client
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'http://localhost:3001/oauth2callback'
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

router.post('/create-meet', async (req, res) => {
  try {
    const { expertEmail, clientEmail, startTime, endTime } = req.body;

    /*
    if (!expertEmail || !clientEmail || !startTime || !endTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }*/

    const event = {
      summary: 'Expert Consultation',
      description: 'Meeting scheduled automatically',
      start: {
        dateTime: "2025-04-28T14:00:00+01:00",
        timeZone: 'Africa/Algiers',
      },
      end: {
        dateTime: "2025-04-28T14:30:00+01:00",
        timeZone: 'Africa/Algiers',
      },
      attendees: [
        { email: 'na_benhaddad@esi.dz' },
        { email: 'aminabenhaddad2006@gmail.com' },
      ],
      conferenceData: {
        createRequest: {
          requestId: `meeting-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
    });

    return res.status(200).json({
      message: 'Meeting created successfully',
      meetLink: response.data.hangoutLink,
      calendarEventLink: response.data.htmlLink,
    });

  } catch (error) {
    console.error('Error creating meeting:', error);
    return res.status(500).json({ error: 'Failed to create meeting' });
  }
});

module.exports = router;