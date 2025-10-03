import React from 'react';

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

export default Footer;
