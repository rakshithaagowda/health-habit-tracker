import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import { isAuthed } from './utils/auth'

export default function App(){
  const HomeRedirect = () => <Navigate to={isAuthed()?'/dashboard':'/login'} replace />
  const Private = ({children}) => isAuthed()? children : <Navigate to="/login" replace />

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeRedirect/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Private><Dashboard/></Private>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  )
}
