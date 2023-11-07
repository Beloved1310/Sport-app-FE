import React, { useState } from "react";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgetPassword(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "https://sports-nations-aeed0bb0afdc.herokuapp.com/api/user/reset-password",
        {
          email: credentials.email,
          password: credentials.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        props.showAlert(response.data.message, "success");
        navigate("/login");
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
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
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
                  htmlFor="password"
                  value={credentials.password}
                  onChange={onChange}
                  className="form-label"
                >
                  <i className="fa-solid fa-key"></i> password
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

              <div className="d-grid gap-2 col-6">
                <button type="submit" className="btn btn-primary h-8">
                  reset password
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

export default ForgetPassword;
