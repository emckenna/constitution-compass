import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const ConstitutionQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [questions, setQuestions] = useState([]);

  const allQuestions = [
    {
      q: "How many articles are in the original U.S. Constitution?",
      a: ["5", "7", "10", "12"],
      correct: 1
    },
    {
      q: "Which article establishes the Legislative Branch?",
      a: ["Article I", "Article II", "Article III", "Article IV"],
      correct: 0
    },
    {
      q: "How many senators does each state have?",
      a: ["One", "Two", "Three", "Depends on population"],
      correct: 1
    },
    {
      q: "What is the minimum age requirement to be President?",
      a: ["30 years", "35 years", "40 years", "45 years"],
      correct: 1
    },
    {
      q: "Which article establishes the Judicial Branch?",
      a: ["Article I", "Article II", "Article III", "Article IV"],
      correct: 2
    },
    {
      q: "How many amendments are in the Bill of Rights?",
      a: ["5", "10", "15", "27"],
      correct: 1
    },
    {
      q: "What fraction of Congress is needed to override a presidential veto?",
      a: ["Simple majority", "Three-fifths", "Two-thirds", "Three-fourths"],
      correct: 2
    },
    {
      q: "Who has the power to declare war?",
      a: ["President", "Congress", "Supreme Court", "Secretary of Defense"],
      correct: 1
    },
    {
      q: "How long is a term for a U.S. Senator?",
      a: ["2 years", "4 years", "6 years", "8 years"],
      correct: 2
    },
    {
      q: "What is required to amend the Constitution?",
      a: ["Majority vote in Congress", "Two-thirds of both houses and three-fourths of states", "Presidential approval", "Supreme Court ruling"],
      correct: 1
    },
    {
      q: "Who becomes President if both the President and Vice President cannot serve?",
      a: ["Secretary of State", "Speaker of the House", "Senate Majority Leader", "Chief Justice"],
      correct: 1
    },
    {
      q: "Which amendment guarantees freedom of speech?",
      a: ["First Amendment", "Second Amendment", "Fourth Amendment", "Fifth Amendment"],
      correct: 0
    },
    {
      q: "How many members are in the House of Representatives?",
      a: ["100", "435", "535", "538"],
      correct: 1
    },
    {
      q: "Who presides over the Senate?",
      a: ["President", "Vice President", "Senate Majority Leader", "Speaker"],
      correct: 1
    },
    {
      q: "Which article describes the amendment process?",
      a: ["Article IV", "Article V", "Article VI", "Article VII"],
      correct: 1
    },
    {
      q: "What is the supreme law of the land according to the Constitution?",
      a: ["State constitutions", "Federal laws", "The Constitution itself", "Supreme Court decisions"],
      correct: 2
    },
    {
      q: "How long is a term for a U.S. Representative?",
      a: ["2 years", "4 years", "6 years", "8 years"],
      correct: 0
    },
    {
      q: "Which amendment protects against unreasonable searches and seizures?",
      a: ["Second Amendment", "Third Amendment", "Fourth Amendment", "Fifth Amendment"],
      correct: 2
    },
    {
      q: "Who has the sole power of impeachment?",
      a: ["Senate", "House of Representatives", "Supreme Court", "President"],
      correct: 1
    },
    {
      q: "Who tries impeachment cases?",
      a: ["House of Representatives", "Senate", "Supreme Court", "Federal courts"],
      correct: 1
    }
  ];

  useEffect(() => {
    startNewQuiz();
  }, []);

  const startNewQuiz = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 10));
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizComplete(false);
  };

  const handleAnswer = (index) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  if (questions.length === 0) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (quizComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-center text-indigo-900 mb-6">Quiz Complete!</h2>
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-indigo-600 mb-2">{score}/10</div>
            <p className="text-xl text-gray-600">
              {score >= 9 ? "Constitutional Scholar! 🎓" :
               score >= 7 ? "Well Done! 📚" :
               score >= 5 ? "Good Effort! 📖" :
               "Keep Studying! 📝"}
            </p>
          </div>
          <button
            onClick={startNewQuiz}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} />
            Take Another Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
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

        <h2 className="text-2xl font-bold text-gray-800 mb-6">{currentQ.q}</h2>

        <div className="space-y-3 mb-6">
          {currentQ.a.map((answer, index) => {
            const isCorrect = index === currentQ.correct;
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
                <span className="font-medium text-gray-800">{answer}</span>
                {icon}
              </button>
            );
          })}
        </div>

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
      </div>
    </div>
  );
};

export default ConstitutionQuiz;
