import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../utils/axiosConfig";

const UserCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    fullName: "",
    address: "",
    role: "USER",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [errors, setErrors] = useState({}); // Dùng để hiển thị lỗi validate từ Spring Boot

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file)); // Thay thế jQuery tạo preview ảnh
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const multipartData = new FormData(); // ✅ Đổi tên biến để không đè lên state formData

    const userData = {
      email: formData.email, // ✅ formData (state), không phải formState
      password: formData.password,
      fullName: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      roleName: formData.role,
    };

    multipartData.append(
      "data",
      new Blob([JSON.stringify(userData)], { type: "application/json" }),
    );

    if (avatarFile) {
      multipartData.append("avatar", avatarFile);
    }

    try {
      await axiosInstance.post("/api/v1/users", multipartData); // ✅ Bỏ headers
      alert("Tạo người dùng thành công!");
      navigate("/admin/user");
    } catch (error) {
      if (error.response?.status === 400) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Manage Users</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item">
          <Link to="/admin">Dashboard</Link>
        </li>
        <li className="breadcrumb-item active">Users</li>
      </ol>

      <div className="mt-5 row">
        <div className="col-md-6 col-12 mx-auto">
          <h3>Create a user</h3>
          <hr />

          <form
            onSubmit={handleSubmit}
            className="row g-3"
            encType="multipart/form-data"
          >
            <div className="col-md-6">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                required
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                required
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Phone number:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                required
              />
              {errors.fullName && (
                <div className="invalid-feedback">{errors.fullName}</div>
              )}
            </div>

            <div className="col-12">
              <label className="form-label">Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Role:</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-select"
              >
                <option value="ADMIN">ADMIN</option>
                <option value="MENTOR">MENTOR</option>
                <option value="USER">USER</option>
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="avatarFile" className="form-label">
                Avatar:
              </label>
              <input
                type="file"
                id="avatarFile"
                name="avatarFile"
                accept=".png, .jpg, .jpeg"
                onChange={handleAvatarChange}
                className="form-control"
              />
            </div>

            {avatarPreview && (
              <div className="col-12 mb-3">
                <img
                  src={avatarPreview}
                  alt="avatar preview"
                  style={{ maxHeight: "250px", borderRadius: "8px" }}
                />
              </div>
            )}

            <div className="col-12 mb-5 mt-4">
              <button type="submit" className="btn btn-primary px-4">
                Create
              </button>
              <Link to="/admin/user" className="btn btn-secondary ms-2">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserCreate;
