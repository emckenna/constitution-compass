import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const LandingPage = ({ page, setPage, mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation
        page={page}
        setPage={setPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <div className="min-h-screen flex items-center justify-center p-4 pt-24 relative overflow-hidden">
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
            🎓 AI-Powered Questions • Customizable Difficulty
          </div>

          <div>
            <button
              onClick={() => setPage('setup')}
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
};

export default LandingPage;
