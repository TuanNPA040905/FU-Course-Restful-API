import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Dữ liệu User giả lập
  const [user, setUser] = useState({
    fullName: "Nguyễn Văn Học Viên",
    email: "hocvien@fpt.edu.vn",
    phone: "0123456789",
    address: "Hòa Lạc, Hà Nội",
    avatar: "https://via.placeholder.com/150",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert("Đã lưu thông tin hồ sơ!");
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div>
          <h1 className="profile-title">My Profile</h1>
          <p className="profile-subtitle">Manage your account information</p>
        </div>
        <div>
          {!isEditing ? (
            <button
              className="btn-primary-custom"
              onClick={() => setIsEditing(true)}
            >
              <i className="fas fa-edit me-2"></i> Edit Profile
            </button>
          ) : (
            <div className="d-flex gap-2">
              <button
                className="btn-outline-custom"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="btn-primary-custom"
                onClick={handleSaveProfile}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="profile-card">
        <div className="avatar-section">
          <div className="avatar-wrap">
            <div className="avatar-ring">
              <img src={user.avatar} alt="Avatar" className="avatar-img" />
            </div>
            {isEditing && (
              <label className="avatar-upload-btn">
                <i className="fas fa-camera" style={{ fontSize: "12px" }}></i>
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                />
              </label>
            )}
          </div>
          <div className="avatar-info">
            <h2 className="text-white mb-1">{user.fullName}</h2>
            <p className="text-secondary">{user.email}</p>
          </div>
        </div>

        <div className="form-grid">
          <div className="field">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              className="profile-input"
              value={user.fullName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="field">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              className="profile-input"
              value={user.email}
              disabled
            />
          </div>
          <div className="field">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="profile-input"
              value={user.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="field">
            <label>Address</label>
            <input
              type="text"
              name="address"
              className="profile-input"
              value={user.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>

      {/* Password Section */}
      <div className="profile-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-white mb-0">
            <i className="fas fa-lock me-2 text-primary"></i> Password
          </h4>
          {!showPasswordForm && (
            <button
              className="btn btn-link text-primary text-decoration-none"
              onClick={() => setShowPasswordForm(true)}
            >
              Change Password
            </button>
          )}
        </div>

        {!showPasswordForm ? (
          <div className="text-secondary tracking-widest fs-4">
            ••••••••••••
          </div>
        ) : (
          <form className="form-grid">
            <div className="field full">
              <label>Current Password</label>
              <input
                type="password"
                className="profile-input"
                placeholder="Enter current password"
              />
            </div>
            <div className="field">
              <label>New Password</label>
              <input
                type="password"
                className="profile-input"
                placeholder="Min. 8 characters"
              />
            </div>
            <div className="field">
              <label>Confirm New Password</label>
              <input
                type="password"
                className="profile-input"
                placeholder="Repeat new password"
              />
            </div>
            <div className="field full d-flex gap-2 mt-2">
              <button
                type="button"
                className="btn-outline-custom w-50"
                onClick={() => setShowPasswordForm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary-custom w-50"
                onClick={() => alert("Đổi mật khẩu thành công!")}
              >
                Update Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
