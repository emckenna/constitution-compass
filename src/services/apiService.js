export const generateQuestions = async (difficulty, topic) => {
  const response = await fetch('/api/generate-questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ difficulty, topic }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    if (response.status === 429) {
      const retryAfter = errorData.retryAfter || 60;
      throw new Error(`Rate limit exceeded. Please wait ${retryAfter} seconds before trying again.`);
    }

    throw new Error(errorData.message || 'Failed to generate questions');
  }

  return await response.json();
};
