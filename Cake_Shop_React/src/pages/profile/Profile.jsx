import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarker,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { api } from "../../api/axios.api";
import "./Profile.scss";
import { getUserData, setUserData } from "../../utils/commonUtils";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const userData = getUserData();

  const [profileData, setProfileData] = useState({
    id: userData?.id,
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    email: userData?.email,
    phone: userData?.phone,
    address: userData?.address,
  });

  const [editData, setEditData] = useState(profileData);

  const handleEditClick = () => {
    setEditData(profileData);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    api
      .patch(`/api/users/${profileData.id}`, editData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log("API Response:", response.data);
        setUserData(response.data.user);
        setProfileData(editData);
        setIsEditing(false);
        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => setSuccessMessage(""), 5000);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>My Profile</h1>

        {successMessage && (
          <div className="success-message">
            <p>{successMessage}</p>
          </div>
        )}

        <div className="profile-content">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-avatar">
              <FaUser />
            </div>
            <div className="profile-header-info">
              <h2>
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p>{profileData.email}</p>
            </div>
            {!isEditing && (
              <button className="edit-btn" onClick={handleEditClick}>
                <FaEdit /> Edit Profile
              </button>
            )}
          </div>

          {/* Profile Information */}
          {!isEditing ? (
            <div className="profile-info">
              <div className="info-grid">
                <div className="info-card">
                  <div className="info-icon">
                    <FaUser />
                  </div>
                  <div className="info-content">
                    <label>Full Name</label>
                    <p>
                      {profileData.firstName} {profileData.lastName}
                    </p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <FaEnvelope />
                  </div>
                  <div className="info-content">
                    <label>Email Address</label>
                    <p>{profileData.email}</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <FaPhone />
                  </div>
                  <div className="info-content">
                    <label>Phone Number</label>
                    <p>{profileData.phone}</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <FaMapMarker />
                  </div>
                  <div className="info-content">
                    <label>Address</label>
                    <p>{profileData.address}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Edit Form */
            <div className="profile-edit-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={editData.firstName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={editData.lastName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={editData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={editData.address}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button className="save-btn" onClick={handleSave}>
                  <FaSave /> Save Changes
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  <FaTimes /> Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
