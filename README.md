# Constitution Compass

[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<div align="center">
  <h3 align="center">Constitution Compass</h3>
  <p align="center">
    Interactive quiz application for learning about the U.S. Constitution
    <br />
    <a href="https://constitution-compass.vercel.app"><strong>Try it Live »</strong></a>
    <br />
    <br />
    <a href="https://github.com/emckenna/constitution-compass/issues/new?template=bug_report.md">Report Bug</a>
    ·
    <a href="https://github.com/emckenna/constitution-compass/issues/new?template=feature_request.md">Request Feature</a>
    ·
    <a href="https://github.com/emckenna/constitution-compass/issues/new?template=feedback.md">Send Feedback</a>
  </p>
</div>

## About The Project

Constitution Compass is an interactive quiz application designed to test and improve your knowledge of the United States Constitution. Whether you're a student, educator, or civically engaged citizen, this tool makes learning about our founding document engaging and accessible.

**Live Application:** [https://constitution-compass.vercel.app](https://constitution-compass.vercel.app)

**Project Documentation:**
- 📋 [CHANGELOG](CHANGELOG.md) - View all releases and updates
- 📄 [LICENSE](LICENSE) - Copyright and usage terms

### Key Features

- 🤖 **AI-Powered Question Generation** - Dynamic questions using Google Gemini API
- 📊 **Regional Analytics** - Track quiz performance by geographic region
- 🎯 **Customizable Difficulty** - Easy, Medium, and Hard levels
- 📚 **Topic-Specific Quizzes** - Focus on specific Constitutional topics
- 💡 **Detailed Explanations** - Learn from each answer
- 📱 **Responsive Design** - Works on all devices
- 🔒 **Privacy-Focused** - Only regional data collected, no personal information

### Built With AI

This application was primarily built using **Claude AI** (Anthropic's large language model) as a development partner. The codebase demonstrates how AI can accelerate modern web development while maintaining code quality and best practices.

### Technology Stack

- **Frontend:** React 19, Tailwind CSS, Lucide React icons
- **Backend:** Node.js 22, Vercel Serverless Functions
- **Database:** Neon Serverless Postgres (via Vercel)
- **AI Services:** Google Gemini API (gemini-2.0-flash-exp), Claude AI (development)
- **Analytics:** Vercel Analytics
- **Hosting:** Vercel
- **CI/CD:** GitHub Actions with tag-based deployments
- **Geolocation:** Vercel headers + ipapi.co fallback

## Getting Started

### Prerequisites

- Node.js 22 or higher
- npm or yarn
- Google Gemini API key (for AI-generated questions)
- Neon Postgres database (for score tracking)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/emckenna/constitution-compass.git
   cd constitution-compass
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env.local` file with required environment variables
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   DATABASE_URL=your_neon_postgres_connection_string
   ```

4. Initialize the database
   ```bash
   # After deploying to Vercel, visit:
   https://your-app.vercel.app/api/init-db
   ```

5. Run the development server
   ```bash
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

**Note:** AI-generated questions require the Gemini API and will only work in production (Vercel). For local development, the app falls back to hardcoded questions.

## Deployment

This project uses a **preview-then-promote** workflow for safe deployments:

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and push**
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin feature/your-feature-name
   ```

3. **Preview deployment automatically created**
   - GitHub Actions automatically deploys to Vercel preview URL
   - Test your changes on the preview URL before merging

4. **Create Pull Request**
   - Open PR to merge into `main`
   - Preview URL will be commented on the PR

5. **Merge and deploy to production**
   ```bash
   git checkout main
   git pull
   npm run deploy-quick  # Auto-tags and deploys to production
   ```

### Deployment Commands

**Quick Deploy (Patch Version)**
```bash
npm run deploy-quick
```

**Interactive Deploy**
```bash
npm run deploy
```

The deploy script:
- Checks for uncommitted changes
- Auto-pushes commits if needed
- Creates and pushes version tags
- Triggers GitHub Actions workflow
- Deploys to Vercel production automatically

### Deployment Environments

- **Preview:** All feature branches and PRs → `https://constitution-compass-<hash>.vercel.app`
- **Production:** Tagged releases on `main` → `https://constitution-compass.vercel.app`

## API Endpoints

- `POST /api/generate-questions` - Generate AI quiz questions
- `GET /api/get-region` - Get user's geographic region
- `POST /api/save-score` - Save quiz score to database
- `GET /api/stats` - Get regional statistics
- `GET /api/init-db` - Initialize database tables (run once)
- `GET /api/migrate-db` - Run database migrations

## Features Roadmap

- [ ] Interactive analytics dashboard
- [ ] Historical trending analysis
- [ ] Regional leaderboards
- [ ] Free-text questions with AI evaluation
- [ ] Automated daily trivia posts to X/Twitter
- [ ] More question topics and categories
- [ ] User accounts and progress tracking

## Contributing

**This repository is for portfolio and demonstration purposes.**

While I appreciate your interest, I am **not accepting contributions** at this time as this is a personal portfolio project. However, I welcome:

- 🐛 **Bug reports** via [GitHub Issues](https://github.com/emckenna/constitution-compass/issues/new?template=bug_report.md)
- 💡 **Feature suggestions** via [GitHub Issues](https://github.com/emckenna/constitution-compass/issues/new?template=feature_request.md)
- 💬 **General feedback** via [GitHub Issues](https://github.com/emckenna/constitution-compass/issues/new?template=feedback.md)

## License & Copyright

**© 2024-2025 Eric McKenna. All Rights Reserved.**

This project is **publicly viewable** for transparency and educational purposes, but remains protected by copyright.

### Usage Policy

- ✅ **View and learn** from the code
- ✅ **Use the live application** at [constitution-compass.vercel.app](https://constitution-compass.vercel.app)
- ✅ **Report bugs and suggest features** via GitHub Issues
- ⚠️ **Do NOT** copy, fork, or redistribute this code without explicit permission
- ⚠️ **Do NOT** use this code commercially without a license agreement

### Why This Approach?

This is a **portfolio project** showcasing technical capabilities to employers and collaborators. Making it public allows:

- 📊 Transparency in demonstrating skills and coding practices
- 🤝 Community feedback and bug reports
- 🎓 Others to learn from the implementation
- 🔒 Protection of intellectual property and future opportunities

### Want to Use This Code?

If you're interested in licensing this code or discussing collaboration:
- 📧 Email: eric.mckenna@gmail.com
- 💼 LinkedIn: [linkedin.com/in/ericmckenna](https://www.linkedin.com/in/ericmckenna/)
- 🐦 X/Twitter: [@USConstCompass](https://x.com/USConstCompass)

For **recruiters and hiring managers**: I'm happy to walk through the architecture, discuss technical decisions, and demonstrate how these skills apply to your needs.

## Contact

**Eric McKenna**

- 💼 LinkedIn: [linkedin.com/in/ericmckenna](https://www.linkedin.com/in/ericmckenna/) - Open to opportunities
- 🐦 X/Twitter: [@USConstCompass](https://x.com/USConstCompass)
- 💻 GitHub: [@emckenna](https://github.com/emckenna)
- 🌐 Live App: [constitution-compass.vercel.app](https://constitution-compass.vercel.app)

**Portfolio Context:** This project showcases full-stack development capabilities—from React component architecture and state management to serverless functions, AI integration, and database design with Postgres. It demonstrates practical problem-solving and the ability to ship a polished, production-ready application.

**Job Seeking?** I know how challenging the market can be. I built this to showcase technical skills and connect with others—whether you're hiring, looking for opportunities yourself, or want to discuss building with AI and modern web tech.

## Acknowledgments

- Built primarily with [Claude AI](https://claude.ai) by Anthropic
- Powered by [Google Gemini API](https://ai.google.dev/gemini-api)
- Hosted on [Vercel](https://vercel.com)
- Database by [Neon](https://neon.tech)
- Icons by [Lucide](https://lucide.dev)
- Versioning follows [Semantic Versioning](https://semver.org/)
- Changelog format based on [Keep a Changelog](https://keepachangelog.com/)
- README template inspired by [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

---

**🇺🇸 Learn the Constitution. Know your rights. Be an informed citizen.**

<!-- MARKDOWN LINKS & IMAGES -->
[issues-shield]: https://img.shields.io/github/issues/emckenna/constitution-compass.svg?style=for-the-badge
[issues-url]: https://github.com/emckenna/constitution-compass/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/ericmckenna
