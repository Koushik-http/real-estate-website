import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile"; // Ensure this file has appropriate styles

const ProfileModal = ({ onClose }) => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [updatedData, setUpdatedData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true); // New state for loading
  const [showPassword, setShowPassword] = useState(false); // State for show/hide password

  useEffect(() => {
    // Fetch user data from server (you can replace this with your actual API endpoint)
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user");
        setUserData(response.data); // Set user data from the response
        setUpdatedData(response.data); // Initialize updated data for editing
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching user data", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:5000/api/user", updatedData);
      alert(response.data.message);
      setIsEditing(false); // Stop editing after successful update
      setUserData(updatedData); // Update user data with the new data
    } catch (error) {
      console.error("Error updating user data", error);
      alert("Failed to update user data.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>User Profile</h2>
        
        {loading ? ( // Display loading message while fetching user data
          <p>Loading user data...</p>
        ) : isEditing ? (
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="fullName"
              value={updatedData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
            <input
              type="email"
              name="email"
              value={updatedData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <div>
              <input
                type={showPassword ? "text" : "password"} // Toggle between password and text type
                name="password"
                value={updatedData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              >
                {showPassword ? "Hide" : "Show"} Password
              </button>
            </div>
            <button type="submit" className="btn1">Save</button>
            <button onClick={() => setIsEditing(false)} className="btn1">Cancel</button>
          </form>
        ) : (
          <div>
            <p><strong>Full Name:</strong> {userData.fullName}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <button onClick={() => setIsEditing(true)} className="btn1">Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
