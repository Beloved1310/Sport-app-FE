import React, { useState } from "react";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login(props) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    phone: {
      countryCode: "",
      localFormat: "",
    },
  });
  const [loginMethod, setLoginMethod] = useState("email"); // Default to email login
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      password: credentials.password,
    };

    if (loginMethod === "email" && credentials.email) {
      data.email = credentials.email;
    } else if (loginMethod === "phone" && credentials.phone.countryCode && credentials.phone.localFormat) {
      data.phone = {
        countryCode: credentials.phone.countryCode,
        localFormat: credentials.phone.localFormat,
      };
    }
    try {
      const response = await axios.post(
        "https://sports-nations-aeed0bb0afdc.herokuapp.com/api/user/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { data } = response.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        // localStorage.setItem('success', json.success);
        props.showAlert(response.data.message, "success");
        navigate("/");
      } else if (response.status === 404) {
        props.showAlert(response.data.message, "warning");
      } else if (response.status === 400) {
        props.showAlert(response.data.message, "warning");
      } else {
        props.showAlert("Invaid Credentials", "warning");
      }
    } catch (error) {
      if (error.response) {
        // Handle the error message from the response
        props.showAlert(error.response.data.message, "warning");
      } else {
        // Handle other types of errors
        console.log(error);
        props.showAlert("Input did not match", "warning");
      }
    }
  };

  const onChange = (e) => {
    if (e.target.name.startsWith("phone.")) {
      // Handle phone number inputs separately
      setCredentials({
        ...credentials,
        phone: {
          ...credentials.phone,
          [e.target.name.split(".")[1]]: e.target.value,
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
            <div className="display-4 text-center">Login 🥳</div>
            <Alert alert={alert} />
            <br />

            <div className="mb-3">
              <label className="form-label">Login Method: </label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="loginMethod"
                  id="emailLogin"
                  value="email"
                  checked={loginMethod === "email"}
                  onChange={() => setLoginMethod("email")}
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
                  checked={loginMethod === "phone"}
                  onChange={() => setLoginMethod("phone")}
                />
                <label className="form-check-label" htmlFor="phoneLogin">
                  Phone Number
                </label>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {loginMethod === "email" ? (
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
