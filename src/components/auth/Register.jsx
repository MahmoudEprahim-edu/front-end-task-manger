"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import ApiStatusChecker from "../utils/ApiStatusChecker"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })
  const [alert, setAlert] = useState({ show: false, type: "", message: "" })
  const [showApiStatus, setShowApiStatus] = useState(false)
  const { register, isAuthenticated, error, clearError } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect if authenticated
    if (isAuthenticated) {
      navigate("/")
    }

    // Show error if exists
    if (error) {
      setAlert({
        show: true,
        type: "danger",
        message: typeof error === "string" ? error : JSON.stringify(error),
      })
      clearError()
    }
  }, [isAuthenticated, error, navigate, clearError])

  const { name, email, password, password2 } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (password !== password2) {
      setAlert({
        show: true,
        type: "danger",
        message: "Passwords do not match",
      })
      return
    }

    try {
      const result = await register({
        name,
        email,
        password,
      })

      if (!result.success) {
        setAlert({
          show: true,
          type: "danger",
          message: result.error?.msg || "Registration failed",
        })
        // Show API status checker if registration fails
        setShowApiStatus(true)
      }
    } catch (err) {
      setAlert({
        show: true,
        type: "danger",
        message: "Registration failed: " + (err.message || "Unknown error"),
      })
      // Show API status checker if registration fails
      setShowApiStatus(true)
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-body p-5">
            <h1 className="text-center mb-4">
              <i className="fas fa-user-plus me-2"></i> Register
            </h1>

            {alert.show && (
              <div className={`alert alert-${alert.type}`} role="alert">
                {alert.message}
              </div>
            )}

            {showApiStatus && (
              <div className="mb-3">
                <ApiStatusChecker />
                <button className="btn btn-sm btn-outline-secondary mt-2" onClick={() => setShowApiStatus(false)}>
                  Hide API Status
                </button>
              </div>
            )}

            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                  minLength="6"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password2" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  required
                  minLength="6"
                />
              </div>

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>

                {!showApiStatus && (
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setShowApiStatus(true)}>
                    Check API Connection
                  </button>
                )}
              </div>
            </form>

            <p className="mt-3 text-center">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
