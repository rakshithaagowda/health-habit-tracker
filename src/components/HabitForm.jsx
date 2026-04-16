import React, { useState } from 'react'

export default function HabitForm({ onAdd }){
  const [name, setName] = useState('')
  const [freq, setFreq] = useState('daily')
  const [target, setTarget] = useState(1)
  const [times, setTimes] = useState(['07:00'])

  const addTimeField = () => setTimes(prev => [...prev, ''])
  const removeTime = (idx) => setTimes(prev => prev.filter((_, i) => i !== idx))
  const changeTime = (idx, value) => {
    setTimes(prev => prev.map((t,i) => i===idx ? value : t))
  }

  const submit = (e) => {
    e.preventDefault()
    if(!name.trim()) return
    const cleanTimes = times.map(t => t.trim()).filter(Boolean)
    onAdd({
      id: crypto.randomUUID?.() || String(Date.now()),
      name: name.trim(),
      frequency: freq,
      targetPerDay: Number(target) || (cleanTimes.length || 1), // sensible default
      times: cleanTimes, // array of "HH:MM"
      log: {} // { 'YYYY-MM-DD': { count: n, doneTimes: ['07:00'] } }
    })
    setName('')
    setFreq('daily')
    setTarget( cleanTimes.length || 1 )
    setTimes(['07:00'])
  }

  return (
    <form className="card" onSubmit={submit}>
      <h3 style={{marginTop:0}}>Add a new habit</h3>
      <div className="grid grid-3" style={{marginTop:'.5rem'}}>
        <div>
          <label className="hint">Habit name</label>
          <input className="input" placeholder="e.g., Morning Walk" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div>
          <label className="hint">Frequency</label>
          <select className="select" value={freq} onChange={e=>setFreq(e.target.value)}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <div>
          <label className="hint">Target / day</label>
          <div className="row">
            <input className="input" type="number" min="1" value={target} onChange={e=>setTarget(e.target.value)} />
            <button type="button" className="btn" onClick={()=>setTarget((times.filter(Boolean).length)||1)}>
              Set to {times.filter(Boolean).length || 1}
            </button>
          </div>
        </div>
      </div>

      <div className="spacer"></div>
      <div className="card" style={{background:'#fafafe'}}>
        <h4 style={{margin:'0 0 .5rem 0'}}>Reminder times (optional)</h4>
        <p className="hint" style={{marginTop:0}}>Add one or more times for this habit.</p>
        <div className="grid" style={{gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:'.6rem'}}>
          {times.map((t, idx) => (
            <div key={idx} className="row" style={{alignItems:'center'}}>
              <input className="input" type="time" value={t} onChange={e=>changeTime(idx, e.target.value)} />
              {times.length > 1 && (
                <button type="button" className="btn btn-outline" onClick={()=>removeTime(idx)}>Remove</button>
              )}
            </div>
          ))}
        </div>
        <div className="spacer"></div>
        <button type="button" className="btn btn-outline" onClick={addTimeField}>+ Add time</button>
      </div>

      <div className="spacer"></div>
      <button className="btn btn-primary">Add Habit</button>
    </form>
  )
}
