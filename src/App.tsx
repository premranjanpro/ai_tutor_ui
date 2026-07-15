import { useState, useEffect } from 'react';
import './App.css';

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

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
}

function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState('admin@family.com');
  const [adminPassword, setAdminPassword] = useState('admin123');
  
  const [users, setUsers] = useState<User[]>([
    { id: '1', fullName: 'Aarav Ranjan', email: 'aarav@family.com', role: 'Child', isActive: true },
    { id: '2', fullName: 'Test Parent', email: 'test@family.com', role: 'FamilyAdmin', isActive: true },
    { id: '3', fullName: 'Prem Ranjan', email: 'prem@family.com', role: 'FamilyAdmin', isActive: false },
  ]);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch users from API if online
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/admin/users');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setUsers(json.data);
        }
      }
    } catch (e) {
      console.log("Using local mock users (API offline)");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUsers();
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail === 'admin@family.com' && adminPassword === 'admin123') {
      setIsLoggedIn(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid Admin credentials. Try admin@family.com / admin123');
    }
  };

  const toggleUserBlock = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}/toggle-block`, {
        method: 'POST'
      });
      if (res.ok) {
        fetchUsers();
        return;
      }
    } catch (e) {
      console.log("Offline mode: Toggling user status locally");
    }

    // Local toggle fallback
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
  };

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
          <li><a href="#about" onClick={() => setIsAdminMode(false)}>About</a></li>
          <li><a href="#features" onClick={() => setIsAdminMode(false)}>Features</a></li>
          <li><a href="#stack" onClick={() => setIsAdminMode(false)}>Technology Stack</a></li>
          <li>
            <button 
              className="btn-primary" 
              style={{ padding: '8px 16px', fontSize: '0.9rem' }} 
              onClick={() => setIsAdminMode(!isAdminMode)}
            >
              {isAdminMode ? 'Back to Landing' : 'Admin Console'}
            </button>
          </li>
        </ul>
      </header>

      <main>
        {isAdminMode ? (
          <section className="hero-section">
            {!isLoggedIn ? (
              <div className="glass-card" style={{ maxWidth: '400px', margin: '0 auto', padding: '32px' }}>
                <span className="badge">Admin Verification</span>
                <h2 style={{ marginTop: '12px', fontSize: '1.8rem', color: 'white' }}>Login Required</h2>
                {errorMsg && <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>{errorMsg}</p>}
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
                  <input 
                    type="email" 
                    placeholder="Admin Email" 
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0b0f19', color: 'white' }}
                    required
                  />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0b0f19', color: 'white' }}
                    required
                  />
                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>Login as Admin</button>
                </form>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '16px', textAlign: 'center' }}>
                  Demo credentials prefilled for quick testing.
                </p>
              </div>
            ) : (
              <div className="glass-card" style={{ width: '100%', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <span className="badge">Active Session</span>
                    <h2 style={{ color: 'white', marginTop: '6px' }}>User Management Dashboard</h2>
                  </div>
                  <button className="btn-primary" style={{ backgroundColor: '#475569' }} onClick={() => setIsLoggedIn(false)}>
                    Log Out
                  </button>
                </div>

                {loading ? (
                  <p>Loading database records...</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px', color: 'white', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid #334155', color: '#818cf8' }}>
                          <th style={{ padding: '12px' }}>Name</th>
                          <th style={{ padding: '12px' }}>Email</th>
                          <th style={{ padding: '12px' }}>Role</th>
                          <th style={{ padding: '12px' }}>Status</th>
                          <th style={{ padding: '12px', textAlign: 'center' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} style={{ borderBottom: '1px solid #1e293b' }}>
                            <td style={{ padding: '12px', fontWeight: 600 }}>{user.fullName}</td>
                            <td style={{ padding: '12px', color: '#94a3b8' }}>{user.email}</td>
                            <td style={{ padding: '12px' }}>
                              <span className="badge" style={{ backgroundColor: user.role === 'Child' ? '#06b6d4' : '#6366f1' }}>
                                {user.role}
                              </span>
                            </td>
                            <td style={{ padding: '12px' }}>
                              <span style={{ color: user.isActive ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>
                                {user.isActive ? 'Active' : 'Blocked'}
                              </span>
                            </td>
                            <td style={{ padding: '12px', textAlign: 'center' }}>
                              <button 
                                className="btn-primary" 
                                style={{ 
                                  backgroundColor: user.isActive ? '#ef4444' : '#10b981', 
                                  padding: '6px 12px', 
                                  fontSize: '0.8rem' 
                                }}
                                onClick={() => toggleUserBlock(user.id)}
                              >
                                {user.isActive ? 'Block User' : 'Unblock'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </section>
        ) : (
          <>
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
          </>
        )}
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Family AI Companion. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
