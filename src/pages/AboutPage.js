import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const AboutPage = ({ page, setPage, mobileMenuOpen, setMobileMenuOpen }) => {
  const [changelogOpen, setChangelogOpen] = useState(false);
  const [changelog, setChangelog] = useState('');

  useEffect(() => {
    // Fetch changelog
    fetch('/docs/CHANGELOG.md')
      .then(response => response.text())
      .then(text => setChangelog(text))
      .catch(err => console.error('Error loading changelog:', err));
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
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-6">About Constitution Compass</h1>

          <div className="prose prose-indigo max-w-none">
            <h2 className="text-2xl font-semibold text-indigo-800 mt-8 mb-4">What is this?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Constitution Compass is an interactive quiz application designed to test and improve your knowledge of the United States Constitution. Whether you're a student, educator, or civically engaged citizen, this tool makes learning about our founding document engaging and accessible.
            </p>

            <h2 className="text-2xl font-semibold text-indigo-800 mt-8 mb-4">Built with AI</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This application was <i>mostly</i> built using <strong>Claude AI</strong> (Anthropic's large language model) as a development partner. The entire codebase, from the React components to the Tailwind styling, was created through an iterative conversation with Claude, demonstrating how AI can accelerate modern web development.
            </p>

            <h2 className="text-2xl font-semibold text-indigo-800 mt-8 mb-4">Technology Stack</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Node.js 22</strong> - Runtime environment</li>
              <li><strong>React 18</strong> - Modern UI framework</li>
              <li><strong>Tailwind CSS</strong> - Utility-first styling</li>
              <li><strong>Lucide React</strong> - Beautiful icon library</li>
              <li><strong>Vercel</strong> - Deployment and hosting</li>
              <li><strong>Vercel Postgres (Neon)</strong> - Regional score tracking and analytics</li>
              <li><strong>Vercel Analytics</strong> - User behavior insights</li>
              <li><strong>GitHub Actions</strong> - CI/CD with tag-based deployments</li>
              <li><strong>Google Gemini API</strong> - AI-powered question generation (gemini-2.0-flash-exp)</li>
              <li><strong>ipapi.co</strong> - IP geolocation for regional tracking</li>
              <li><strong>Claude AI</strong> - Development assistance</li>
            </ul>

            <h2 className="text-2xl font-semibold text-indigo-800 mt-8 mb-4">Portfolio & Networking</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This project showcases my full-stack development capabilities—from React component architecture and state management to serverless functions, AI integration, and database design with Postgres. It demonstrates practical problem-solving and the ability to ship a polished, production-ready application.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Also navigating the job market?</strong> I know how challenging it can be. I built this not just to showcase technical skills, but also to connect with others—whether you're hiring, looking for opportunities yourself, or just want to talk shop about building with AI and modern web tech.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The codebase is currently private to protect the work, but I'm happy to walk through the architecture, share code samples, or discuss technical decisions with recruiters, hiring managers, and fellow developers. Let's connect!
            </p>

            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 my-6">
              <p className="text-indigo-900 font-semibold mb-3">Let's Connect!</p>
              <p className="text-indigo-800 text-sm mb-4">Whether you're hiring, job searching, or just want to connect:</p>
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
                  Connect on LinkedIn - Open to Opportunities
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
                <a
                  href="https://x.com/USConstCompass"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Follow @USConstCompass
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-4 my-6">
              <p className="text-purple-900 font-semibold mb-2 flex items-center gap-2">
                🎵 Coding Soundtrack
              </p>
              <p className="text-purple-800 text-sm mb-3">
                Need some synthwave vibes for your next coding session?
              </p>
              <a
                href="https://music.apple.com/us/playlist/morning-vibes/pl.u-qxyllD6CxZJr5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043a5.046 5.046 0 0 0-1.877-.636C18.636.055 17.595 0 16.554 0c-1.02 0-2.04.055-3.06.174-1.197.12-2.394.24-3.59.36-.78.12-1.56.24-2.34.36a.644.644 0 0 1-.72-.48c-.12-.36-.24-.72-.36-1.08C6.304-.48 6.124-.66 5.944-.78 5.764-.9 5.584-.96 5.404-.96c-.12 0-.24 0-.36.06-.36.12-.72.24-1.08.36-.36.12-.72.24-1.08.36-.36.12-.72.24-1.08.36-.36.12-.72.24-1.08.36C.304.66.064.9.004 1.26c-.06.36 0 .72.18 1.02.18.3.48.48.84.54.6.12 1.2.24 1.8.36.36.06.72.18 1.08.24.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18.36.06.72.12 1.08.18zm-23.88 7.2c.12-.36.24-.72.36-1.08.12-.36.24-.72.36-1.08.12-.36.24-.72.36-1.08.12-.36.24-.72.36-1.08.12-.36.24-.72.36-1.08.12-.36.24-.72.36-1.08.12-.36.24-.72.36-1.08.12-.36.24-.72.36-1.08.12-.36.24-.72.36-1.08.12-.36.24-.72.36-1.08v16.8c-.12-.36-.24-.72-.36-1.08-.12-.36-.24-.72-.36-1.08-.12-.36-.24-.72-.36-1.08-.12-.36-.24-.72-.36-1.08-.12-.36-.24-.72-.36-1.08-.12-.36-.24-.72-.36-1.08-.12-.36-.24-.72-.36-1.08-.12-.36-.24-.72-.36-1.08-.12-.36-.24-.72-.36-1.08-.12-.36-.24-.72-.36-1.08z"/>
                </svg>
                Check out my Morning Vibes playlist
              </a>
            </div>

            <h2 className="text-2xl font-semibold text-indigo-800 mt-8 mb-4">Features</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>AI-generated questions using Google Gemini API</li>
              <li>Customizable difficulty levels (Easy, Medium, Hard)</li>
              <li>Topic-specific quizzes covering all aspects of the Constitution</li>
              <li>Mix of multiple choice and true/false questions</li>
              <li>Detailed explanations for each answer</li>
              <li>Fallback to hardcoded questions if AI is unavailable</li>
              <li>Remembers your quiz preferences</li>
              <li><strong>Regional score tracking</strong> - Anonymously tracks quiz performance by geographic region</li>
              <li><strong>Analytics dashboard</strong> - View how different regions perform (coming soon)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-indigo-800 mt-8 mb-4">Regional Analytics</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Constitution Compass now tracks quiz scores by region to help understand Constitutional knowledge across different areas. Using IP-based geolocation, we anonymously record your region and quiz performance to build insights into how different parts of the country perform on Constitution trivia.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-900">
                <strong>Privacy:</strong> Only region-level data is collected (e.g., "California"). No personal information or precise locations are stored. IP addresses are used only for region lookup and are not saved.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-indigo-800 mt-8 mb-4">Roadmap</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Interactive analytics dashboard showing regional performance</li>
              <li>Historical trending of Constitutional knowledge over time</li>
              <li>Free-text question support with AI evaluation</li>
              <li>Leaderboards by region</li>
              <li>More question topics and categories</li>
            </ul>

            <h2 className="text-2xl font-semibold text-indigo-800 mt-8 mb-4">Development Standards</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This project follows industry best practices for versioning and documentation:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>
                <strong>Versioning:</strong> Follows{' '}
                <a href="https://semver.org/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 underline">
                  Semantic Versioning
                </a>{' '}
                (SemVer) for clear version management
              </li>
              <li>
                <strong>Changelog:</strong> Maintains a structured changelog following{' '}
                <a href="https://keepachangelog.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 underline">
                  Keep a Changelog
                </a>{' '}
                format
              </li>
              <li>
                <strong>Deployment:</strong> Automated CI/CD pipeline with tag-based releases
              </li>
            </ul>
          </div>

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
};

export default AboutPage;
