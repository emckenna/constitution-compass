import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const QuizPage = ({
  page,
  setPage,
  mobileMenuOpen,
  setMobileMenuOpen,
  currentQuestion,
  score,
  selectedAnswer,
  showResult,
  questions,
  handleAnswer,
  handleNext,
}) => {
  const currentQ = questions[currentQuestion];

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
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold text-indigo-600">
                Question {currentQuestion + 1} of 10
              </span>
              <span className="text-sm font-semibold text-gray-600">
                Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / 10) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase">
              {currentQ.type === 'true_false' ? 'True/False' : 'Multiple Choice'}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">{currentQ.question}</h2>

          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, index) => {
              const isCorrect = index === currentQ.correctIndex;
              const isSelected = index === selectedAnswer;

              let bgColor = "bg-gray-50 hover:bg-gray-100";
              let borderColor = "border-gray-200";
              let icon = null;

              if (showResult) {
                if (isCorrect) {
                  bgColor = "bg-green-50";
                  borderColor = "border-green-500";
                  icon = <CheckCircle className="text-green-500" size={24} />;
                } else if (isSelected) {
                  bgColor = "bg-red-50";
                  borderColor = "border-red-500";
                  icon = <XCircle className="text-red-500" size={24} />;
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-lg border-2 ${borderColor} ${bgColor} transition-all flex items-center justify-between ${
                    !showResult ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <span className="font-medium text-gray-800">{option}</span>
                  {icon}
                </button>
              );
            })}
          </div>

          {showResult && currentQ.explanation && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-sm font-semibold text-blue-900 mb-1">Explanation:</p>
              <p className="text-sm text-blue-800">
                {currentQ.explanation}
                {currentQ.citation && currentQ.citationUrl && (
                  <>
                    {' '}
                    <a
                      href={currentQ.citationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline font-medium"
                    >
                      {currentQ.citation}
                    </a>
                  </>
                )}
              </p>
            </div>
          )}

          {showResult && (
            <div className="mt-6">
              <button
                onClick={handleNext}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                {currentQuestion < 9 ? 'Next Question' : 'See Results'}
              </button>
            </div>
          )}

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
