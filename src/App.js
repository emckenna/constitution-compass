import React, { useState, useCallback, useEffect } from 'react';
import { CheckCircle, XCircle, RefreshCw, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [page, setPage] = useState('landing'); // landing, quiz, complete, about
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [changelogOpen, setChangelogOpen] = useState(false);
  const [changelog, setChangelog] = useState('');

  useEffect(() => {
    // Fetch changelog
    fetch('/CHANGELOG.md')
      .then(response => response.text())
      .then(text => setChangelog(text))
      .catch(err => console.error('Error loading changelog:', err));
  }, []);

  const startNewQuiz = useCallback(() => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 10));
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setPage('quiz');
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
      setPage('complete');
    }
  };

  const resetToLanding = () => {
    setPage('landing');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuestions([]);
  };

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => setPage('landing')}
            className="flex items-center gap-2 text-xl font-bold text-indigo-900 hover:text-indigo-700 transition"
          >
            <span className="text-2xl">📜</span>
            <span className="hidden sm:inline">Constitutional Compass</span>
            <span className="sm:hidden">CC</span>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setPage('landing')}
              className={`font-semibold transition ${page === 'landing' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setPage('about')}
              className={`font-semibold transition ${page === 'about' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'}`}
            >
              About
            </button>
            <button
              onClick={startNewQuiz}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Start Quiz
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => { setPage('landing'); setMobileMenuOpen(false); }}
                className="text-left px-4 py-2 rounded hover:bg-gray-100 font-semibold"
              >
                Home
              </button>
              <button 
                onClick={() => { setPage('about'); setMobileMenuOpen(false); }}
                className="text-left px-4 py-2 rounded hover:bg-gray-100 font-semibold"
              >
                About
              </button>
              <button
                onClick={() => { startNewQuiz(); setMobileMenuOpen(false); }}
                className="mx-4 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700"
              >
                Start Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  // Footer Component
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

  // About Page
  if (page === 'about') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <div className="pt-24 pb-12 px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-4xl font-bold text-indigo-900 mb-6">About Constitutional Compass</h1>
            
            <div className="prose prose-indigo max-w-none">
              <h2 className="text-2xl font-semibold text-indigo-800 mt-8 mb-4">What is this?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Constitutional Compass is an interactive quiz application designed to test and improve your knowledge of the United States Constitution. Whether you're a student, educator, or civically engaged citizen, this tool makes learning about our founding document engaging and accessible.
              </p>

              <h2 className="text-2xl font-semibold text-indigo-800 mt-8 mb-4">Built with AI</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                This application was built using <strong>Claude AI</strong> (Anthropic's large language model) as a development partner. The entire codebase, from the React components to the Tailwind styling, was created through an iterative conversation with Claude, demonstrating how AI can accelerate modern web development.
              </p>

              <h2 className="text-2xl font-semibold text-indigo-800 mt-8 mb-4">Technology Stack</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li><strong>Node.js 22</strong> - Runtime environment</li>
                <li><strong>React 18</strong> - Modern UI framework</li>
                <li><strong>Tailwind CSS</strong> - Utility-first styling</li>
                <li><strong>Lucide React</strong> - Beautiful icon library</li>
                <li><strong>Vercel</strong> - Deployment and hosting</li>
                <li><strong>GitHub Actions</strong> - CI/CD with tag-based deployments</li>
                <li><strong>Claude AI</strong> - Development assistance and future dynamic question generation</li>
              </ul>

              <h2 className="text-2xl font-semibold text-indigo-800 mt-8 mb-4">Open Source</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                While the repository is currently private, I'm open to sharing the code with fellow developers interested in learning how this was built or contributing to the project. If you're interested in seeing the source code or discussing the development process, feel free to reach out!
              </p>

              <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 my-6">
                <p className="text-indigo-900 font-semibold mb-3">Want to collaborate or learn more?</p>
                <p className="text-indigo-800 text-sm mb-4">Connect with me to discuss the project or request repository access:</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.linkedin.com/in/ericmckenna/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/emckenna"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-indigo-800 mt-8 mb-4">Future Plans</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The next major feature will be <strong>AI-generated questions</strong> using Claude's API, allowing for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Custom difficulty levels (Easy, Medium, Hard)</li>
                <li>Topic-specific quizzes (Bill of Rights, Amendments, etc.)</li>
                <li>Unlimited unique questions</li>
                <li>Adaptive learning based on performance</li>
              </ul>
            </div>

            {/* Changelog Section */}
            <div className="mt-12 border-t pt-8">
              <button
                onClick={() => setChangelogOpen(!changelogOpen)}
                className="flex items-center justify-between w-full text-left"
              >
                <h2 className="text-2xl font-semibold text-indigo-800">Changelog</h2>
                {changelogOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              
              {changelogOpen && (
                <div className="mt-4 bg-gray-50 rounded-lg p-6 overflow-auto max-h-96">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                    {changelog || 'Loading changelog...'}
                  </pre>
                </div>
              )}
            </div>

            <Footer />
          </div>
        </div>
      </div>
    );
  }

  // Landing Page
  if (page === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <div className="min-h-screen flex items-center justify-center p-4 pt-24 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white opacity-10 rounded-full -ml-64 -mb-64"></div>
          
          <div className="relative z-10 text-center max-w-4xl">
            <div className="text-6xl mb-12">🦅</div>
            <div className="text-9xl mb-12 animate-bounce">📜</div>
            
            <h1 className="text-7xl font-extrabold text-indigo-900 mb-6 leading-tight">
              Constitution<br />Compass
            </h1>
            
            <div className="text-4xl font-semibold text-indigo-700 mb-8">
              Test Your Knowledge
            </div>
            
            <p className="text-2xl text-indigo-800 mb-12 max-w-2xl mx-auto">
              Interactive quiz on the U.S. Constitution
            </p>
            
            <div className="inline-block bg-white bg-opacity-90 px-8 py-4 rounded-full text-xl font-semibold text-indigo-700 mb-12 shadow-lg">
              🎓 Free Quiz • 10 Random Questions
            </div>
            
            <div>
              <button
                onClick={startNewQuiz}
                className="bg-indigo-600 text-white px-12 py-6 rounded-2xl text-2xl font-bold hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-2xl"
              >
                Start Quiz →
              </button>
            </div>
            
            <div className="mt-16">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Complete Page
  if (page === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <div className="min-h-screen flex items-center justify-center p-4 pt-20">
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
      </div>
    );
  }

  // Quiz Page
  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
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
    </div>
  );
};

export default ConstitutionCompass;
