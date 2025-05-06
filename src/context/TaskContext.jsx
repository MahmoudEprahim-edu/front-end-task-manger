"use client"

import { createContext, useContext, useReducer } from "react"
import taskService from "../api/taskService"

const TaskContext = createContext()

export const useTasks = () => useContext(TaskContext)

// Reducer
const taskReducer = (state, action) => {
  switch (action.type) {
    case "GET_TASKS":
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      }
    case "ADD_TASK":
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        loading: false,
      }
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => (task._id === action.payload._id ? action.payload : task)),
        loading: false,
      }
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
        loading: false,
      }
    case "SET_CURRENT":
      return {
        ...state,
        current: action.payload,
      }
    case "CLEAR_CURRENT":
      return {
        ...state,
        current: null,
      }
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      }
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export const TaskProvider = ({ children }) => {
  const initialState = {
    tasks: [],
    current: null,
    loading: true,
    error: null,
  }

  const [state, dispatch] = useReducer(taskReducer, initialState)

  // Get all tasks
  const getTasks = async () => {
    try {
      dispatch({ type: "SET_LOADING" })
      const tasks = await taskService.getTasks()
      dispatch({ type: "GET_TASKS", payload: tasks })
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.message || "Error fetching tasks",
      })
    }
  }

  // Add task
  const addTask = async (task) => {
    try {
      dispatch({ type: "SET_LOADING" })
      const newTask = await taskService.addTask(task)
      dispatch({ type: "ADD_TASK", payload: newTask })
      return { success: true }
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.message || "Error adding task",
      })
      return { success: false, error: err.message || "Error adding task" }
    }
  }

  // Update task
  const updateTask = async (task) => {
    try {
      dispatch({ type: "SET_LOADING" })
      const updatedTask = await taskService.updateTask(task)
      dispatch({ type: "UPDATE_TASK", payload: updatedTask })
      return { success: true }
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.message || "Error updating task",
      })
      return { success: false, error: err.message || "Error updating task" }
    }
  }

  // Delete task
  const deleteTask = async (id) => {
    try {
      dispatch({ type: "SET_LOADING" })
      await taskService.deleteTask(id)
      dispatch({ type: "DELETE_TASK", payload: id })
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.message || "Error deleting task",
      })
    }
  }

  // Set current task
  const setCurrent = (task) => {
    dispatch({ type: "SET_CURRENT", payload: task })
  }

  // Clear current task
  const clearCurrent = () => {
    dispatch({ type: "CLEAR_CURRENT" })
  }

  // Clear errors
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" })
  }

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        current: state.current,
        loading: state.loading,
        error: state.error,
        getTasks,
        addTask,
        updateTask,
        deleteTask,
        setCurrent,
        clearCurrent,
        clearError,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
