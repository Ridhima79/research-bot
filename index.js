const express = require('express');
const multer = require('multer');
const cors = require('cors');
const pdfParse = require('pdf-parse');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Show if API key is loaded
console.log("🔑 OpenAI API Key Loaded:", process.env.OPENAI_API_KEY ? "✅ Yes" : "❌ No");

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Setup file upload
const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/ask', upload.single('pdf'), async (req, res) => {
  const question = req.body.question;
  const file = req.file;

  if (!file || !question) {
    return res.status(400).json({ answer: "Missing PDF or question." });
  }

  try {
    // Extract text from PDF
    const data = await pdfParse(file.buffer);
    const fullText = data.text;

    // Use only a chunk of the PDF to avoid token overflow
    const context = fullText.slice(0, 3000);

    // Build prompt
    const prompt = `You are a helpful assistant. Based only on the following research paper content, answer the question accurately:\n\nResearch Paper:\n${context}\n\nQuestion: ${question}`;

    // Call OpenAI
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // use "gpt-4" if available
      messages: [
        { role: "system", content: "You are a helpful research assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.4,
      max_tokens: 300
    });

    const answer = chatResponse.choices[0].message.content.trim();
    res.json({ answer });

  } catch (error) {
    console.error("🔥 Error:", error.response?.data || error.message || error);
    res.status(500).json({ answer: "Error processing your question." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
