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
    <div className="min-h-screen relative text-[#edf6ff]">
      <div className="absolute inset-0 pointer-events-none bg-grid" />

      <header className="relative z-10 max-w-[1200px] w-full px-4 mx-auto flex items-center justify-between pt-4">
        <Link to="/" className="inline-flex items-center gap-3 font-semibold text-white">
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-sky-300/20 to-cyan-300/10 border border-sky-300/30">
            <Dumbbell className="h-4 w-4" />
          </div>
          <span>FitFlow AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a href="#features">Features</a>
          <a href="#results">Results</a>
          <a href="#coaching">Coaching</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/signin" className="py-1 px-1.5 md:px-3 md:py-2  rounded-lg bg-slate-700/50 border border-slate-600 text-xs md:text-sm">Sign in</Link>
          <Link to="/signup" className="py-1 px-1.5 md:px-3 md:py-2 rounded-lg bg-gradient-to-br from-sky-400 to-cyan-300 text-slate-900 text-xs md:text-sm">Get started</Link>
        </div>
      </header>

      <main className="max-w-[1200px] w-full px-4 mx-auto">
        <section className="grid md:grid-cols-2 gap-8 items-center py-20 md:py-32">
          <div className="space-y-4 max-w-xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-300/10 border border-sky-300/20 text-sky-200 text-xs uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              AI-powered training coach
            </span>
            <h1>Train smarter with a fitness assistant built around your goals.</h1>
            <p>
              Personalized workouts, smart recovery guidance, and habit tracking—designed to help you move better, perform stronger, and stay consistent.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <Link to="/signup" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-sky-400 to-cyan-300 text-slate-900">Start your plan <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/signin" className="px-3 py-2 rounded-lg bg-slate-700/40">Watch demo</Link>
            </div>
            <div className="flex items-center gap-8 mt-4">
              <div>
                <strong className="text-2xl">12k+</strong>
                <span className="block text-slate-300">members coached</span>
              </div>
              <div>
                <strong className="text-2xl">4.9/5</strong>
                <span className="block text-slate-300">average rating</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[rgba(15,23,42,0.74)] border border-[rgba(148,163,184,0.18)] backdrop-blur-lg">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="uppercase-label">Today&apos;s plan</p>
                <h3>Strength + cardio</h3>
              </div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-600/10 border border-sky-500/20 text-sky-200 text-sm">On track</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="p-4 rounded-lg bg-[rgba(15,23,42,0.6)]">
                  <span className="text-slate-300 text-sm">{metric.label}</span>
                  <strong className="block text-2xl">{metric.value}</strong>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-[rgba(24,206,242,0.08)] border border-[rgba(24,206,242,0.18)]">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-sky-300/20 to-cyan-300/10 text-sky-300"><Zap className="h-4 w-4" /></div>
                <div>
                  <h4 className="font-semibold">Power output</h4>
                  <p className="text-slate-300">+12% vs last week</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-[rgba(15,23,42,0.6)] border border-[rgba(148,163,184,0.12)]">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-sky-300/20 to-cyan-300/10 text-sky-300"><ShieldCheck className="h-4 w-4" /></div>
                <div>
                  <h4 className="font-semibold">Recovery</h4>
                  <p className="text-slate-300">Excellent readiness</p>
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

          <div className="grid md:grid-cols-3 gap-4">
            {featureCards.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-6 rounded-xl bg-[rgba(15,23,42,0.74)] border border-[rgba(148,163,184,0.18)]">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-sky-300/20 to-cyan-300/10 mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-slate-300">{description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home