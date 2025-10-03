# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

## [0.0.7] - 2025-10-03

### Changed
- Refactored to use Google Gemini SDK

## [0.0.6] - 2025-10-03

### Changed
- Changed gemini API endpoint

## [0.0.5] - 2025-10-03

### Added
- Modular component architecture with separate page components
- Custom hooks for state management (usePreferences, useQuizState)
- Dedicated data directory for questions and topics
- Serverless API function for AI question generation via Gemini API

### Changed
- Refactored monolithic App.js (744 lines) into 11 modular files
- Moved API endpoint from src/api to /api for Vercel serverless functions
- Simplified local development setup (use hardcoded mode locally, AI on Vercel)
- Improved code maintainability and testability with separation of concerns

### Removed
- Development server.js (simplified to use Vercel deployment model)

## [0.0.4] - 2024-10-03

### Added
- About page showcasing technology and build process
- Changelog page with collapsible version history
- Tag-based deployment via GitHub Actions
- Vercel deployment configuration

### Changed
- Refined landing page spacing and animations
- Updated footer link text for better clarity

## [0.0.3] - 2024-10-02

### Added
- Landing page with animated bouncing parchment scroll and eagle emoji
- Beautiful gradient background with decorative elements
- "Start Quiz" button to begin from landing page
- "Back to Home" button on completion page
- Three-stage navigation (Landing → Quiz → Complete → Landing)
- Buy Me a Coffee integration with QR code on completion page
- Amazon affiliate link for pocket Constitution in footer
- Footer component displayed on all pages with both support links
- Responsive design with Tailwind CSS
- SEO optimization with comprehensive meta tags
- Open Graph image for social media sharing
- Custom parchment scroll favicon

### Changed
- Restructured app to use stage-based navigation
- Improved visual hierarchy and spacing throughout

## [0.0.2] - 2024-10-02

### Added
- Interactive quiz functionality with 10 random questions
- Question pool of 20 Constitution-related questions
- Score tracking throughout quiz
- Progress bar showing question advancement
- Immediate feedback with green (correct) and red (incorrect) highlighting
- Results page with performance-based messages
- "Take Another Quiz" functionality with question reshuffling

### Changed
- Moved hardcoded questions outside component for better performance
- Optimized React hooks to eliminate warnings

## [0.0.1] - 2024-10-02

### Added
- Initial project setup with Create React App
- Tailwind CSS configuration
- Basic component structure
- Lucide React icons integration

[unreleased]: https://github.com/emckenna/constitutional-compass/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/emckenna/constitutional-compass/releases/tag/v1.0.0
[0.0.3]: https://github.com/emckenna/constitutional-compass/releases/tag/v0.0.3
[0.0.2]: https://github.com/emckenna/constitutional-compass/releases/tag/v0.0.2
[0.0.1]: https://github.com/emckenna/constitutional-compass/releases/tag/v0.0.1