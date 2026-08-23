import { UserButton, useUser } from '@clerk/clerk-react'
import { ActivityIcon, Bell, BrainCircuit, ChevronRight, Dumbbell, Flame, TrendingUp } from 'lucide-react'
import { Link, NavLink } from 'react-router'

const Dashboard = () => {

    const weeklyPlan = [
  { day: 'Mon', focus: 'Upper body push', intensity: 'Intensity 8/10', time: '42 min' },
  { day: 'Tue', focus: 'Lower body power', intensity: 'Intensity 7/10', time: '38 min' },
  { day: 'Wed', focus: 'Mobility + cardio', intensity: 'Recovery', time: '28 min' },
  { day: 'Thu', focus: 'Strength pull', intensity: 'Intensity 8/10', time: '45 min' },
  { day: 'Fri', focus: 'Conditioning circuit', intensity: 'Intensity 9/10', time: '30 min' },
]

const quickStats = [
  { label: 'Calories burned', value: '1,240', detail: 'this week' },
  { label: 'Protein target', value: '160g', detail: 'daily' },
  { label: 'Hydration', value: '2.7L', detail: 'today' },
]


  const { user } = useUser()

  return (
    <div className="fitness-shell app-shell">
      <div className="bg-grid" />

      <header className="topbar container-shell app-header">
        <div className="brand-mark">
          <div className="brand-icon">
            <Dumbbell className="h-4 w-4" />
          </div>
          <span>FitFlow AI</span>
        </div>

        <nav className="app-nav">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/generate">Generate</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>

        <div className="header-actions">
          <button className="icon-button" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <main className="container-shell dashboard-layout">
        <section className="welcome-panel glass-panel">
          <div>
            <span className="eyebrow-badge">Good morning, {user?.firstName ?? 'athlete'}</span>
            <h1>Let&apos;s build your next win.</h1>
          </div>
          <Link to="/generate" className="primary-action compact">
            Generate workout
            <ChevronRight className="h-4 w-4" />
          </Link>
        </section>

        <section className="stats-row">
          {quickStats.map((stat) => (
            <div key={stat.label} className="glass-panel stat-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>{stat.detail}</small>
            </div>
          ))}
        </section>

        <section className="content-grid">
          <div className="glass-panel plan-panel">
            <div className="panel-header">
              <div>
                <p className="uppercase-label">Weekly schedule</p>
                <h3>Training plan</h3>
              </div>
              <button className="text-button">Edit</button>
            </div>

            <div className="plan-list">
              {weeklyPlan.map((item) => (
                <div key={item.day} className="plan-row">
                  <div className="day-tag">{item.day}</div>
                  <div className="plan-copy">
                    <strong>{item.focus}</strong>
                    <span>{item.intensity}</span>
                  </div>
                  <div className="plan-time">{item.time}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel coach-panel">
            <div className="panel-header">
              <div>
                <p className="uppercase-label">AI coach</p>
                <h3>Coach notes</h3>
              </div>
              <span className="status-pill green">Ready</span>
            </div>

            <div className="coach-card">
              <div className="coach-bubble">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <p>
                Your recovery is trending well. Increase the load on Thursday and keep your squat form consistent for the next two sessions.
              </p>
            </div>

            <ul className="check-list">
              <li><ActivityIcon className="h-4 w-4" /> Sleep quality improved by 18%</li>
              <li><TrendingUp className="h-4 w-4" /> Strength trend is positive</li>
              <li><Flame className="h-4 w-4" /> Fat loss pace is in range</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}


export default Dashboard
