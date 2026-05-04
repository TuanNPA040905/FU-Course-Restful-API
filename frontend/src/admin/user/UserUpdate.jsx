import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UserUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullName: "",
    address: "",
    role: "USER",
  });
  const [errors, setErrors] = useState({});

  // Gọi API để load dữ liệu cũ lên form
  useEffect(() => {
    const fetchOldData = async () => {
      try {
        // --- MOCK DATA ---
        setFormData({
          email: "admin@test.com",
          phone: "0123456789",
          fullName: "System Admin Old",
          address: "Hà Nội",
          role: "ADMIN",
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchOldData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi data dưới dạng JSON thuần túy
      // await axios.put(`http://localhost:8080/api/admin/users/${id}`, formData);

      console.log("Mock Update Success:", formData);
      alert("Cập nhật người dùng thành công!");
      navigate("/admin/user");
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
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
        <li className="breadcrumb-item">
          <Link to="/admin/user">Users</Link>
        </li>
        <li className="breadcrumb-item active">Update</li>
      </ol>

      <div className="mt-5 row">
        <div className="col-md-6 col-12 mx-auto">
          <h3>Update a user</h3>
          <hr />

          <form onSubmit={handleSubmit}>
            {/* Email (Readonly) */}
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                value={formData.email}
                readOnly
                style={{ backgroundColor: "#e9ecef", cursor: "not-allowed" }}
              />
            </div>

            {/* Phone Number */}
            <div className="mb-3">
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

            {/* Full Name */}
            <div className="mb-3">
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

            {/* Address */}
            <div className="mb-3">
              <label className="form-label">Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* Role */}
            <div className="mb-3">
              <label className="form-label">Role:</label>
              <select
                className="form-select"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
              </select>
            </div>

            <div className="mt-4 mb-5">
              <button type="submit" className="btn btn-warning text-white">
                Update
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

export default UserUpdate;
