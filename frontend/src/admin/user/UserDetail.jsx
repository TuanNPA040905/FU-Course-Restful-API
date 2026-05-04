import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        // Tương lai: const response = await axios.get(`http://localhost:8080/api/admin/users/${id}`);

        // --- MOCK DATA ---
        setUser({
          id: id,
          email: "admin@test.com",
          fullName: "System Admin",
          address: "Hà Nội, Việt Nam",
          phone: "0123456789",
          avatar: "default-avatar.jpg",
        });
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

              {/* Giả định ảnh được lưu trong thư mục public/images/avatar/ của React */}
              <img
                className="card-img-top"
                style={{ width: "250px", padding: "15px" }}
                src={`/images/avatar/${user.avatar}`}
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
