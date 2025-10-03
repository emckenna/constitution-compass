export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { difficulty, topic } = req.body;

  if (!difficulty || !topic) {
    return res.status(400).json({ error: 'Missing difficulty or topic' });
  }

  try {
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

Return ONLY valid JSON in this exact format:
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

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from the response (remove any markdown code blocks)
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }

    const questions = JSON.parse(jsonMatch[0]);
    
    return res.status(200).json(questions);
  } catch (error) {
    console.error('Error generating questions:', error);
    return res.status(500).json({ 
      error: 'Failed to generate questions',
      message: error.message 
    });
  }
}
