import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Set up Multer for handling file uploads (in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Helper to interact with Gemini
async function askGemini(prompt) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}

// Upload & Summarize Endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let extractedText = '';

    // Extract text based on file type
    if (req.file.mimetype === 'application/pdf') {
      const data = await pdfParse(req.file.buffer);
      extractedText = data.text;
    } else {
      // For images or other text files, we could implement OCR or direct reading.
      // For now, we support PDF parsing. If it's a raw text file:
      extractedText = req.file.buffer.toString('utf8');
    }

    if (!extractedText || extractedText.trim().length === 0) {
       return res.status(400).json({ error: 'Could not extract text from the file.' });
    }

    // Shorten text to avoid token limits, but 2.5 flash handles up to 1M tokens.
    // Let's create a structured prompt for summary
    const summaryPrompt = `
      You are an expert AI tutor. Analyze the following lecture notes/document and provide a structured JSON response.
      The JSON must contain the following keys exactly:
      - "executiveSummary": A concise paragraph explaining the core topic.
      - "keyConcepts": An array of strings, each being a short bullet point of key concepts.
      - "formulas": An array of objects with "name" and "equation" strings (if no formulas, return empty array).
      - "examTips": A single string with high-yield exam tips or practical advice based on the content.
      
      Ensure your output is valid JSON, without markdown blocks.
      
      Document text:
      ${extractedText.substring(0, 100000)} // Taking first 100k chars for safety
    `;

    const summaryResponseText = await askGemini(summaryPrompt);
    
    // Parse the JSON response
    let summaryData;
    try {
      // Strip markdown code blocks if Gemini returns them
      const cleanedJSON = summaryResponseText.replace(/```json/g, '').replace(/```/g, '').trim();
      summaryData = JSON.parse(cleanedJSON);
    } catch (parseError) {
      console.error('Failed to parse summary JSON:', summaryResponseText);
      throw new Error('Failed to parse AI response into structured data');
    }

    res.json({
      success: true,
      text: extractedText,
      summary: summaryData
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Standalone Summarize Endpoint
app.post('/api/summarize', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'No text provided' });
    }

    const summaryPrompt = `
      You are an expert AI tutor. Analyze the following lecture notes/document and provide a structured JSON response.
      The JSON must contain the following keys exactly:
      - "executiveSummary": A concise paragraph explaining the core topic.
      - "keyConcepts": An array of strings, each being a short bullet point of key concepts.
      - "formulas": An array of objects with "name" and "equation" strings (if no formulas, return empty array).
      - "examTips": A single string with high-yield exam tips or practical advice based on the content.
      
      Ensure your output is valid JSON, without markdown blocks.
      
      Document text:
      ${text.substring(0, 100000)}
    `;

    const summaryResponseText = await askGemini(summaryPrompt);
    const cleanedJSON = summaryResponseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const summaryData = JSON.parse(cleanedJSON);

    res.json({
      success: true,
      summary: summaryData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Generate Questions Endpoint
app.post('/api/questions', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Document text is required' });
    }

    const questionPrompt = `
      Based on the following document text, generate 5 study questions. 
      Include a mix of difficulty levels.
      Return the response strictly as valid JSON representing an array of objects.
      Each object must have:
      - "question": The question text
      - "answer": A comprehensive answer to the question
      - "difficulty": "Easy" | "Medium" | "Hard"
      
      Document text:
      ${text.substring(0, 50000)}
    `;

    const responseText = await askGemini(questionPrompt);
    const cleanedJSON = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const questions = JSON.parse(cleanedJSON);

    res.json({ success: true, questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Viva Chat Endpoint
app.post('/api/viva/chat', async (req, res) => {
  try {
    const { message, history, contextText } = req.body;
    
    // In a real app, you would use chat sessions. 
    // Here we reconstruct the prompt with history.
    let fullPrompt = `You are an AI Viva Examiner conducting an oral exam. You have analyzed the student's document below.\n\n`;
    fullPrompt += `Document Context:\n${contextText ? contextText.substring(0, 30000) : 'No context provided'}\n\n`;
    fullPrompt += `Chat History:\n`;
    
    if (history && history.length > 0) {
      history.forEach(msg => {
        fullPrompt += `${msg.role === 'user' ? 'Student' : 'Examiner'}: ${msg.text}\n`;
      });
    }
    
    fullPrompt += `\nStudent: ${message}\nExaminer:`;

    const reply = await askGemini(fullPrompt);

    // Also ask AI to rate confidence based on the last answer
    const confidencePrompt = `Based on the student's last answer: "${message}", rate their understanding of the topic on a scale of 0 to 100. Return ONLY the number.`;
    const confidenceResponse = await askGemini(confidencePrompt);
    const confidenceMatch = confidenceResponse.match(/\d+/);
    const confidenceScore = confidenceMatch ? parseInt(confidenceMatch[0], 10) : null;

    res.json({ 
      success: true, 
      reply,
      confidenceDelta: confidenceScore !== null ? (confidenceScore > 70 ? 5 : -5) : 0 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('====================================');
  console.log(`NEXUS AI SERVER RUNNING ON PORT ${PORT}`);
  console.log('STABLE SDK: @google/generative-ai');
  console.log('MODEL: gemini-2.0-flash');
  console.log('====================================');
});
