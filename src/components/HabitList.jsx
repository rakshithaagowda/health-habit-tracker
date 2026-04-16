import React from 'react'
import HabitItem from './HabitItem'

export default function HabitList({ habits, onMarkToday, onMarkTime, onMarkAll, onDelete }){
  if(!habits.length){
    return <div className="card center" style={{minHeight:120}}>
      <div>
        <h3 style={{margin:'0 0 .25rem 0'}}>No habits yet</h3>
        <p className="hint">Add your first habit using the form above.</p>
      </div>
    </div>
  }
  return (
    <div className="grid" style={{gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))'}}>
      {habits.map(h => (
        <HabitItem
          key={h.id}
          habit={h}
          onMarkToday={onMarkToday}
          onMarkTime={onMarkTime}
          onMarkAll={onMarkAll}   
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
