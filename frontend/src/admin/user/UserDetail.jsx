import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../utils/axiosConfig";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/users/${id}`);
        setUser(response.data.data);
      } catch (error) {
        console.error("Lỗi khi tải chi tiết người dùng:", error);
      }
    };
    fetchUserDetail();
  }, [id]);

  if (!user) return <div className="p-4">Loading...</div>;

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
        <li className="breadcrumb-item active">User details</li>
      </ol>

      <div className="container mt-5">
        <div className="row">
          <div className="col-12 mx-auto">
            <div className="d-flex justify-content-between">
              <h3>User detail with id = {id}</h3>
            </div>
            <hr />

            <div className="card" style={{ width: "60%" }}>
              <div className="card-header fw-bold">User information</div>

              <img
                className="card-img-top"
                style={{ width: "250px", padding: "15px" }}
                src={user.avatar || "/images/avatar/default.png"} // fallback nếu null
                alt="User Avatar"
              />

              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>ID:</strong> {user.id}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {user.email}
                </li>
                <li className="list-group-item">
                  <strong>FullName:</strong> {user.fullName}
                </li>
                <li className="list-group-item">
                  <strong>Address:</strong> {user.address}
                </li>
                <li className="list-group-item">
                  <strong>Phone:</strong> {user.phone}
                </li>
                {/* ✅ Thêm role */}
                <li className="list-group-item">
                  <strong>Role:</strong>{" "}
                  <span
                    className={`badge ${
                      user.role.name === "ADMIN"
                        ? "bg-danger"
                        : user.role.name === "MENTOR"
                          ? "bg-warning"
                          : "bg-secondary"
                    }`}
                  >
                    {user.role.name}
                  </span>
                </li>
                {/* ✅ Thêm trạng thái */}
                <li className="list-group-item">
                  <strong>Active:</strong>{" "}
                  <span
                    className={`badge ${user.active ? "bg-success" : "bg-danger"}`}
                  >
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </li>
              </ul>
            </div>

            <Link to="/admin/user" className="btn btn-success mt-3">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
