import React from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = ({ page, setPage, mobileMenuOpen, setMobileMenuOpen }) => (
  <nav className="bg-white shadow-md fixed w-full top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <button
          onClick={() => setPage('landing')}
          className="flex items-center gap-2 text-xl font-bold text-indigo-900 hover:text-indigo-700 transition"
        >
          <span className="text-2xl">📜</span>
          <span className="hidden sm:inline">Constitution Compass</span>
          <span className="sm:hidden">CC</span>
        </button>

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
            onClick={() => setPage('metrics')}
            className={`font-semibold transition ${page === 'metrics' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'}`}
          >
            Metrics
          </button>
          <button
            onClick={() => setPage('setup')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Start Quiz
          </button>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

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
              onClick={() => { setPage('metrics'); setMobileMenuOpen(false); }}
              className="text-left px-4 py-2 rounded hover:bg-gray-100 font-semibold"
            >
              Metrics
            </button>
            <button
              onClick={() => { setPage('setup'); setMobileMenuOpen(false); }}
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

export default Navigation;
