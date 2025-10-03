module.exports = (difficulty, topic) => `Generate exactly 10 quiz questions about the U.S. Constitution with the following criteria:

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
- Exclude https://wikipedia.org as a source
- Use https://constitution.congress.gov/ and https://www.archives.gov/founding-docs/constitution as primary references

Return ONLY valid JSON in this exact format (no markdown, no code blocks):
{
  "questions": [
    {
      "type": "multiple_choice",
      "question": "Question text?",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "explanation": "Brief explanation"
    },
    {
      "type": "true_false",
      "question": "Statement",
      "options": ["True", "False"],
      "correctIndex": 0,
      "explanation": "Brief explanation"
    }
  ]
}`;
