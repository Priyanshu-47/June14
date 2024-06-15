import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = ({ userId }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`https://localhost:7188/api/User/${userId}`);
        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (userId) {
      fetchUserProfile();
    }

  }, [userId]); // Ensure useEffect runs when userId changes

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      {userProfile && (
        <div className="user-profile">
          <div className="profile-info">
            <p><strong>Username:</strong> {userProfile.userName}</p>
            <p><strong>Email:</strong> {userProfile.email}</p>
          </div>
          {/* Additional profile details can be displayed here */}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
