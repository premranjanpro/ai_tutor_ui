import './App.css'

interface Feature {
  icon: string;
  title: string;
  description: string;
  badge?: string;
}

interface Tech {
  name: string;
  role: string;
  details: string;
}

function App() {
  const features: Feature[] = [
    {
      icon: "🗣️",
      title: "Friendly Child Voice AI",
      description: "Uses a Hindi-English mix to speak naturally with kids. Encourages effort, teaches concepts step-by-step, and strictly follows safety guidelines.",
      badge: "Voice & Text"
    },
    {
      icon: "📚",
      title: "Interactive Study Sessions",
      description: "AI teachers explain topics in Mathematics, Science, GK, English, and Hindi. Arithmetic and objective answers are verified using local rules rather than LLM guesswork.",
      badge: "Daily Learning"
    },
    {
      icon: "🧠",
      title: "Intelligent Family Memory",
      description: "Maintains a semantic memory bank (using pgvector) of key milestones, interests, and learning goals. Sensitive child data requires parent approval before inclusion.",
      badge: "Context Aware"
    },
    {
      icon: "💼",
      title: "Adult Interview Preparation",
      description: "Designed for adult family members practicing for jobs (.NET, React, Flutter, SQL, HR, System Design). Includes real-time voice feedback, grading, and suggested answers.",
      badge: "Career Growth"
    },
    {
      icon: "🛡️",
      title: "Strict Safety & Guardrails",
      description: "Identifies clearly as an AI (no human claiming). Active safety classification checks input and output, escalating serious situations immediately to parents.",
      badge: "Child Safe"
    },
    {
      icon: "📊",
      title: "Parental Control Console",
      description: "Configure daily screen-time, session schedules, and approved topics. Review weekly learning progress summaries and manage the memory vault.",
      badge: "Full Control"
    }
  ];

  const stack: Tech[] = [
    { name: "ASP.NET Core Web API", role: "Backend Orchestration", details: "Clean Architecture, FluentValidation, Serilog, Hangfire" },
    { name: "PostgreSQL & pgvector", role: "Database & Vector Store", details: "Relational records + semantic vector indexing for memory retrieval" },
    { name: "React TypeScript", role: "Admin Portal", details: "Vite, React Router, TanStack Query, Axios, Material UI" },
    { name: "Flutter & Dart", role: "Mobile Application", details: "Riverpod state management, Speech-to-Text, Audio Player" }
  ];

  return (
    <div className="container">
      <header>
        <div className="logo-container">
          <span className="logo-text gradient-text">Family AI Companion</span>
        </div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#stack">Technology Stack</a></li>
          <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">Docs</a></li>
        </ul>
      </header>

      <main>
        <section className="hero-section" id="about">
          <span className="badge">Welcome to Admin Portal</span>
          <h1>
            The Natural Learning & <br />
            <span className="gradient-text">Voice Companion for Families</span>
          </h1>
          <p>
            An educational mobile app for children's learning and parent-approved memory preservation, combined with professional interview prep tools for adults.
          </p>
          <button className="btn-primary" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Capabilities
          </button>
        </section>

        <section id="features">
          <h2 className="section-title">MVP Core Modules</h2>
          <div className="feature-grid">
            {features.map((feature, i) => (
              <div key={i} className="glass-card feature-card">
                <div className="feature-icon">{feature.icon}</div>
                {feature.badge && <span className="badge" style={{ marginBottom: '10px' }}>{feature.badge}</span>}
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="stack">
          <h2 className="section-title">Unified Multi-Platform Stack</h2>
          <div className="tech-grid">
            {stack.map((tech, i) => (
              <div key={i} className="glass-card tech-card">
                <h4>{tech.name}</h4>
                <p style={{ fontWeight: 600, color: '#818cf8', margin: '4px 0' }}>{tech.role}</p>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{tech.details}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Family AI Companion. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
