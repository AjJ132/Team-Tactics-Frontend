

import React, { useState } from 'react';
import './userprofile.css';

const UserProfile = () => {
  // Sample user data
  const initialUserData = {
    displayName: 'Josh Williams',
    username: 'jwil1384',
    email: 'josh@example.com',
    phoneNumber: '123-456-7890',
    profilePicture: '/Users/joshwilliams/Downloads/profilepic.png',
  };

  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setEditing] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);

  const handleEditProfile = () => {
    setEditing(!isEditing);
  };

  const handleChangePassword = () => {
    setPasswordChange(true);
  };

  const handleLogout = () => {
    // Add logout logic later, idk how
    console.log('Logging out...');
  };

  const handleSaveProfile = () => {
    // Need to send this to the backend, not sure how
    setUserData((prevUserData) => ({
      ...prevUserData,
      displayName: document.getElementById('display-name-input').value,
      username: document.getElementById('username-input').value,
      email: document.getElementById('email-input').value,
      phoneNumber: document.getElementById('phone-number-input').value,
    }));

    
    setEditing(false);
  };

  return (
    <div className="user-profile-container">
      <div className="user-info">
        <h2 className="profile-heading">
          <img
            src={userData.profilePicture}
            className="profile-picture"
            style={{ marginRight: '10px', borderRadius: '50%', width: '70px', height: '70px', left: '-50px' }}
          />
          {userData.username}
        </h2>
        <p className="user-info-label">
          <strong>DISPLAY NAME</strong>
        </p>
        <p className="user-info-value">
          {isEditing ? (
            <input
              id="display-name-input"
              className="input-field"
              type="text"
              defaultValue={userData.displayName}
            />
          ) : (
            userData.displayName
          )}
        </p>
        <p className="user-info-label">
          <strong>USERNAME</strong>
        </p>
        <p className="user-info-value">
          {isEditing ? (
            <input
              id="username-input"
              className="input-field"
              type="text"
              defaultValue={userData.username}
            />
          ) : (
            userData.username
          )}
        </p>
        <p className="user-info-label">
          <strong>EMAIL</strong>
        </p>
        <p className="user-info-value">
          {isEditing ? (
            <input
              id="email-input"
              className="input-field"
              type="text"
              defaultValue={userData.email}
            />
          ) : (
            userData.email
          )}
        </p>
        <p className="user-info-label">
          <strong>PHONE NUMBER</strong>
        </p>
        <p className="user-info-value">
          {isEditing ? (
            <input
              id="phone-number-input"
              className="input-field"
              type="text"
              defaultValue={userData.phoneNumber}
            />
          ) : (
            userData.phoneNumber
          )}
        </p>
      </div>

      <div className="actions">
        {!isEditing && (
          <>
            <button
              className="secondary-button change-password-button"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
            <button className="secondary-button logout-button" onClick={handleLogout}>
              Logout
            </button>
            <button className="primary-button edit-profile-button" onClick={handleEditProfile}>
              Edit Profile
            </button>
          </>
        )}
        {isEditing && (
          <button className="primary-button save-profile-button" onClick={handleSaveProfile}>
            Save Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
