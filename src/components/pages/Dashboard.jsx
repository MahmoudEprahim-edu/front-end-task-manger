"use client"

import { useEffect } from "react"
import { useTasks } from "../../context/TaskContext"
import TaskForm from "../tasks/TaskForm"
import TaskList from "../tasks/TaskList"
import TaskFilter from "../tasks/TaskFilter"

const Dashboard = () => {
  const { getTasks, loading } = useTasks()

  useEffect(() => {
    getTasks()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="row">
      <div className="col-md-4">
        <TaskForm />
      </div>
      <div className="col-md-8">
        <TaskFilter />
        {loading ? (
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <TaskList />
        )}
      </div>
    </div>
  )
}

export default Dashboard
