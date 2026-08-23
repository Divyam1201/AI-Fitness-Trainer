import { UserButton, useUser } from "@clerk/clerk-react"
import { Dumbbell, Flame, HeartPulse, Target } from "lucide-react"
import { NavLink } from "react-router"

const Profile = () => {
  
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
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <main className="container-shell profile-layout">
        <div className="glass-panel profile-overview">
          <div className="profile-header-row">
            <div className="avatar-ring">
              {user?.firstName?.charAt(0)?.toUpperCase() ?? 'A'}
            </div>
            <div>
              <p className="uppercase-label">Athlete profile</p>
              <h2>{user?.fullName ?? 'Alex Morgan'}</h2>
            </div>
          </div>

          <div className="profile-stats-grid">
            <div>
              <span>Age</span>
              <strong>29</strong>
            </div>
            <div>
              <span>Height</span>
              <strong>5&apos;10&quot;</strong>
            </div>
            <div>
              <span>Weight</span>
              <strong>162 lb</strong>
            </div>
            <div>
              <span>Goal</span>
              <strong>Lean bulk</strong>
            </div>
          </div>
        </div>

        <div className="glass-panel goals-panel">
          <div className="panel-header">
            <div>
              <p className="uppercase-label">Lifestyle</p>
              <h3>Current goals</h3>
            </div>
          </div>

          <ul className="goal-list">
            <li><Target className="h-4 w-4" /> Add 8 lb of lean muscle</li>
            <li><Flame className="h-4 w-4" /> Maintain 3-4 high-intensity sessions</li>
            <li><HeartPulse className="h-4 w-4" /> Prioritize sleep and recovery</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default Profile
