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
        const response = await fetch('/api/get-region');
        if (!response.ok) {
          throw new Error('Failed to get region');
        }
        const data = await response.json();
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
