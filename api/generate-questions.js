
const { GoogleGenAI } = require('@google/genai');

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
    const prompt = `Generate exactly 10 quiz questions about the U.S. Constitution with the following criteria:

Difficulty: ${difficulty}
Topic: ${topic}

Requirements:
- Create a mix of multiple choice (4 options) and true/false questions
- For ${difficulty} difficulty:
  * Easy: Basic facts and straightforward concepts
  * Medium: Understanding of relationships and processes  
  * Hard: Deep knowledge, interpretation, and critical thinking
- Focus on: ${topic === 'All Topics' ? 'all aspects of the U.S. Constitution' : topic}
- Each question must include a brief explanation of the correct answer
- Ensure questions are factual and based on the actual Constitution
- https://wikipedia.org is not allowed to be used
- main source should be https://constitution.congress.gov/constitution/


Return ONLY valid JSON in this exact format (no markdown, no code blocks, just pure JSON):
{
  "questions": [
    {
      "type": "multiple_choice",
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Brief explanation of why this is correct"
    },
    {
      "type": "true_false",
      "question": "Statement that is true or false",
      "options": ["True", "False"],
      "correctIndex": 0,
      "explanation": "Brief explanation"
    }
  ]
}`;

    const result = await client.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });
    
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const questions = JSON.parse(jsonMatch[0]);
    
    return res.status(200).json(questions);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Failed to generate', message: error.message });
  }
};
