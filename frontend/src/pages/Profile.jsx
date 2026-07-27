import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Profile.css";

function Profile() {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await API.get("/users/profile/");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const updateProfile = async () => {
    try {
      await API.put("/users/profile/update/", {
        username: user.username,
        phone: user.phone,
      });

      alert("Profile Updated");

      setEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">👤</div>

          <h1>My Profile</h1>

          <p>Manage your TeaConnect AI account</p>
        </div>

        <div className="profile-body">
          <div className="profile-item">
            <span>Name</span>

            {editing ? (
              <input
                value={user.username || ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    username: e.target.value,
                  })
                }
              />
            ) : (
              <h3>{user.username}</h3>
            )}
          </div>

          <div className="profile-item">
            <span>Email</span>

            <h3>{user.email}</h3>
          </div>

          <div className="profile-item">
            <span>Phone</span>

            {editing ? (
              <input
                value={user.phone || ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    phone: e.target.value,
                  })
                }
              />
            ) : (
              <h3>{user.phone}</h3>
            )}
          </div>

          <div className="profile-item">
            <span>Role</span>

            <h3 className="role">{user.role}</h3>
          </div>
        </div>

        {editing ? (
          <button className="edit-btn" onClick={updateProfile}>
            Save Changes
          </button>
        ) : (
          <button className="edit-btn" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
