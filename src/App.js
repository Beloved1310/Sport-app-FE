import React, { useState } from 'react'
import ForgetPassword from './components/ForgetPassword.js'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Alert from './components/Alert'
import Signup from './components/register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SportState from './context/SportState'

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })

    setTimeout(() => {
      setAlert(null)
    }, 2000)
  }
  return (
    <>
      <SportState showAlert={showAlert}>
        <Router>
          <Navbar title="SPORTS!" showAlert={showAlert} />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
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
              element={<Login showAlert={showAlert} />}
            />
          </Routes>
        </Router>
      </SportState>
    </>
  )
}

export default App