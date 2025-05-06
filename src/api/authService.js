import axios from "axios"
import API_URL from "./config"

// Auth API services
const authService = {
  // Register a new user
  register: async (userData) => {
    console.log("Attempting to register user at:", `${API_URL}/users/register`)
    console.log("With data:", { ...userData, password: "[HIDDEN]" })

    try {
      const response = await axios.post(`${API_URL}/users/register`, userData)
      console.log("Registration successful:", response.data)
      return response.data
    } catch (error) {
      console.error("Registration error:", error)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response data:", error.response.data)
        console.error("Error response status:", error.response.status)
        throw error.response.data || { msg: "Registration failed" }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from server")
        throw { msg: "No response from server. Is the backend running?" }
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message)
        throw { msg: error.message }
      }
    }
  },

  // Login user
  login: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, userData)
      return response.data
    } catch (error) {
      if (error.response) {
        throw error.response.data || { msg: "Login failed" }
      } else if (error.request) {
        throw { msg: "No response from server. Is the backend running?" }
      } else {
        throw { msg: error.message }
      }
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No token found")
      }

      const response = await axios.get(`${API_URL}/users/me`, {
        headers: {
          "x-auth-token": token,
        },
      })
      return response.data
    } catch (error) {
      if (error.response) {
        throw error.response.data || { msg: "Authentication failed" }
      } else if (error.request) {
        throw { msg: "No response from server. Is the backend running?" }
      } else {
        throw { msg: error.message }
      }
    }
  },
}

export default authService
