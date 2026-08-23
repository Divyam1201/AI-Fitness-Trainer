import { Bot, LayoutDashboard, User } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router'

const Footer = () => {
  return (
    <section>
       <nav className="flex md:hidden items-center justify-around text-[8px] border-t w-3/4 mx-auto p-2">
          <NavLink to="/dashboard" className="flex flex-col items-center">
          <LayoutDashboard></LayoutDashboard>
          Dashboard</NavLink>
          <NavLink to="/generate" className="flex flex-col items-center">
          <Bot></Bot>
          Generate</NavLink>
          <NavLink to="/profile" className="flex flex-col items-center">
          <User></User>
          Profile</NavLink>
        </nav>
    </section>
  )
}

export default Footer
