import React, { useState } from "react";
import ForgetPassword from "./components/ForgetPassword.js";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Alert from "./components/Alert";
import Signup from "./components/register";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import VerifyEmailPage from "./components/VerifyEmailPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SportState from "./context/SportState";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 9000);
  };

  return (
    <>
      <SportState showAlert={showAlert}>
        <Router>
          <Navbar title="SPORTS!" showAlert={showAlert} />
          <Alert alert={alert} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                localStorage.getItem("token") ? (
                  <Home showAlert={showAlert} />
                ) : (
                  <Navigate to="/signup" />
                )
              }
            />

            <Route
              exact
              path="/forgetPassword"
              element={<ForgetPassword showAlert={showAlert} />}
            />
            <Route
              exact
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            />
            <Route
              exact
              path="/login"
              element={
                localStorage.getItem("activate") === "success" ? (
                  <Login showAlert={showAlert} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              exact
              path="/settings"
              element={<Settings showAlert={showAlert} />}
            />

            <Route
              exact
              path="/profile"
              element={<Profile showAlert={showAlert} />}
            />

            <Route
              exact
              path="/verify/:token"
              element={<VerifyEmailPage showAlert={showAlert} />}
            />
          </Routes>
        </Router>
      </SportState>
    </>
  );
}

export default App;
