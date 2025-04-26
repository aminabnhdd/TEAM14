const express = require('express');
const router = express.Router();

const { GoogleGenAI } = require('@google/genai');
const { v4: uuidv4 } = require("uuid");


const api_key = process.env.API_Key;
console.log('api key is :', api_key);




const ai = new GoogleGenAI({ apiKey: api_key });




const chatSessions = {}; // Stores chat instances per session

router.get("/:projetId/new-session", (req, res) => {
    const {projetId} = req.params;
  const sessionId = uuidv4();
  res.json({ sessionId });
});

router.post("/:projetId/chat", async (req, res) => {
    const {projetId} = req.params;
  const { query, sessionId } = req.body;

  if (!query || !sessionId) {
    return res.status(400).json({ error: "query and sessionId are required" });
  }

  try {
    let chat = chatSessions[sessionId];

    if (!chat) {
      // First time: create chat instance with history
      chat = ai.chats.create({
        model: "gemini-2.0-flash",
        history: [
          {
            role: "user",
            parts: [{ text: "Hello" }],
          },
          {
            role: "model",
            parts: [{ text: "Great to meet you. What would you like to know?" }],
          },
        ],
      });

      chatSessions[sessionId] = chat;
    }

    const response = await chat.sendMessage({ message: query });
    console.log("Response:", response.text);
    res.json({ text: response.text });
     
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

module.exports = router; 







