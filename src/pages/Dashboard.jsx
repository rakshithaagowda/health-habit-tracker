import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { currentUser, isAuthed } from '../utils/auth'
import HabitForm from '../components/HabitForm'
import HabitList from '../components/HabitList'
import { getJSON, setJSON } from '../utils/storage'

const todayStr = () => new Date().toISOString().split('T')[0]

export default function Dashboard(){
  const nav = useNavigate()
  useEffect(()=>{ if(!isAuthed()) nav('/login') }, [nav])

  const user = currentUser()
  const HABIT_KEY = useMemo(()=> user ? `hht_habits_${user.email}` : 'hht_habits_demo', [user])

  const [habits,setHabits] = useState(()=> getJSON(HABIT_KEY, []))
  useEffect(()=>{ setJSON(HABIT_KEY, habits) }, [HABIT_KEY, habits])

  const addHabit = (habit) => setHabits(prev => [habit, ...prev])
  const deleteHabit = (id) => setHabits(prev => prev.filter(h => h.id !== id))

  // NO-times quick mark
  const markToday = (id) => {
    const t = todayStr()
    setHabits(prev => prev.map(h => {
      if(h.id!==id) return h
      const entry = h.log?.[t]
      let count = 0
      if (entry){
        if (typeof entry === 'number') count = entry
        else count = entry.count || (entry.doneTimes?.length || 0)
      }
      const totalNeeded = (h.times?.length || 0) > 0 ? (h.targetPerDay || h.times.length) : (h.targetPerDay || 1)
      const nextCount = Math.min((count + 1), totalNeeded)
      const newEntry = { count: nextCount, doneTimes: (typeof entry === 'object' ? (entry.doneTimes || []) : []) }
      return { ...h, log: { ...(h.log||{}), [t]: newEntry } }
    }))
  }

  // Mark a specific time for today
  const markTimeToday = (id, timeStr) => {
    const t = todayStr()
    setHabits(prev => prev.map(h => {
      if(h.id!==id) return h
      const entry = h.log?.[t]
      let doneTimes = []
      if (entry && typeof entry === 'object') doneTimes = [...(entry.doneTimes || [])]
      if (!doneTimes.includes(timeStr)) doneTimes.push(timeStr)
      const totalNeeded = (h.targetPerDay || (h.times?.length || 1))
      const count = Math.max((entry?.count || 0), doneTimes.length)
      const newEntry = { count: Math.min(count, totalNeeded), doneTimes }
      return { ...h, log: { ...(h.log||{}), [t]: newEntry } }
    }))
  }

  // Mark all times for today (timed habits)
  const markAllToday = (id) => {
    const t = todayStr()
    setHabits(prev => prev.map(h => {
      if(h.id!==id) return h
      const allTimes = (h.times || []).filter(Boolean)
      const totalNeeded = (h.times?.length || 0) > 0 ? (h.targetPerDay || h.times.length) : (h.targetPerDay || 1)
      const count = Math.min(allTimes.length || 0, totalNeeded)
      const newEntry = { count, doneTimes: [...allTimes] }
      return { ...h, log: { ...(h.log||{}), [t]: newEntry } }
    }))
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Dashboard</h2>
        <span className="hint">Add habits and optional times (e.g., 07:00, 21:00). Mark each slot or all at once.</span>
      </div>

      <div className="grid grid-2">
        <div>
          <HabitForm onAdd={addHabit}/>
          <div className="spacer"></div>
          <div className="card">
            <h3 style={{marginTop:0}}>Tips</h3>
            <ul className="hint" style={{margin:'0 0 0 1rem', padding:0}}>
              <li>Set the target equal to the number of times for “Mark All” to complete the day.</li>
              <li>Use the “Set to X” button in the form to match target to times.</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="card" style={{marginBottom:'1rem'}}>
            <h3 style={{marginTop:0}}>Your Habits</h3>
            <p className="hint" style={{marginTop:'.25rem'}}>Today: <b>{todayStr()}</b></p>
          </div>
          <HabitList
            habits={habits}
            onDelete={deleteHabit}
            onMarkToday={markToday}
            onMarkTime={markTimeToday}
            onMarkAll={markAllToday}
          />
        </div>
      </div>

      <div className="footer">© {new Date().getFullYear()} Health Habit Tracker — timings, progress, and streaks.</div>
    </div>
  )
}
