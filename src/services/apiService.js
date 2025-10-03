export const generateQuestions = async (difficulty, topic) => {
  const response = await fetch('/api/generate-questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ difficulty, topic }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate questions');
  }

  return await response.json();
};
