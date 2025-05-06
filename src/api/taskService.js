import axios from "axios"
import API_URL from "./config"

// Set up axios with the base URL
const api = axios.create({
  baseURL: API_URL,
})

// Add a request interceptor to include the token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers["x-auth-token"] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Task API services
const taskService = {
  // Get all tasks
  getTasks: async () => {
    try {
      const response = await api.get("/tasks")
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Add a new task
  addTask: async (taskData) => {
    try {
      const response = await api.post("/tasks", taskData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Update a task
  updateTask: async (taskData) => {
    try {
      const response = await api.put(`/tasks/${taskData._id}`, taskData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Delete a task
  deleteTask: async (taskId) => {
    try {
      const response = await api.delete(`/tasks/${taskId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },
}

export default taskService
