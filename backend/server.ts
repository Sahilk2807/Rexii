import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON bodies

// Hugging Face API configuration
const HF_API_URL = "https://api-inference.huggingface.co/models/sarvamai/hindi-tts";
const HF_API_KEY = process.env.HF_API_KEY;

if (!HF_API_KEY) {
    console.error("Hugging Face API key not found. Please set HF_API_KEY in your .env file.");
    process.exit(1);
}

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Rexii TTS Backend is running!');
});

app.post('/tts', async (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({ error: 'Text is required and must be a non-empty string.' });
    }

    try {
        console.log(`Received request for text: "${text}"`);

        const response = await fetch(HF_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${HF_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputs: text }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`Hugging Face API Error: ${response.status} ${response.statusText}`, errorBody);
            // Handle specific Hugging Face errors, like model loading
            if (response.status === 503) {
                 return res.status(503).json({ error: 'The AI model is currently loading. Please try again in a few moments.' });
            }
            return res.status(response.status).json({ error: `Failed to generate audio. API returned: ${errorBody}` });
        }

        const audioBuffer = await response.arrayBuffer();

        res.setHeader('Content-Type', 'audio/wav');
        res.send(Buffer.from(audioBuffer));

    } catch (error) {
        console.error('Error processing TTS request:', error);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});