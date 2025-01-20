import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { updateUserInfo } from "../utilities/users-api";
import { getUser } from "../utilities/users-services";
import { Eye, EyeSlash } from "react-bootstrap-icons"; // Import Bootstrap Icons

const ProfilePage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({ username: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Function to fetch and set user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = getUser();
        if (currentUser) {
          setUser(currentUser); // Set the user data directly
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Prefill form data whenever user data changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      username: user.username,
      email: user.email, // Don't allow editing of email
    }));
  }, [user]);

  // Handle edit button click
  const handleEdit = () => {
    setFormData({
      username: user.username,
      email: user.email, // Keep email read-only
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setIsEditing(true);
  };

  // Save user data and handle validation
  const handleSave = async () => {
    // Validate input
    if (!formData.currentPassword) {
      alert("Current password is required.");
      return;
    }

    // if (!formData.newPassword || formData.newPassword.length < 8) {
    //   alert("New password must be at least 8 characters long.");
    //   return;
    // }

    if (formData.newPassword !== formData.confirmNewPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    // Prepare data to send
    const dataToSend = {
      username: formData.username,
      email: formData.email,
      password: formData.currentPassword,
      newPassword: formData.newPassword,
    };

    try {
      const updatedUser = await updateUserInfo(dataToSend); // Send data to backend
      setUser(updatedUser); // Update the user in state
      setIsEditing(false); // Close the edit form
      alert("Profile updated successfully!");
      //refresh the page
      window.location.reload();
  


      if (updatedUser.token) {
        localStorage.setItem("token", updatedUser.token); // Update token if it's returned
      }
    } catch (error) {
      console.error("Error updating user information:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <NavBar layout={"vertical"} />
      <div className="profile-container">
        <h1 className="title">Profile Page</h1>
        <div className="profile-page">
          <div className="profile-info">
            <h2 className="subtitle">{user.username}'s Profile</h2>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Password:</strong> ********
            </p>
            <button onClick={handleEdit}>Edit Profile</button>
          </div>

          {isEditing && (
            <div className="modal">
              <div className="modal-content">
                <h3>Edit Profile</h3>
                <label>
                  Username:
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    readOnly // Prevent email editing
                  />
                </label>

                <label>Current Password: </label>
                <div className="password-container1">
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    id="togglePassword"
                    aria-label="Toggle password visibility"
                    onClick={togglePasswordVisibility}
                    className="password-toggle-btn"
                  >
                    {showPassword ? <Eye /> : <EyeSlash />} {/* Icons */}
                  </button>
                </div>
                <label>New Password: </label>
                <div className="password-container1">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    id="togglePassword"
                    aria-label="Toggle password visibility"
                    onClick={togglePasswordVisibility}
                    className="password-toggle-btn"
                  >
                    {showPassword ? <Eye /> : <EyeSlash />} {/* Icons */}
                  </button>
                </div>

                <label>Confirm New Password: </label>
                <div className="password-container1">
                  <input
                    type="password"
                    name="confirmNewPassword"
                    placeholder="Confirm new password"
                    onChange={handleChange}
                    value={formData.confirmNewPassword}
                  />
                  <button
                    type="button"
                    id="togglePassword"
                    aria-label="Toggle password visibility"
                    onClick={togglePasswordVisibility}
                    className="password-toggle-btn"
                  >
                    {showPassword ? <Eye /> : <EyeSlash />} {/* Icons */}
                  </button>
                </div>

                <div className="modal-actions">
                  <button
                    disabled={
                      formData.newPassword !== formData.confirmNewPassword
                    }
                    type="submit"
                    className="primary-btn"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="secondary-btn"
                    style={{ backgroundColor: "#80848C" }}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
