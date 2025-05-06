"use client"

import { useState, useEffect } from "react"
import TaskItem from "./TaskItem"
import { useTasks } from "../../context/TaskContext"

const TaskList = () => {
  const { tasks } = useTasks()
  const [filteredTasks, setFilteredTasks] = useState([])
  const [filter, setFilter] = useState({
    status: "all",
    priority: "all",
    search: "",
  })

  useEffect(() => {
    // Apply filters
    let filtered = [...tasks]

    // Filter by status
    if (filter.status !== "all") {
      filtered = filtered.filter((task) => task.status === filter.status)
    }

    // Filter by priority
    if (filter.priority !== "all") {
      filtered = filtered.filter((task) => task.priority === filter.priority)
    }

    // Filter by search term
    if (filter.search) {
      const searchTerm = filter.search.toLowerCase()
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm) ||
          (task.description && task.description.toLowerCase().includes(searchTerm)),
      )
    }

    setFilteredTasks(filtered)
  }, [tasks, filter])

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilter({
      ...filter,
      [name]: value,
    })
  }

  if (tasks.length === 0) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center p-5">
          <h3>No tasks yet</h3>
          <p className="text-muted">Add a task to get started!</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <select
              className="form-select"
              value={filter.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={filter.priority}
              onChange={(e) => handleFilterChange("priority", e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search tasks..."
              value={filter.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="card shadow-sm">
          <div className="card-body text-center p-5">
            <h3>No matching tasks</h3>
            <p className="text-muted">Try adjusting your filters</p>
          </div>
        </div>
      ) : (
        filteredTasks.map((task) => <TaskItem key={task._id} task={task} />)
      )}
    </div>
  )
}

export default TaskList
