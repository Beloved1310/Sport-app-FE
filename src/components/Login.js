import React, { useState } from 'react';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: '',
    phone: {
      countryCode: '',
      localFormat: '',
    },
  });
  const [loginMethod, setLoginMethod] = useState('email'); // Default to email login
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://to-do-list-backend-application.vercel.app/api/auth/loginUser',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        },
      );
      const json = await response.json();

      if (json.success) {
        localStorage.setItem('token', json.authToken);
        localStorage.setItem('name', json.name);
        localStorage.setItem('success', json.success);
        props.showAlert('Login Success', 'success');
        navigate('/');
      } else {
        props.showAlert('Invalid Credentials', 'warning');
      }
    } catch (error) {
      props.showAlert(`db not connected ${error}`, 'warning');
    }
  }

  const onChange = (e) => {
    if (e.target.name.startsWith('phone.')) {
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
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="display-4 text-center">Login 🥳</div>
            <Alert alert={alert} />
            <br />

            <div className="mb-3">
              <label className="form-label">Login Method</label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="loginMethod"
                  id="emailLogin"
                  value="email"
                  checked={loginMethod === 'email'}
                  onChange={() => setLoginMethod('email')}
                />
                <label className="form-check-label" htmlFor="emailLogin">
                  Email
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="loginMethod"
                  id="phoneLogin"
                  value="phone"
                  checked={loginMethod === 'phone'}
                  onChange={() => setLoginMethod('phone')}
                />
                <label className="form-check-label" htmlFor="phoneLogin">
                  Phone Number
                </label>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {loginMethod === 'email' ? (
                <div className="mb-3">
                  <label htmlFor="identifier" className="form-label">
                    <i className="fa-solid fa-envelope-circle-check"></i> Email address
                  </label>
                  <input
                    type="email"
                    value={credentials.identifier}
                    onChange={onChange}
                    className="form-control"
                    id="identifier"
                    name="identifier"
                    aria-describedby="emailHelp"
                  />
                </div>
              ) : (
                <div className="mb-3">
                  <label htmlFor="phone.countryCode" className="form-label">
                    Country Code
                  </label>
                  <input
                    type="text"
                    value={credentials.phone.countryCode}
                    onChange={onChange}
                    className="form-control"
                    id="phone.countryCode"
                    name="phone.countryCode"
                    aria-describedby="phoneCountryCodeHelp"
                  />
                  <label htmlFor="phone.localFormat" className="form-label">
                    Local Format
                  </label>
                  <input
                    type="text"
                    value={credentials.phone.localFormat}
                    onChange={onChange}
                    className="form-control"
                    id="phone.localFormat"
                    name="phone.localFormat"
                    aria-describedby="phoneLocalFormatHelp"
                  />
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  <i className="fa-solid fa-key"></i> Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={credentials.password}
                  name="password"
                  id="password"
                  onChange={onChange}
                  minLength={5}
                  required
                />
              </div>

              <div className="d-grid gap-2 col-6 mx-auto">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
}

export default Login;
