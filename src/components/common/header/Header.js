import React, { useState, useEffect } from "react";
import axios from "axios";
import "./header.css";
import ProfileModal from "../../Profile/ProfileModal"; // Import the ProfileModal component
import { nav } from "../../data/Data";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [navList, setNavList] = useState(false);
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [showProfileModal, setShowProfileModal] = useState(false); // New state for profile modal
  const [profileData, setProfileData] = useState(null); // State to hold profile data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Check if the user is logged in
    const userLoggedIn = localStorage.getItem("userLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/register", formData);
      alert(response.data.message);
      setShowRegister(false); // Close modal after successful registration
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", loginData);
      alert(response.data.message);
      localStorage.setItem("userLoggedIn", "true"); // Store login status
      setIsLoggedIn(true); // Update login state
      setShowLogin(false); // Close modal after successful login
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn"); // Clear login status
    setIsLoggedIn(false); // Update login state
    navigate("/"); // Redirect to home page or login page
  };

  const handleProfileClick = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` // Assuming you use a token for authentication
        }
      });
      setProfileData(response.data); // Set profile data
      setShowProfileModal(true); // Show profile modal
    } catch (error) {
      alert("Error fetching profile data");
    }
  };

  return (
    <>
      <header>
        <div className="container flex">
          <div className="logo">
            <Link to={"/"}>
              <img src="https://i.ibb.co/ZTKM8px/newlogo.png" alt="logo" />
            </Link>
          </div>
          <div className="nav">
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
              <li>
                <Link to="/location">Location</Link>
              </li>
            </ul>
          </div>
          <div className="button flex">
            {isLoggedIn ? (
              <>
                <button className="btn1" onClick={handleLogout}>
                  <i className="fa fa-sign-out"></i> Logout
                </button>
                <button className="btn1" onClick={handleProfileClick}>
                  <i className="fa fa-user"></i> Profile
                </button>
              </>
            ) : (
              <>
                <button className="btn1" onClick={() => setShowLogin(true)}>
                  <i className="fa fa-sign-in"></i> Log In
                </button>
                <button className="btn1" onClick={() => setShowRegister(true)}>
                  <i className="fa fa-user-plus"></i> Sign Up
                </button>
              </>
            )}
          </div>

          <div className="toggle">
            <button onClick={() => setNavList(!navList)}>
              {navList ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
            </button>
          </div>
        </div>
      </header>

      {/* Show Profile Modal */}
      {showProfileModal && <ProfileModal profileData={profileData} onClose={() => setShowProfileModal(false)} />}

      {/* Registration Modal */}
      {showRegister && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowRegister(false)}>
              &times;
            </span>
            <h2>Register</h2>
            <form onSubmit={handleRegisterSubmit}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit" className="btn1">Sign Up</button>
            </form>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowLogin(false)}>
              &times;
            </span>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
              <button type="submit" className="btn1">Log In</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
