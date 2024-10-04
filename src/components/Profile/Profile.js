import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css"; // Ensure this path is correct

const Profile = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    // Fetch user data from server (you can replace this with your actual API endpoint)
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user");
        setUserData(response.data); // Set user data from the response
        setUpdatedData(response.data); // Initialize updated data for editing
      } catch (error) {
        console.error("Error fetching user data", error);
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
    <div className="profile-container">
      <h2>User Profile</h2>
      {isEditing ? (
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
          <input
            type="password"
            name="password"
            value={updatedData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
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
  );
};

export default Profile;
