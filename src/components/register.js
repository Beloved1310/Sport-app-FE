import React, { useState } from 'react'
import Alert from './Alert'
import { useNavigate } from 'react-router-dom'

function Signup(props) {
  const [credentials, setCredentials] = useState({
    username: '',
    sportInterest: '',
    email: '',
    password: '',
    cpassword: '',
    phone: {
      countryCode: '',
      localFormat: '',
    },
  })
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (credentials.password !== credentials.cpassword) {
        props.showAlert('Password Inccorect', 'info')
      } else {
        const response = await fetch(
          'https://to-do-list-backend-application.vercel.app/api/auth/createUser',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: credentials.username,
              email: credentials.email,
              password: credentials.password,
              cpassword: credentials.cpassword,
              phone: credentials.phone,
            }),
          },
        )
        const json = await response.json()
        console.log(json)
        if (!json.success) {
          props.showAlert('Email with this your Already Exists', 'warning')
        } else {
          localStorage.setItem('token', json.authToken)
          localStorage.setItem('name', json.name)
          localStorage.setItem('success', json.success)
          navigate('/login')
          props.showAlert('Signup Success', 'success')
        }
      }
    } catch (error) {
      props.showAlert('db not connected', 'warning')
    }
  }

  const onChange = (e) => {
    if (e.target.name === 'phone.countryCode' || e.target.name === 'phone.localFormat') {
      // Handle phone number inputs separately
      setCredentials({
        ...credentials,
        phone: {
          ...credentials.phone,
          [e.target.name.split('.')[1]]: e.target.value,
        },
      });
    } else {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="display-4 text-center">SignUp 🤓</div>
            <br />
            <Alert alert={alert} />
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  {' '}
                  <i className="fa-solid fa-file-signature"></i> Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={onChange}
                  aria-describedby="nameHelp"
                  minLength={3}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="sportinterest" className="form-label">
                  {' '}
                  <i className="fa-solid fa-file-signature"></i> Sport Interest
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sportInterest"
                  name="sportInterest"
                  value={credentials.sportInterest}
                  onChange={onChange}
                  aria-describedby="nameHelp"
                  minLength={3}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    value={credentials.phone.countryCode}
                    onChange={onChange}
                    className="form-control form-control-sm w-2"
                    name="phone.countryCode"
                    placeholder="country code"
                    aria-describedby="countryCodeAddon"
                    required
                  />
                  <input
                    type="text"
                    value={credentials.phone.localFormat}
                    onChange={onChange}
                    className="form-control"
                    name="phone.localFormat"
                    placeholder="Local Format"
                    required
                  />
                </div>
              </div>
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
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  <i className="fa-solid fa-key"></i> Password
                </label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={onChange}
                  className="form-control"
                  name="password"
                  id="password"
                  minLength={5}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">
                  <i className="fa-solid fa-lock"></i> Confirm Password
                </label>
                <input
                  type="cpassword"
                  value={credentials.cpassword}
                  onChange={onChange}
                  className="form-control"
                  name="cpassword"
                  id="cpassword"
                  minLength={5}
                  required
                />
              </div>
              <div className="d-grid gap-2 col-6 mx-auto">
                <button type="submit" className="btn btn-primary">
                  SignUp
                </button>
              </div>
            </form>
            <br />
            <br />
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  )
}

export default Signup