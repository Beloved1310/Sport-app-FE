import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Alert from './Alert';

function VerifyEmailPage() {
  const [verificationData, setVerificationData] = useState({
    token: '',
    otp: '',
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract the token from the URL query parameters
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');

    try {
      const response = await fetch(
        'https://your-api-url/verifyEmail',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: token,
            otp: verificationData.otp,
          }),
        }
      );

      const json = await response.json();

      if (json.success) {
        // Verification successful, navigate to login page
        navigate('/login');
      } else {
        // Verification failed, show an error message
        // You can use the showAlert function to display the error message
      }
    } catch (error) {
      // Handle network or other errors
      console.error(error);
    }
  };

  const onChange = (e) => {
    setVerificationData({ ...verificationData, [e.target.name]: e.target.value });
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
