import React, { useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useScoreTracking } from '../hooks/useScoreTracking';

const CompletePage = ({
  page,
  setPage,
  mobileMenuOpen,
  setMobileMenuOpen,
  score,
  difficulty,
  resetToLanding,
}) => {
  const { region, country, saveScore } = useScoreTracking();

  // Save score when component mounts
  useEffect(() => {
    const recordScore = async () => {
      await saveScore(score, 10, difficulty);
    };

    recordScore();
  }, [score, difficulty, saveScore]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation
        page={page}
        setPage={setPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
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
            {region && (
              <p className="text-sm text-gray-500 mt-2">
                📍 {region}, {country}
              </p>
            )}
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
                src="/images/coffee-qr.png"
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
              onClick={() => setPage('setup')}
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
};

export default CompletePage;
