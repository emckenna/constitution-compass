
const { GoogleGenAI } = require('@google/genai');
const createPrompt = require('./prompts/quizPrompt');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { difficulty, topic } = req.body;
  if (!difficulty || !topic) return res.status(400).json({ error: 'Missing parameters' });

  try {
    const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = createPrompt(difficulty, topic);

    const result = await client.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });
    
    const text = result.candidates[0].content.parts[0].text;
    
    // Remove markdown code blocks
    let jsonText = text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/, '').replace(/\n?```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/, '').replace(/\n?```$/, '');
    }
    
    const questions = JSON.parse(jsonText);
    return res.status(200).json(questions);
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Failed to generate', message: error.message });
  }
};
