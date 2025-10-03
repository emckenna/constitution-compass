import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const AboutPage = ({ page, setPage, mobileMenuOpen, setMobileMenuOpen }) => {
  const [changelogOpen, setChangelogOpen] = useState(false);
  const [changelog, setChangelog] = useState('');

  useEffect(() => {
    // Fetch changelog
    fetch('/CHANGELOG.md')
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
              <li><strong>Google Gemini API</strong> - AI-powered question generation</li>
              <li><strong>Claude AI</strong> - Development assistance</li>
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

            <h2 className="text-2xl font-semibold text-indigo-800 mt-8 mb-4">Features</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>AI-generated questions using Google Gemini API</li>
              <li>Customizable difficulty levels (Easy, Medium, Hard)</li>
              <li>Topic-specific quizzes covering all aspects of the Constitution</li>
              <li>Mix of multiple choice and true/false questions</li>
              <li>Detailed explanations for each answer</li>
              <li>Fallback to hardcoded questions if AI is unavailable</li>
              <li>Remembers your quiz preferences</li>
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
