import React, { useState } from 'react'
import Alert from './Alert'
import { useNavigate } from 'react-router-dom'

function ForgetPassword(props) {
  const [credentials, setCredentials] = useState({ email: '', newPassword: '' })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        'https://to-do-list-backend-application.vercel.app/api/auth/forgetPassword',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            newPassword: credentials.newPassword,
          }),
        },
      )
      const json = await response.json()

      if (json.success) {
        localStorage.setItem('token', json.authToken)
        localStorage.setItem('name', json.name)
        localStorage.setItem('success', json.success)
        props.showAlert('Password Updated, Proceed to Login', 'success')
        navigate('/login')
      } else {
        props.showAlert('Invalid Credentials', 'warning')
      }
    } catch (error) {
      props.showAlert(`db not connected ${error}`, 'warning')
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="display-4 text-center">ForgetPassword 🧐</div>
            <Alert alert={alert} />
            <br />
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <i className="fa-solid fa-envelope-circle-check"></i> Email
                  address
                </label>
                <input
                  type="email"
                  value={credentials.email}
                  onChange={onChange}
                  className="form-control"
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="newPassword"
                  value={credentials.newPassword}
                  onChange={onChange}
                  className="form-label"
                >
                  <i className="fa-solid fa-key"></i> newPassword
                </label>
                <input
                  type="newPassword"
                  className="form-control"
                  value={credentials.newPassword}
                  name="newPassword"
                  id="newPassword"
                  onChange={onChange}
                  minLength={5}
                  required
                />
              </div>

              <div className="d-grid gap-2 col-6 mx-auto">
                <button type="submit" className="btn btn-primary">
                  Change Password
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  )
}

export default ForgetPassword