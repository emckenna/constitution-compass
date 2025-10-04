import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const MetricsPage = ({ page, setPage, mobileMenuOpen, setMobileMenuOpen }) => {
  const [roadmapOpen, setRoadmapOpen] = useState(true);
  const [roadmap, setRoadmap] = useState('');

  useEffect(() => {
    // Fetch roadmap from SCORE_TRACKING.md
    fetch('/docs/SCORE_TRACKING.md')
      .then(response => response.text())
      .then(text => setRoadmap(text))
      .catch(err => console.error('Error loading roadmap:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation
        page={page}
        setPage={setPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Coming Soon Banner */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg shadow-xl p-8 mb-8 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h1 className="text-4xl font-bold mb-4">Regional Analytics Dashboard</h1>
            <p className="text-xl mb-2">Coming Soon!</p>
            <p className="text-amber-100">
              We're building an interactive dashboard to visualize Constitutional knowledge across regions.
            </p>
          </div>

          {/* Feature Preview Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
                <MapPin className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Regional Performance</h3>
              <p className="text-gray-600 text-sm">
                See which regions score highest on Constitutional knowledge
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Difficulty Analysis</h3>
              <p className="text-gray-600 text-sm">
                Compare performance across Easy, Medium, and Hard quizzes
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                <Calendar className="text-purple-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Historical Trends</h3>
              <p className="text-gray-600 text-sm">
                Track Constitutional knowledge improvements over time
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <BarChart3 className="text-blue-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Leaderboards</h3>
              <p className="text-gray-600 text-sm">
                Regional rankings and top performers by difficulty
              </p>
            </div>
          </div>

          {/* Sample API Preview */}
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">API Preview</h2>
            <p className="text-gray-700 mb-6">
              The analytics backend is already live! Data is being collected from every quiz completion.
              Try the API endpoint:
            </p>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
              <div className="mb-2">
                <span className="text-gray-500"># Get regional statistics</span>
              </div>
              <div>
                curl https://your-domain.vercel.app/api/stats
              </div>
            </div>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <div className="mb-2">
                <span className="text-gray-500"># Filter by difficulty</span>
              </div>
              <div>
                curl https://your-domain.vercel.app/api/stats?difficulty=medium
              </div>
            </div>
          </div>

          {/* Technical Roadmap */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <button
              onClick={() => setRoadmapOpen(!roadmapOpen)}
              className="flex items-center justify-between w-full text-left mb-6"
            >
              <h2 className="text-2xl font-bold text-indigo-900">Technical Roadmap</h2>
              {roadmapOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>

            {roadmapOpen && (
              <div className="prose prose-indigo max-w-none">
                <p className="text-gray-700 mb-4">
                  The full technical implementation details and roadmap are documented below:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 overflow-auto max-h-96">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                    {roadmap || 'Loading roadmap...'}
                  </pre>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsPage;
