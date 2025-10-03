import React, { useState, useCallback } from 'react';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

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

const ConstitutionCompass = () => {
  const [stage, setStage] = useState('landing'); // landing, quiz, complete
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState([]);

  const startNewQuiz = useCallback(() => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 10));
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setStage('quiz');
  }, []);

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
      setStage('complete');
    }
  };

  const resetToLanding = () => {
    setStage('landing');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuestions([]);
  };

  // Footer Component with both links
  const Footer = () => (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
        <a 
          href="https://amzn.to/3IMOCH6" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-indigo-700 hover:text-indigo-900 font-semibold"
        >
          <span>📜</span>
          <span>Get a Pocket Constitution!</span>
          <span className="text-xs text-gray-500">(affiliate)</span>
        </a>
        <span className="text-gray-300">|</span>
        <a 
          href="https://buymeacoffee.com/ericmckenna" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-amber-700 hover:text-amber-900 font-semibold"
        >
          <span>☕</span>
          <span>Buy me a coffee</span>
        </a>
      </div>
    </div>
  );

  // Landing Page
  if (stage === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white opacity-10 rounded-full -ml-64 -mb-64"></div>
        
        <div className="relative z-10 text-center max-w-4xl">
          {/* Stars decoration */}
           <div className="text-6xl mb-12">🦅</div>
          
          {/* Animated Icon */}
          <div className="text-9xl mb-12 animate-bounce">📜</div>
          
          {/* Title */}
          <h1 className="text-7xl font-extrabold text-indigo-900 mb-6 leading-tight">
            Constitution<br />Compass
          </h1>
          
          {/* Subtitle */}
          <div className="text-4xl font-semibold text-indigo-700 mb-8">
            Test Your Knowledge
          </div>
          
          {/* Description */}
          <p className="text-2xl text-indigo-800 mb-12 max-w-2xl mx-auto">
            Interactive quiz on the U.S. Constitution
          </p>
          
          {/* Badge */}
          <div className="inline-block bg-white bg-opacity-90 px-8 py-4 rounded-full text-xl font-semibold text-indigo-700 mb-12 shadow-lg">
            🎓 Free Quiz • 10 Random Questions
          </div>
          
          {/* Start Button */}
          <div>
            <button
              onClick={startNewQuiz}
              className="bg-indigo-600 text-white px-12 py-6 rounded-2xl text-2xl font-bold hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-2xl"
            >
              Start Quiz →
            </button>
          </div>
          
          {/* Footer */}
          <div className="mt-16">
            <Footer />
          </div>
        </div>
      </div>
    );
  }

  // Complete Page
  if (stage === 'complete') {
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
          
          {/* Buy Me a Coffee QR Code */}
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-600 mb-3">Enjoyed the quiz? Support this project!</p>
            <a 
              href="https://buymeacoffee.com/ericmckenna" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img 
                src="/coffee-qr.png" 
                alt="Buy Me a Coffee QR Code"
                className="w-40 h-40 mx-auto border-2 border-amber-200 rounded-lg p-2 hover:border-amber-400 transition"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div style={{ display: 'none' }} className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                <p className="text-amber-900 font-semibold">☕ Buy me a coffee</p>
                <p className="text-xs text-amber-700 mt-1">Scan QR or click to support</p>
              </div>
            </a>
          </div>

          <div className="space-y-3">
            <button
              onClick={startNewQuiz}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
            >
              <RefreshCw size={20} />
              Take Another Quiz
            </button>
            
            <button
              onClick={resetToLanding}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              ← Back to Home
            </button>
          </div>
          
          <Footer />
        </div>
      </div>
    );
  }

  // Quiz Page
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

        <Footer />
      </div>
    </div>
  );
};

export default ConstitutionCompass;
