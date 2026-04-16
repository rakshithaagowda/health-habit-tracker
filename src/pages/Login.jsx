import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login, isAuthed } from '../utils/auth'

export default function Login(){
  const nav = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [err,setErr] = useState('')

  const submit = (e) => {
    e.preventDefault()
    try{
      login({email,password})
      nav('/dashboard')
    }catch(ex){ setErr(ex.message) }
  }

  if (isAuthed()) nav('/dashboard')

  return (
    <div className="container" style={{maxWidth:520}}>
      <div className="header"><h2>Welcome back</h2></div>
      <form className="card" onSubmit={submit}>
        {err && <div className="card" style={{borderColor:'#fca5a5', background:'#fef2f2', marginBottom:10}}>{err}</div>}
        <div>
          <label className="hint">Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/>
        </div>
        <div className="spacer"></div>
        <div>
          <label className="hint">Password</label>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"/>
        </div>
        <div className="spacer"></div>
        <button className="btn btn-primary" type="submit">Login</button>
        <p className="hint" style={{marginTop:10}}>No account? <Link className="link" to="/signup">Create one</Link></p>
      </form>
    </div>
  )
}
