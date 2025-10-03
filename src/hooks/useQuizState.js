import { useState } from 'react';
import { allQuestions } from '../data/questions';

export const useQuizState = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateAIQuestions = async (difficulty, topic) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ difficulty, topic }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }

      const data = await response.json();
      setQuestions(data.questions);
      return true;
    } catch (err) {
      console.error('Error generating questions:', err);
      setError('Unable to generate AI questions. Would you like to try the hardcoded quiz instead?');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const startHardcodedQuiz = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 10));
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setError('');
  };

  const handleAnswer = (index) => {
    if (showResult) return;

    setSelectedAnswer(index);
    setShowResult(true);

    if (index === questions[currentQuestion].correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      return false; // Not complete yet
    } else {
      return true; // Quiz complete
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuestions([]);
    setError('');
  };

  return {
    currentQuestion,
    score,
    selectedAnswer,
    showResult,
    questions,
    loading,
    error,
    generateAIQuestions,
    startHardcodedQuiz,
    handleAnswer,
    handleNext,
    resetQuiz,
  };
};
