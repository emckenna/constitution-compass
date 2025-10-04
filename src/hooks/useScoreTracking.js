import { useState, useEffect } from 'react';

export const useScoreTracking = () => {
  const [region, setRegion] = useState(null);
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user's region on component mount
  useEffect(() => {
    const fetchRegion = async () => {
      try {
        console.log('Fetching region data...');
        const response = await fetch('/api/get-region');
        if (!response.ok) {
          throw new Error(`Failed to get region: ${response.status}`);
        }
        const data = await response.json();
        console.log('Region data received:', data);
        setRegion(data.region);
        setCountry(data.country);
      } catch (err) {
        console.error('Error fetching region:', err);
        setRegion('Unknown');
        setCountry('Unknown');
      }
    };

    fetchRegion();
  }, []);

  const saveScore = async (score, totalQuestions, difficulty) => {
    setLoading(true);
    setError(null);

    try {
      // Calculate score as a percentage (0.00 to 1.00)
      const scorePercentage = score / totalQuestions;

      // Create unique key for this quiz completion
      const quizKey = `quiz_${score}_${difficulty}_${Date.now()}`;
      const savedKey = sessionStorage.getItem('lastSavedQuiz');

      // Prevent duplicate saves within the same session (handles React StrictMode double-invocation)
      if (savedKey && Date.now() - parseInt(savedKey.split('_')[3]) < 2000) {
        console.log('Preventing duplicate score save');
        return { success: true, duplicate: true };
      }

      const response = await fetch('/api/save-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          region: region || 'Unknown',
          country: country || 'Unknown',
          score: scorePercentage,
          difficulty: difficulty || 'medium',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save score');
      }

      const data = await response.json();

      // Mark this quiz as saved
      sessionStorage.setItem('lastSavedQuiz', quizKey);

      return data;
    } catch (err) {
      console.error('Error saving score:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    region,
    country,
    saveScore,
    loading,
    error,
  };
};
