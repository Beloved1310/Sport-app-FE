import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProfilePage() {
  const [userData, setUserData] = useState({
    username: "",
    sportInterest: "",
    phoneNumber: "",
  });

  const [profilePicturePreview, setProfilePicturePreview] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user data from the API endpoint
  useEffect(() => {
    const host = "https://sports-nations-aeed0bb0afdc.herokuapp.com";
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found.");
          // Handle the absence of a token, e.g., redirect to the login page.
          return;
        }

        const response = await axios.get(`${host}/api/user`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const { data } = response.data;
        setUserData(data);
        setLoading(false);
      } catch (error) {
        // Handle errors if necessary
        console.error("Error fetching user details:", error);
        navigate("/login");
      }
    };

    fetchData(); // Call the async function to fetch and set the data
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

  const avatarLetter = userData.username.charAt(0).toUpperCase();

  return (
    <div className="profile-container d-flex justify-content-center align-items-center vh-100">
      <div className="card">
        <div
          className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
          style={{ width: "200px", height: "200px", fontSize: "24px" }}
        >
          {profilePicturePreview ? (
            <img
              src={profilePicturePreview}
              alt="Profile"
              className="card-img-top rounded-circle"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          ) : (
            <div>{avatarLetter}</div>
          )}
        </div>

        <div className="card-body text-center">
          <h5 className="card-title">{userData.username}</h5>
          <p className="card-text">
            Sport Interest: {userData.sportInterest}
            <br />
            Phone Number: {userData.phoneNumber}
          </p>
          <label className="custom-file-upload btn btn-secondary">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
