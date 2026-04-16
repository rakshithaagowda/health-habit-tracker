import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <div className="container center" style={{minHeight:'60vh'}}>
      <div className="card">
        <h2 style={{marginTop:0}}>404 — Not Found</h2>
        <p className="hint">The page you’re looking for doesn’t exist.</p>
        <Link className="btn btn-primary" to="/">Go Home</Link>
      </div>
    </div>
  )
}
