# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2025-10-05

### Added
- Analytics dashboard with Recharts visualization
  - Overview cards showing total quizzes, average scores, and participating regions
  - Bar chart for difficulty performance breakdown
  - Regional rankings table with difficulty filter
  - Auto-detects localhost for mock data vs production for live API data
- Preview deployment workflow for safe testing before production
  - GitHub Action for automatic preview deployments on all feature branches
  - Preview URLs automatically commented on pull requests
  - Preview-then-promote workflow documented in README
- Transparent logo in navigation (replaced emoji with actual logo image)
- Stats API now excludes owner IP (108.48.37.101) from analytics

### Changed
- Updated metrics page header to "Our Constitutional Knowledge"
- Redesigned overview cards with centered bold text and larger values
- Used themed emojis (🎓⚖️🗽) for analytics cards instead of icons

### Fixed
- ESLint warnings for unused imports in MetricsPage
- Mock data toggle button error in local development

## [0.0.37] - 2025-10-05

### Added
- Initial analytics dashboard implementation with Recharts
- Stats API endpoint with difficulty breakdown

## [0.0.36] - 2025-10-05

### Security
- Removed database schema details from API responses
- Enhanced security best practices for public API endpoints

## [0.0.35] - 2025-10-05

### Added
- Automated daily Constitution quiz posting to X/Twitter (@USConstCompass)
- Daily question posted at 12pm EST (17:00 UTC)
- Daily answer posted at 2pm EST (19:00 UTC) with link to app
- Vercel Cron integration for scheduled posts
- New database table: daily_tweets for tracking posted questions

### Changed
- Switched from GitHub Actions to Vercel Cron for X posting (free on Hobby plan)
- Added 2-hour gap between question and answer posts for timing reliability

## [0.0.34] - 2025-10-05

### Added
- Comprehensive README with installation, deployment, and API documentation
- Proprietary LICENSE with copyright protection
- GitHub Issues feedback system with templates (bug report, feature request, feedback)
- X/Twitter contact integration (@USConstCompass)
- Acknowledgments for SemVer and Keep a Changelog standards

### Changed
- Made repository public with copyright protection
- Updated About page with development standards section
- Replaced email contact with X/Twitter handle in footer

## [0.0.33] - 2025-10-05

### Added
- Rate limiting for Gemini API (9 requests/minute to stay under free tier)
- Deploy-quick script option for fast patch deployments

### Fixed
- Race condition preventing region/country data from being saved to database
- Multiple database saves per quiz (React StrictMode double-invocation issue)

### Changed
- Switched from ipapi.co to Vercel geolocation headers as primary IP lookup
- Added ipapi.co as fallback for geolocation

## [0.0.32] - 2025-10-05

### Added
- IP address tracking in quiz_scores table
- Database migration endpoint for schema updates
- Better geolocation data capture for regional analytics

## Earlier Versions

See git history for detailed changes in versions prior to v0.0.32.

[Unreleased]: https://github.com/emckenna/constitution-compass/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/emckenna/constitution-compass/compare/v0.0.37...v1.0.0
[0.0.37]: https://github.com/emckenna/constitution-compass/compare/v0.0.36...v0.0.37
[0.0.36]: https://github.com/emckenna/constitution-compass/compare/v0.0.35...v0.0.36
[0.0.35]: https://github.com/emckenna/constitution-compass/compare/v0.0.34...v0.0.35
[0.0.34]: https://github.com/emckenna/constitution-compass/compare/v0.0.33...v0.0.34
[0.0.33]: https://github.com/emckenna/constitution-compass/compare/v0.0.32...v0.0.33
[0.0.32]: https://github.com/emckenna/constitution-compass/releases/tag/v0.0.32
