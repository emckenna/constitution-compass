
const { GoogleGenAI } = require('@google/genai');
const createPrompt = require('./prompts/quizPrompt');

// Simple in-memory rate limiter for Gemini API (10 requests per minute for free tier)
const rateLimiter = {
  requests: [],
  maxRequests: 9, // Leave 1 request as buffer
  windowMs: 60 * 1000, // 1 minute

  canMakeRequest() {
    const now = Date.now();
    // Remove requests older than the window
    this.requests = this.requests.filter(time => now - time < this.windowMs);

    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = this.requests[0];
      const waitTime = this.windowMs - (now - oldestRequest);
      return { allowed: false, waitTime };
    }

    this.requests.push(now);
    return { allowed: true };
  }
};

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { difficulty, topic } = req.body;
  if (!difficulty || !topic) return res.status(400).json({ error: 'Missing parameters' });

  // Check rate limit
  const rateLimitCheck = rateLimiter.canMakeRequest();
  if (!rateLimitCheck.allowed) {
    const waitSeconds = Math.ceil(rateLimitCheck.waitTime / 1000);
    return res.status(429).json({
      error: 'Rate limit exceeded',
      message: `Please wait ${waitSeconds} seconds before generating more questions.`,
      retryAfter: waitSeconds
    });
  }

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
