"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [alert, setAlert] = useState({ show: false, type: "", message: "" })
  const { login, isAuthenticated, error, clearError } = useAuth()
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
        message: error,
      })
      clearError()
    }
  }, [isAuthenticated, error, navigate, clearError])

  const { email, password } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const result = await login(formData)

    if (!result.success) {
      setAlert({
        show: true,
        type: "danger",
        message: result.error,
      })
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-body p-5">
            <h1 className="text-center mb-4">
              <i className="fas fa-sign-in-alt me-2"></i> Login
            </h1>

            {alert.show && (
              <div className={`alert alert-${alert.type}`} role="alert">
                {alert.message}
              </div>
            )}

            <form onSubmit={onSubmit}>
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

              <div className="mb-4">
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
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2">
                Login
              </button>
            </form>

            <p className="mt-3 text-center">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
