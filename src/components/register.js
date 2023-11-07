import React, { useState } from 'react'
import Alert from './Alert'
import axios from 'axios'

function Signup(props) {
  const [credentials, setCredentials] = useState({
    username: '',
    sportInterest: '',
    email: '',
    password: '',
    confirm_password: '',
    phone: {
      countryCode: '',
      localFormat: '',
    },
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (credentials.password !== credentials.confirm_password) {
        props.showAlert('Password Incorrect', 'info');
      } else {
        const response = await axios.post('https://sports-nations-aeed0bb0afdc.herokuapp.com/api/user/register', {
          username: credentials.username,
          email: credentials.email,
          sportInterest: credentials.sportInterest,
          password: credentials.password,
          confirm_password: credentials.confirm_password,
          phone: credentials.phone,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 200) {
          props.showAlert(response.data.message, 'success');
          setCredentials({
            username: '',
            sportInterest: '',
            email: '',
            password: '',
            confirm_password: '',
            phone: {
              countryCode: '',
              localFormat: '',
            },
          });
        } else if (response.status === 400) {
          props.showAlert(response.data.message, 'warning');
        } else {
          props.showAlert('An error occurred', 'warning');
        }
      }
    } catch (error) {
      if (error.response) {
        // Handle the error message from the response
        props.showAlert(error.response.data.message, 'warning');
      } else {
        // Handle other types of errors
        console.log(error);
        props.showAlert('Input did not match', 'warning');
      }
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
                    className="form-control w-2"
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
                <label htmlFor="confirm_password" className="form-label">
                  <i className="fa-solid fa-lock"></i> Confirm Password
                </label>
                <input
                  type="confirm_password"
                  value={credentials.confirm_password}
                  onChange={onChange}
                  className="form-control"
                  name="confirm_password"
                  id="confirm_password"
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