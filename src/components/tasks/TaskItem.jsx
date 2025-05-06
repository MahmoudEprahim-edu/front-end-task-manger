"use client"
import { useTasks } from "../../context/TaskContext"

const TaskItem = ({ task }) => {
  const { deleteTask, setCurrent } = useTasks()

  const { _id, title, description, status, priority, dueDate } = task

  const onDelete = () => {
    deleteTask(_id)
  }

  const onEdit = () => {
    setCurrent(task)
  }

  // Format date
  const formatDate = (date) => {
    if (!date) return "No due date"
    const d = new Date(date)
    return d.toLocaleDateString()
  }

  // Get status badge color
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "To Do":
        return "bg-secondary"
      case "In Progress":
        return "bg-primary"
      case "Completed":
        return "bg-success"
      default:
        return "bg-secondary"
    }
  }

  // Get priority class
  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "priority-high"
      case "Medium":
        return "priority-medium"
      case "Low":
        return "priority-low"
      default:
        return ""
    }
  }

  return (
    <div className={`card mb-3 shadow-sm task-card ${getPriorityClass(priority)}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0">{title}</h5>
          <span className={`badge ${getStatusBadgeClass(status)} status-badge`}>{status}</span>
        </div>

        {description && <p className="card-text text-muted mb-3">{description}</p>}

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <small className="text-muted">
              <strong>Priority:</strong> {priority}
            </small>
            <br />
            <small className="text-muted">
              <strong>Due:</strong> {formatDate(dueDate)}
            </small>
          </div>

          <div>
            <button onClick={onEdit} className="btn btn-sm btn-outline-primary me-2">
              <i className="fas fa-edit"></i> Edit
            </button>
            <button onClick={onDelete} className="btn btn-sm btn-outline-danger">
              <i className="fas fa-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskItem
