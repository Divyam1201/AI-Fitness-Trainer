import { Button } from "@base-ui/react/button"
import { UserButton } from "@clerk/clerk-react"
import { CalendarCheck2, Dumbbell, Sparkles } from "lucide-react"
import { NavLink } from "react-router"

const GenerateProgram = () => {

  const programs = [
  'Strength foundation',
  'Fat-loss accelerator',
  'Lean muscle builder',
  'Athletic conditioning',
]

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

      <main className="container-shell generate-layout">
        <div className="glass-panel form-panel">
          <div className="panel-header">
            <div>
              <p className="uppercase-label">Build a plan</p>
              <h3>Generate a fitness program</h3>
            </div>
          </div>

          <div className="field-grid">
            <label>
              <span>Main goal</span>
              <select defaultValue="strength">
                <option value="strength">Build strength</option>
                <option value="fat-loss">Lose fat</option>
                <option value="muscle">Gain lean muscle</option>
                <option value="conditioning">Improve conditioning</option>
              </select>
            </label>

            <label>
              <span>Experience</span>
              <select defaultValue="intermediate">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </label>

            <label>
              <span>Session length</span>
              <select defaultValue="45">
                <option value="30">30 min</option>
                <option value="45">45 min</option>
                <option value="60">60 min</option>
                <option value="75">75 min</option>
              </select>
            </label>

            <label>
              <span>Equipment</span>
              <select defaultValue="home">
                <option value="home">Home gym</option>
                <option value="full-gym">Full gym</option>
                <option value="bodyweight">Bodyweight only</option>
              </select>
            </label>
          </div>

          <Button className="primary-action generate-button" type="button">
            Generate program
            <Sparkles className="h-4 w-4" />
          </Button>
        </div>

        <div className="glass-panel program-preview">
          <div className="panel-header">
            <div>
              <p className="uppercase-label">Smart output</p>
              <h3>Program preview</h3>
            </div>
          </div>

          <div className="preview-card">
            <div className="preview-title-row">
              <strong>4-week strength phase</strong>
              <span className="status-pill">AI generated</span>
            </div>

            <ul className="program-list">
              {programs.map((program) => (
                <li key={program}><CalendarCheck2 className="h-4 w-4" /> {program}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )

}

export default GenerateProgram
