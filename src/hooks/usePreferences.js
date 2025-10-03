import { useState, useEffect } from 'react';

export const usePreferences = () => {
  const [useAI, setUseAI] = useState(true);
  const [difficulty, setDifficulty] = useState('medium');
  const [topic, setTopic] = useState('All Topics');

  useEffect(() => {
    // Load preferences from localStorage
    const savedUseAI = localStorage.getItem('useAI');
    const savedDifficulty = localStorage.getItem('difficulty');
    const savedTopic = localStorage.getItem('topic');

    if (savedUseAI !== null) setUseAI(savedUseAI === 'true');
    if (savedDifficulty) setDifficulty(savedDifficulty);
    if (savedTopic) setTopic(savedTopic);
  }, []);

  const savePreferences = () => {
    localStorage.setItem('useAI', useAI.toString());
    localStorage.setItem('difficulty', difficulty);
    localStorage.setItem('topic', topic);
  };

  return {
    useAI,
    setUseAI,
    difficulty,
    setDifficulty,
    topic,
    setTopic,
    savePreferences,
  };
};
