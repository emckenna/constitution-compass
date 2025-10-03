import React from 'react';
import { Zap, BookOpen, Loader } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { topics } from '../data/questions';

const SetupPage = ({
  page,
  setPage,
  mobileMenuOpen,
  setMobileMenuOpen,
  useAI,
  setUseAI,
  difficulty,
  setDifficulty,
  topic,
  setTopic,
  loading,
  error,
  startNewQuiz,
  startHardcodedQuiz,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation
        page={page}
        setPage={setPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <div className="min-h-screen flex items-center justify-center p-4 pt-20">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
          <h2 className="text-3xl font-bold text-indigo-900 mb-6 text-center">Customize Your Quiz</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-900 mb-3">{error}</p>
              <button
                onClick={startHardcodedQuiz}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Use Hardcoded Quiz
              </button>
            </div>
          )}

          {/* AI Toggle */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Quiz Mode</label>
            <div className="flex gap-3">
              <button
                onClick={() => setUseAI(true)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                  useAI
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Zap size={20} />
                AI Generated
              </button>
              <button
                onClick={() => setUseAI(false)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                  !useAI
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <BookOpen size={20} />
                Hardcoded
              </button>
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Difficulty Level</label>
            <div className="grid grid-cols-3 gap-3">
              {['easy', 'medium', 'hard'].map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  disabled={!useAI}
                  className={`py-3 px-4 rounded-lg font-semibold transition ${
                    difficulty === level && useAI
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } ${!useAI ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Topic Focus</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={!useAI}
              className={`w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none ${
                !useAI ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''
              }`}
            >
              {topics.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {useAI && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-sm text-blue-900">
              ✨ AI will generate unique questions based on your selections
            </div>
          )}

          <button
            onClick={startNewQuiz}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={20} />
                Generating Questions...
              </>
            ) : (
              <>
                Start Quiz →
              </>
            )}
          </button>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SetupPage;
