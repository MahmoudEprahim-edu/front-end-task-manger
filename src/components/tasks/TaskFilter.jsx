"use client"

import { useState, useEffect } from "react"
import { useTasks } from "../../context/TaskContext"

const TaskFilter = () => {
  const { tasks } = useTasks()
  const [counts, setCounts] = useState({
    total: 0,
    todo: 0,
    inProgress: 0,
    completed: 0,
  })

  useEffect(() => {
    // Calculate counts
    const total = tasks.length
    const todo = tasks.filter((task) => task.status === "To Do").length
    const inProgress = tasks.filter((task) => task.status === "In Progress").length
    const completed = tasks.filter((task) => task.status === "Completed").length

    setCounts({ total, todo, inProgress, completed })
  }, [tasks])

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">Task Overview</h5>
        <div className="row text-center">
          <div className="col-md-3 col-6 mb-3">
            <div className="p-3 border rounded bg-light">
              <h3 className="mb-1">{counts.total}</h3>
              <small className="text-muted">Total Tasks</small>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <div className="p-3 border rounded bg-light">
              <h3 className="mb-1">{counts.todo}</h3>
              <small className="text-muted">To Do</small>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <div className="p-3 border rounded bg-light">
              <h3 className="mb-1">{counts.inProgress}</h3>
              <small className="text-muted">In Progress</small>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <div className="p-3 border rounded bg-light">
              <h3 className="mb-1">{counts.completed}</h3>
              <small className="text-muted">Completed</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskFilter
