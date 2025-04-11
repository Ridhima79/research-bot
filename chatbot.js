// server/routes/chatbot.js

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdfParser = require('../pdfParser');

const router = express.Router();

// Configure multer
const upload = multer({ dest: 'uploads/' });

router.post('/ask', upload.single('pdf'), async (req, res) => {
  const question = req.body.question;
  const pdfPath = req.file.path;

  try {
    const pdfText = await pdfParser(pdfPath);

    // Simple logic: return first matching sentence containing any word from question
    const lowerQuestionWords = question.toLowerCase().split(' ');
    const answer = pdfText
      .split('.')
      .find(sentence =>
        lowerQuestionWords.some(word =>
          sentence.toLowerCase().includes(word)
        )
      );

    res.json({ answer: answer?.trim() || "Sorry, I couldn’t find a relevant answer." });

    // Cleanup uploaded file
    fs.unlinkSync(pdfPath);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error processing PDF" });
  }
});

module.exports = router;
