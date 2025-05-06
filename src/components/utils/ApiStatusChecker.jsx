"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import API_URL from "../../api/config"

const ApiStatusChecker = () => {
  const [status, setStatus] = useState("checking")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        // Try to connect to the API
        await axios.get(`${API_URL}/test`, { timeout: 5000 })
        setStatus("connected")
        setMessage("API is connected and working!")
      } catch (error) {
        setStatus("error")
        if (error.response) {
          // The request was made and the server responded with a status code
          setMessage(`API responded with status: ${error.response.status}`)
        } else if (error.request) {
          // The request was made but no response was received
          setMessage("Cannot connect to API. Is the server running?")
        } else {
          // Something happened in setting up the request
          setMessage(`Error: ${error.message}`)
        }
      }
    }

    checkApiStatus()
  }, [])

  const getStatusClass = () => {
    switch (status) {
      case "connected":
        return "alert alert-success"
      case "error":
        return "alert alert-danger"
      default:
        return "alert alert-info"
    }
  }

  return (
    <div className={getStatusClass()} role="alert">
      <h4 className="alert-heading">API Status</h4>
      <p>{message}</p>
      <hr />
      <p className="mb-0">API URL: {API_URL}</p>
    </div>
  )
}

export default ApiStatusChecker
