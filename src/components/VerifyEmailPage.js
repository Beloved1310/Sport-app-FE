import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "./Alert";
import axios from "axios";

function VerifyEmailPage(props) {
  const [verificationData, setVerificationData] = useState({
    token: "",
    otp: "",
    phone: {
      countryCode: "",
      localFormat: "",
    },
  });
  const navigate = useNavigate();
  
  const { token } = useParams();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://sports-nations-aeed0bb0afdc.herokuapp.com/api/user/authentication/activate",
        {
          token: token,
          otp: verificationData.otp,
          phone: verificationData.phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        props.showAlert(response.data.message, "success");
        localStorage.setItem("activate", "success");
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
    if (e.target.name.startsWith("phone.")) {
      // Handle phone number inputs separately
      setVerificationData({
        ...verificationData,
        phone: {
          ...verificationData.phone,
          [e.target.name.split(".")[1]]: e.target.value,
        },
      });
    } else {
      setVerificationData({
        ...verificationData,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="display-4 text-center">Verify Email 📧</div>
          <Alert alert={alert} />
          <br />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="token" className="form-label">
                Verification Token
              </label>
              <input
                type="text"
                value={verificationData.token}
                className="form-control"
                id="token"
                name="token"
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">
                OTP (One-Time Password)
              </label>
              <input
                type="text"
                value={verificationData.otp}
                onChange={onChange}
                className="form-control"
                id="otp"
                name="otp"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone.countryCode" className="form-label">
                Country Code
              </label>
              <input
                type="text"
                value={verificationData.phone.countryCode}
                onChange={onChange}
                className="form-control"
                id="phone.countryCode"
                name="phone.countryCode"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone.localFormat" className="form-label">
                Local Format
              </label>
              <input
                type="text"
                value={verificationData.phone.localFormat}
                onChange={onChange}
                className="form-control"
                id="phone.localFormat"
                name="phone.localFormat"
              />
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button type="submit" className="btn btn-primary">
                Verify
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
