import React from 'react'

const todayStr = () => new Date().toISOString().split('T')[0]

const countForDate = (habit, date) => {
  const entry = habit?.log?.[date]
  if (!entry) return 0
  if (typeof entry === 'number') return entry
  return (entry.doneTimes?.length || entry.count || 0)
}

const isTimeDone = (habit, date, timeStr) => {
  const entry = habit?.log?.[date]
  if (!entry || typeof entry === 'number') return false
  return (entry.doneTimes || []).includes(timeStr)
}

const currentStreak = (habit) => {
  const dayMs = 24*60*60*1000
  let d = new Date()
  let count = 0
  for(;;){
    const key = d.toISOString().split('T')[0]
    const todayCount = countForDate(habit, key)
    const timesLen = habit.times?.length || 0
    const needed = timesLen > 0 ? (habit.targetPerDay || timesLen) : (habit.targetPerDay || 1)
    if (todayCount >= needed) {
      count++
      d = new Date(d.getTime() - dayMs)
    } else break
  }
  return count
}

export default function HabitItem({ habit, onMarkToday, onMarkTime, onMarkAll, onDelete }){
  const t = todayStr()
  const hasTimes = (habit.times || []).length > 0
  const timesLen = habit.times?.length || 0
  const needed = hasTimes ? (habit.targetPerDay || timesLen) : (habit.targetPerDay || 1)
  const doneCount = countForDate(habit, t)
  const doneToday = doneCount >= needed
  const streak = currentStreak(habit)

  return (
    <div className="habit card">
      <div className="row" style={{justifyContent:'space-between'}}>
        <h4>{habit.name}</h4>
        <span className="tag">{habit.frequency.toUpperCase()}</span>
      </div>

      {hasTimes && (
        <>
          <div className="hint">Times today</div>
          <div className="row" style={{gap:'.4rem', flexWrap:'wrap'}}>
            {habit.times.map((timeStr) => {
              const timeDone = isTimeDone(habit, t, timeStr)
              return (
                <div key={timeStr} className="row" style={{gap:'.4rem', alignItems:'center'}}>
                  <span className="tag" style={{background: timeDone ? '#dcfce7' : '#eef2ff', color: timeDone ? '#166534' : '#3730a3'}}>
                    {timeStr} {timeDone ? '✓' : ''}
                  </span>
                  {!timeDone && onMarkTime && (
                    <button className="btn btn-success" onClick={()=>onMarkTime(habit.id, timeStr)}>Mark</button>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}

      <div className="row" style={{marginTop:'.4rem'}}>
        <span className="hint">Target today: {needed}</span>
        <span className="hint">Progress: <b>{doneCount}/{needed}</b></span>
        <span className="hint">Streak: <b>{streak}</b> 🔥</span>
      </div>

      <div className="row" style={{marginTop:'.4rem'}}>
        {!hasTimes ? (
          !doneToday ? (
            <button className="btn btn-success" onClick={()=>onMarkToday && onMarkToday(habit.id)}>Mark Done Today</button>
          ) : (
            <button className="btn btn-outline" disabled>Completed for Today ✓</button>
          )
        ) : (
          <>
            {!doneToday && onMarkAll && <button className="btn btn-success" onClick={()=>onMarkAll(habit.id)}>Mark All Today</button>}
            {doneToday && <button className="btn btn-outline" disabled>All Times Completed ✓</button>}
          </>
        )}
        <button className="btn btn-danger" onClick={()=>onDelete && onDelete(habit.id)}>Delete</button>
      </div>
    </div>
  )
}
