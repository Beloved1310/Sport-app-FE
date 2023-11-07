import React, { useState } from "react";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";

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
      const response = await fetch(
        "https://to-do-list-backend-application.vercel.app/api/auth/updteUser",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userData.username,
            email: userData.email,
            password: userData.password,
          }),
        }
      );
      const json = await response.json();

      if (json.success) {
        props.showAlert("Setting Updates", "success");
      } else {
        props.showAlert("Invalid Credentials", "warning");
      }
    } catch (error) {
      props.showAlert(`db not connected ${error}`, "warning");
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
                  required
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
                  required
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
                  required
                />
              </div>
              <div className="d-grid gap-2 col-6 mx-auto">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button className="btn btn-primary" onClick={logout}>
                <i className="fa-solid fa-user mx-1"></i>Logout
              </button>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
}

export default SettingsPage;
