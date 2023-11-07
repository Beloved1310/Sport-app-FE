import React, { useState } from "react";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SettingsPage(props) {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("success");
    localStorage.removeItem("name");
    navigate("/login");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found.");
        // Handle the absence of a token, e.g., redirect to the login page.
        return;
      }
      const response = await axios.put(
        "https://sports-nations-aeed0bb0afdc.herokuapp.com/api/user/settings/update",
        {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data.message, "message");
        props.showAlert(response.data.message, "success");
        const newUserName = response.data.message.split(",")[0].trim();
        localStorage.setItem("username", newUserName);
        navigate("/");
      } else if (response.status === 404) {
        props.showAlert(response.data.message, "warning");
      } else if (response.status === 400) {
        props.showAlert(response.data.message, "warning");
      } else {
        props.showAlert("Invalid Credentials", "warning");
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
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="display-4 text-center">Settings ⚙️</div>
            <Alert alert={alert} />
            <br />
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  value={userData.username}
                  onChange={onChange}
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder={userData.username}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={onChange}
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder={userData.email}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  value={userData.newPassword}
                  onChange={onChange}
                  className="form-control"
                  id="password"
                  name="password"
                />
              </div>
              <div className="d-grid gap-2 col-6 mx-auto">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <a
                href="/login"
                className="btn btn-link text-primary"
                onClick={logout}
              >
                <i className="fa-solid fa-user mx-1"> click on this to</i>Logout
              </a>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
}

export default SettingsPage;
