import { ArrowRight, BrainCircuit, Dumbbell, HeartPulse, ShieldCheck, Sparkles, Target, Zap } from "lucide-react"
import { Link } from "react-router"

const Home=()=>{

    const featureCards = [
  {
    icon: BrainCircuit,
    title: 'AI workout generation',
    description: 'Build adaptive sessions from your goals, equipment, and recovery data.',
  },
  {
    icon: HeartPulse,
    title: 'Recovery insights',
    description: 'Track stress, sleep, and readiness to avoid burnout and improve progress.',
  },
  {
    icon: Target,
    title: 'Goal-based coaching',
    description: 'Switch between fat loss, strength, performance, and mobility milestones.',
  },
]

const metrics = [
  { label: 'Consistency', value: '92%' },
  { label: 'Strength gain', value: '+18%' },
  { label: 'Recovery score', value: '86/100' },
  { label: 'Avg. sessions', value: '5 / week' },
]

  return (
    <div className="fitness-shell">
      <div className="bg-grid" />

      <header className="topbar container-shell">
        <Link to="/" className="brand-mark">
          <div className="brand-icon">
            <Dumbbell className="h-4 w-4" />
          </div>
          <span>FitFlow AI</span>
        </Link>

        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#results">Results</a>
          <a href="#coaching">Coaching</a>
        </nav>

        <div className="nav-actions">
          <Link to="/signin" className="nav-link-button muted">Sign in</Link>
          <Link to="/signup" className="nav-link-button primary">Get started</Link>
        </div>
      </header>

      <main className="container-shell">
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow-badge">
              <Sparkles className="h-3.5 w-3.5" />
              AI-powered training coach
            </span>
            <h1>Train smarter with a fitness assistant built around your goals.</h1>
            <p>
              Personalized workouts, smart recovery guidance, and habit tracking—designed to help you move better, perform stronger, and stay consistent.
            </p>
            <div className="cta-row">
              <Link to="/signup" className="primary-action">
                Start your plan
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/signin" className="secondary-action">Watch demo</Link>
            </div>
            <div className="mini-proof">
              <div>
                <strong>12k+</strong>
                <span>members coached</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>average rating</span>
              </div>
            </div>
          </div>

          <div className="hero-visual glass-panel">
            <div className="visual-header">
              <div>
                <p className="uppercase-label">Today&apos;s plan</p>
                <h3>Strength + cardio</h3>
              </div>
              <span className="status-pill">On track</span>
            </div>

            <div className="stat-grid">
              {metrics.map((metric) => (
                <div key={metric.label} className="stat-tile">
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>

            <div className="insight-stack">
              <div className="insight-item active">
                <div className="icon-circle"><Zap className="h-4 w-4" /></div>
                <div>
                  <h4>Power output</h4>
                  <p>+12% vs last week</p>
                </div>
              </div>
              <div className="insight-item">
                <div className="icon-circle"><ShieldCheck className="h-4 w-4" /></div>
                <div>
                  <h4>Recovery</h4>
                  <p>Excellent readiness</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="feature-section">
          <div className="section-heading">
            <span className="eyebrow-badge muted">Why athletes choose us</span>
            <h2>Everything you need to move with intent.</h2>
          </div>

          <div className="feature-grid">
            {featureCards.map(({ icon: Icon, title, description }) => (
              <div key={title} className="glass-panel feature-card">
                <div className="feature-icon">
                  <Icon className="h-5 w-5" />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home