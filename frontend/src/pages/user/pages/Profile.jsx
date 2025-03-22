import React from "react";
import "../styles/styles.css";

const Profile = () => {
  // Dummy user data (can be replaced with API data)
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    joined: "January 2024",
    bio: "Passionate about technology and community-driven innovations.",
  };

  return (
    <div className="profile-container">
      <h1>👤 User Profile</h1>
      <div className="profile-card">
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Joined: {user.joined}</p>
        <p>Bio: {user.bio}</p>
      </div>
    </div>
  );
};

export default Profile;
