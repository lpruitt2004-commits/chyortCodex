import React, { useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    username: "Scholar-001",
    status: "Active",
    level: "Advanced",
    joined: "2024-06-15",
    completedTasks: 47,
    notesCreated: 23,
    eventsScheduled: 12,
    favoriteSubjects: ["Physics", "Computer Science", "Mathematics"],
  });

  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(profile.username);

  const saveProfile = () => {
    setProfile({ ...profile, username });
    setEditing(false);
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">👤</div>
          {editing ? (
            <div className="username-edit">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="username-input"
              />
              <button onClick={saveProfile} className="save-btn">
                SAVE
              </button>
              <button onClick={() => setEditing(false)} className="cancel-btn">
                CANCEL
              </button>
            </div>
          ) : (
            <div className="username-display">
              <h3>{profile.username}</h3>
              <button onClick={() => setEditing(true)} className="edit-btn">
                EDIT
              </button>
            </div>
          )}
        </div>

        <div className="profile-info">
          <div className="info-row">
            <span className="info-label">Status:</span>
            <span className="info-value">{profile.status}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Level:</span>
            <span className="info-value">{profile.level}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Member Since:</span>
            <span className="info-value">
              {new Date(profile.joined).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="profile-stats">
          <h4>Activity Statistics</h4>
          <div className="stat-item">
            <span className="stat-label">Tasks Completed:</span>
            <span className="stat-value">{profile.completedTasks}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Notes Created:</span>
            <span className="stat-value">{profile.notesCreated}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Events Scheduled:</span>
            <span className="stat-value">{profile.eventsScheduled}</span>
          </div>
        </div>

        <div className="profile-subjects">
          <h4>Favorite Subjects</h4>
          <div className="subjects-list">
            {profile.favoriteSubjects.map((subject, idx) => (
              <span key={idx} className="subject-badge">
                {subject}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
