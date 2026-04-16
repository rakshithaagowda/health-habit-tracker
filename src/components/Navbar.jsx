import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthed, currentUser, logout } from '../utils/auth'

export default function Navbar(){
  const nav = useNavigate()
  const authed = isAuthed()
  const user = currentUser()

  const onLogout = () => {
    logout()
    nav('/login')
  }

  return (
    <div className="nav">
      <div className="nav-inner container">
        <Link className="brand" to={authed ? '/dashboard' : '/'}>Health Habit Tracker</Link>
        <div className="nav-actions">
          {!authed && (<>
            <Link className="btn" to="/login">Login</Link>
            <Link className="btn" to="/signup">Sign up</Link>
          </>)}
          {authed && (<>
            <span style={{opacity:.85, fontWeight:600}}>Hi, {user?.name?.split(' ')[0] || 'You'} 👋</span>
            <Link className="btn" to="/dashboard">Dashboard</Link>
            <button className="btn" onClick={onLogout}>Logout</button>
          </>)}
        </div>
      </div>
    </div>
  )
}
