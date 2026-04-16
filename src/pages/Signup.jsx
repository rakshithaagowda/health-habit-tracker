import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signup } from '../utils/auth'

export default function Signup(){
  const nav = useNavigate()
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [err,setErr] = useState('')

  const submit = (e) => {
    e.preventDefault()
    try{
      if(!name.trim() || !email.trim() || !password.trim()) throw new Error('All fields are required.')
      signup({name,email,password})
      nav('/dashboard')
    }catch(ex){ setErr(ex.message) }
  }

  return (
    <div className="container" style={{maxWidth:520}}>
      <div className="header"><h2>Create your account</h2></div>
      <form className="card" onSubmit={submit}>
        {err && <div className="card" style={{borderColor:'#fca5a5', background:'#fef2f2', marginBottom:10}}>{err}</div>}
        <div>
          <label className="hint">Full name</label>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g., Sam Alex"/>
        </div>
        <div className="spacer"></div>
        <div>
          <label className="hint">Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/>
        </div>
        <div className="spacer"></div>
        <div>
          <label className="hint">Password</label>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Create a password"/>
        </div>
        <div className="spacer"></div>
        <button className="btn btn-primary" type="submit">Sign up</button>
        <p className="hint" style={{marginTop:10}}>Already have an account? <Link className="link" to="/login">Login</Link></p>
      </form>
    </div>
  )
}
