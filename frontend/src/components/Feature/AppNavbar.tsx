import { UserButton } from '@clerk/clerk-react'
import { Dumbbell } from 'lucide-react'
import { NavLink } from 'react-router'

const AppNavbar = () => {
  return (
   
      <header className="topbar container-shell app-header flex flex-row! justify-between! px-3!">
        <div className="brand-mark">
          <div className="brand-icon">
            <Dumbbell className="h-4 w-4" />
          </div>
          <span className='w-max'>FitFlow AI</span>
        </div>

        <nav className="app-nav hidden! md:flex!">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/generate">Generate</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>

        <div className="header-actions">
          {/* <button className="icon-button" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button> */}
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

  )
}

export default AppNavbar
