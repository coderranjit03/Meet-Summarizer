# Meet Summarizer

A modern, AI-powered web application that converts meeting recordings and transcripts into clean, structured summaries with action items and decisions. Built with React, Vite, and TailwindCSS, featuring a beautiful gradient UI and local-first processing.

## 🚀 Features

- **AI-Powered Summarization**: Intelligent text summarization using extractive algorithms
- **Action Item Extraction**: Automatically identifies and extracts action items from meeting content
- **Decision Tracking**: Captures key decisions made during meetings
- **Multiple Input Formats**: Support for audio/video files, transcripts (.txt, .srt, .vtt), and direct text input
- **Export Options**: Download summaries as TXT, Markdown, or print to PDF
- **Modern UI**: Beautiful gradient design with smooth animations and responsive layout
- **Local Processing**: Client-side processing for privacy and speed
- **Authentication System**: Built-in modal-based authentication (demo implementation)
- **Real-time Progress**: Visual progress indicators during processing

## 🛠️ Tech Stack

### Frontend
- **React 18** with React Router 6 for SPA routing
- **Vite** for fast development and building
- **JavaScript** for type safety and modern development
- **TailwindCSS 3** for utility-first styling
- **Radix UI** for accessible component primitives
- **Framer Motion** for smooth animations
- **React Query** for state management
- **Lucide React** for beautiful icons

### Development Tools
- **PNPM** for efficient package management
- **Prettier** for code formatting
- **Vitest** for testing
- **PostCSS** for CSS processing

### Deployment
- **Netlify** ready with configuration
- **Vite Preview** for production builds

## 📁 Project Structure

```
meetSummerizer/
├── FrontEnd/                    # Main application directory
│   ├── client/                  # React frontend application
│   │   ├── components/          # Reusable UI components
│   │   │   ├── ui/             # Radix UI component library
│   │   │   ├── layout/         # Header, Footer components
│   │   │   └── AuthModal.jsx   # Authentication modal
│   │   ├── pages/              # Route components
│   │   │   ├── Landing.jsx     # Homepage with features
│   │   │   ├── AppMain.jsx     # Main application interface
│   │   │   └── NotFound.jsx    # 404 page
│   │   ├── lib/                # Utility functions and contexts
│   │   │   ├── summarizer.js   # AI summarization logic
│   │   │   ├── subtitle.js     # SRT/VTT parsing
│   │   │   ├── authModalContext.jsx # Authentication state
│   │   │   └── utils.js        # Helper utilities
│   │   ├── hooks/              # Custom React hooks
│   │   ├── public/             # Static assets
│   │   ├── App.jsx             # Main app component with routing
│   │   ├── main.jsx            # Application entry point
│   │   └── global.css          # Global styles and TailwindCSS
│   ├── package.json            # Dependencies and scripts
│   ├── vite.config.js          # Vite configuration
│   ├── tailwind.config.js      # TailwindCSS configuration
│   ├── netlify.toml            # Netlify deployment config
│   └── AGENTS.md               # Development documentation
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PNPM (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd meetSummerizer
   ```

2. **Navigate to the frontend directory**
   ```bash
   cd FrontEnd
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080` to view the application.

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Preview production build
pnpm test         # Run tests
pnpm format.fix   # Format code with Prettier
pnpm typecheck    # Run TypeScript type checking
```

## 🎯 How It Works

### 1. Input Processing
- **Audio/Video Files**: Upload media files for simulated transcription
- **Transcript Files**: Support for .txt, .srt, and .vtt formats
- **Direct Text**: Paste meeting notes or transcripts directly

### 2. AI Summarization
The application uses an extractive summarization algorithm that:
- Tokenizes and processes text
- Calculates word frequencies (excluding stopwords)
- Scores sentences based on word importance
- Selects the most relevant sentences
- Maintains original sentence order for coherence

### 3. Content Extraction
- **Action Items**: Identifies tasks using pattern matching for action words
- **Decisions**: Extracts decisions using decision-related keywords
- **Summary**: Generates concise, structured overviews

### 4. Export Options
- **Copy to Clipboard**: Quick sharing
- **TXT Download**: Plain text format
- **Markdown Download**: Formatted for documentation
- **PDF Print**: Professional formatting for printing

## 🎨 UI Components

The application features a comprehensive UI component library built on Radix UI:

- **Layout Components**: Header, Footer, Cards
- **Form Elements**: Buttons, Inputs, Textareas, Selects
- **Feedback**: Progress bars, Toasts, Alerts
- **Navigation**: Tabs, Accordions, Menus
- **Overlays**: Modals, Dialogs, Tooltips

## 🔧 Configuration

### TailwindCSS
The project uses a custom TailwindCSS configuration with:
- CSS custom properties for theming
- Gradient color schemes
- Custom animations (shimmer, float)
- Responsive design utilities

### Vite Configuration
- React with SWC for fast compilation
- Path aliases for clean imports (`@/` for client, `@shared/` for shared)
- Development server on port 8080
- Build output to `../dist/spa`

## 🚀 Deployment

### Netlify (Recommended)
The project is configured for Netlify deployment:

1. **Build Command**: `npm run build`
2. **Publish Directory**: `dist/spa`
3. **Functions**: Configured for serverless functions
4. **Redirects**: API routes properly configured

### Manual Deployment
```bash
# Build the application
pnpm build

# The built files will be in dist/spa/
# Deploy the contents to your hosting provider
```

## 🔐 Authentication

The application includes a demo authentication system:
- Modal-based sign-in/sign-up interface
- Context-based state management
- Simulated authentication (no backend integration)
- Protected routes and features

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🎯 Key Features Explained

### Summarization Algorithm
The core summarization uses:
- **Tokenization**: Splits text into words, removing punctuation
- **Stopword Filtering**: Removes common words that don't add meaning
- **Frequency Analysis**: Calculates word importance scores
- **Sentence Scoring**: Combines word scores with length penalties
- **Selection**: Picks the most relevant sentences maintaining order

### Action Item Detection
Uses regex patterns to identify:
- Action verbs (will, should, need to, follow up, etc.)
- Task-related keywords (assign, due, deadline, prepare, etc.)
- Contextual phrases that indicate actionable items

### Decision Extraction
Identifies decision-making language:
- Decision verbs (decided, agreed, approved, chose, etc.)
- Conclusion phrases (finalized, go with, opt for, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Radix UI** for accessible component primitives
- **TailwindCSS** for utility-first CSS framework
- **Framer Motion** for smooth animations
- **Lucide** for beautiful icons
- **Vite** for fast development experience

---

**Meet Summarizer** - Transform your meetings into actionable insights with AI-powered summarization.
