import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [userData, setUserData] = useState({
    username: "",
    sportInterest: "",
    phone: {
      countryCode: "",
      localFormat: "",
    },
    profilePicture: null,
  });

  const [profilePicturePreview, setProfilePicturePreview] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const navigate = useNavigate();

  // Fetch user data from the API endpoint
  useEffect(() => {
    // Replace with your API endpoint URL
    fetch("https://api.example.com/user/profile")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Handle file input change and update the profile picture preview
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileInput(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicturePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload the profile picture to the API
  const uploadProfilePicture = () => {
    // Add your code to upload the file to the API here.
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <img
              src={
                profilePicturePreview ||
                userData.profilePicture ||
                "default.jpg"
              }
              alt="User Profile"
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{userData.username}</h5>
              <p className="card-text">
                Sport Interest: {userData.sportInterest}
                <br />
                Phone Number: {userData.phone.countryCode} -{" "}
                {userData.phone.localFormat}
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
              />
              {fileInput && (
                <button
                  className="btn btn-primary"
                  onClick={uploadProfilePicture}
                >
                  Upload Profile Picture
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
