"use client"

import { createContext, useState, useContext, useEffect } from "react"
import authService from "../api/authService"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load user if token exists
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        setLoading(false)
        return
      }

      try {
        const userData = await authService.getCurrentUser()
        setUser(userData)
        setIsAuthenticated(true)
      } catch (err) {
        localStorage.removeItem("token")
        setError(err.message || "Authentication error")
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  // Register user
  const register = async (formData) => {
    try {
      const res = await authService.register(formData)
      localStorage.setItem("token", res.token)
      await loadUser()
      return { success: true }
    } catch (err) {
      setError(err.message || "Registration failed")
      return { success: false, error: err.message || "Registration failed" }
    }
  }

  // Login user
  const login = async (formData) => {
    try {
      const res = await authService.login(formData)
      localStorage.setItem("token", res.token)
      await loadUser()
      return { success: true }
    } catch (err) {
      setError(err.message || "Login failed")
      return { success: false, error: err.message || "Login failed" }
    }
  }

  // Load user
  const loadUser = async () => {
    try {
      const userData = await authService.getCurrentUser()
      setUser(userData)
      setIsAuthenticated(true)
      setError(null)
    } catch (err) {
      setError(err.message || "Authentication error")
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setIsAuthenticated(false)
  }

  // Clear errors
  const clearError = () => setError(null)

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
