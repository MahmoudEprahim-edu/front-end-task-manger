"use client"

import { useState, useEffect } from "react"
import { useTasks } from "../../context/TaskContext"

const TaskForm = () => {
  const { addTask, updateTask, current, clearCurrent, error } = useTasks()

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "To Do",
    priority: "Medium",
    dueDate: "",
  })

  const [alert, setAlert] = useState({ show: false, type: "", message: "" })

  useEffect(() => {
    if (current !== null) {
      setTask({
        ...current,
        dueDate: current.dueDate ? new Date(current.dueDate).toISOString().substr(0, 10) : "",
      })
    } else {
      setTask({
        title: "",
        description: "",
        status: "To Do",
        priority: "Medium",
        dueDate: "",
      })
    }

    if (error) {
      setAlert({
        show: true,
        type: "danger",
        message: error,
      })
    }
  }, [current, error])

  const { title, description, status, priority, dueDate } = task

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    let result

    if (current === null) {
      result = await addTask(task)
    } else {
      result = await updateTask(task)
    }

    if (result.success) {
      setAlert({
        show: true,
        type: "success",
        message: `Task ${current ? "updated" : "added"} successfully!`,
      })

      // Clear form if adding new task
      if (current === null) {
        setTask({
          title: "",
          description: "",
          status: "To Do",
          priority: "Medium",
          dueDate: "",
        })
      }

      // Hide success message after 3 seconds
      setTimeout(() => {
        setAlert({ show: false, type: "", message: "" })
      }, 3000)
    } else {
      setAlert({
        show: true,
        type: "danger",
        message: result.error,
      })
    }
  }

  const clearAll = () => {
    clearCurrent()
  }

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="card-title text-center mb-4">{current ? "Edit Task" : "Add Task"}</h2>

        {alert.show && (
          <div className={`alert alert-${alert.type}`} role="alert">
            {alert.message}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={title}
              onChange={onChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={description}
              onChange={onChange}
              rows="3"
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select className="form-select" id="status" name="status" value={status} onChange={onChange}>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select className="form-select" id="priority" name="priority" value={priority} onChange={onChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="dueDate" className="form-label">
              Due Date
            </label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              name="dueDate"
              value={dueDate}
              onChange={onChange}
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              {current ? "Update Task" : "Add Task"}
            </button>

            {current && (
              <button type="button" className="btn btn-light" onClick={clearAll}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm
