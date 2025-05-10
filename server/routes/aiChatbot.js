const express = require('express');
const router = express.Router();

const { GoogleGenAI } = require('@google/genai');
const { v4: uuidv4 } = require("uuid");

const api_key = process.env.API_KEY;
console.log('api key is :', api_key); // Debug log for API key (remove in production)

const ai = new GoogleGenAI({ apiKey: api_key });

const chatSessions = {}; // Stores ongoing chat sessions keyed by sessionId

// Route to generate a new unique session ID for a given project
router.get("/:projetId/new-session", (req, res) => {
    const { projetId } = req.params;
    const sessionId = uuidv4(); // Generate a unique session identifier
    res.json({ sessionId });
});

// Route to handle chat messages
router.post("/:projetId/chat", async (req, res) => {
    const { projetId } = req.params;
    const { query, sessionId } = req.body;

    // Validate required fields
    if (!query || !sessionId) {
        return res.status(400).json({ error: "query and sessionId are required" });
    }

    try {
        let chat = chatSessions[sessionId];

        // If no chat session exists for this ID, create one with initial context
        if (!chat) {
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

            chatSessions[sessionId] = chat; // Store the new session for future interactions
        }

        // Send the user query to the Gemini chat model
        const response = await chat.sendMessage({ message: query });

        console.log("Response:", response.text); 
        res.json({ text: response.text }); 

    } catch (error) {
        console.error("Error generating content:", error); 
        res.status(500).json({ error: "Failed to generate content" });
    }
});

module.exports = router;
