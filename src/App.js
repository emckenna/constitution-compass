import React, { useState, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { usePreferences } from './hooks/usePreferences';
import { useQuizState } from './hooks/useQuizState';
import LandingPage from './pages/LandingPage';
import SetupPage from './pages/SetupPage';
import AboutPage from './pages/AboutPage';
import MetricsPage from './pages/MetricsPage';
import QuizPage from './pages/QuizPage';
import CompletePage from './pages/CompletePage';

const ConstitutionCompass = () => {
  const [page, setPage] = useState('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Use custom hooks for state management
  const {
    useAI,
    setUseAI,
    difficulty,
    setDifficulty,
    topic,
    setTopic,
    savePreferences,
  } = usePreferences();

  const {
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
  } = useQuizState(setPage);

  const startNewQuiz = useCallback(async () => {
    savePreferences();

    if (useAI) {
      const success = await generateAIQuestions(difficulty, topic);
      if (success) {
        setPage('quiz');
      }
    } else {
      startHardcodedQuiz();
      setPage('quiz');
    }
  }, [useAI, difficulty, topic, savePreferences, generateAIQuestions, startHardcodedQuiz]);

  const handleQuizNext = () => {
    const isComplete = handleNext();
    if (isComplete) {
      setPage('complete');
    }
  };

  const resetToLanding = () => {
    setPage('landing');
    resetQuiz();
  };

  const handleStartHardcodedQuiz = () => {
    startHardcodedQuiz();
    setPage('quiz');
  };

  // Render the appropriate page based on state
  const renderPage = () => {
    switch (page) {
      case 'landing':
        return (
          <LandingPage
            page={page}
            setPage={setPage}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        );

      case 'setup':
        return (
          <SetupPage
            page={page}
            setPage={setPage}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            useAI={useAI}
            setUseAI={setUseAI}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            topic={topic}
            setTopic={setTopic}
            loading={loading}
            error={error}
            startNewQuiz={startNewQuiz}
            startHardcodedQuiz={handleStartHardcodedQuiz}
          />
        );

      case 'about':
        return (
          <AboutPage
            page={page}
            setPage={setPage}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        );

      case 'metrics':
        return (
          <MetricsPage
            page={page}
            setPage={setPage}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        );

      case 'complete':
        return (
          <CompletePage
            page={page}
            setPage={setPage}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            score={score}
            difficulty={difficulty}
            resetToLanding={resetToLanding}
          />
        );

      case 'quiz':
      default:
        return (
          <QuizPage
            page={page}
            setPage={setPage}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            currentQuestion={currentQuestion}
            score={score}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            questions={questions}
            handleAnswer={handleAnswer}
            handleNext={handleQuizNext}
          />
        );
    }
  };

  return (
    <>
      {renderPage()}
      <Analytics />
    </>
  )
};

export default ConstitutionCompass;
