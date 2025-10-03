import { useState } from 'react';
import { allQuestions } from '../data/questions';
import { generateQuestions } from '../services/apiService';
import { mockGenerateQuestions } from '../services/mockApiService';

const USE_MOCK = process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_MOCK === 'true';
const apiService = USE_MOCK ? mockGenerateQuestions : generateQuestions;

export const useQuizState = (setPage) => {
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
      const data = await apiService(difficulty, topic);
      setQuestions(data.questions);
      // Reset quiz state
      setCurrentQuestion(0);
      setScore(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setPage('quiz')
    } catch (err) {
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
