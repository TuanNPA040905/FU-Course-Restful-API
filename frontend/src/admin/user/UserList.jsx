import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../utils/axiosConfig";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Thêm hàm này
  const handleSearch = () => {
    fetchUsers(searchTerm);
  };

  useEffect(() => {
    const fetchUsers = async (name = "") => {
      try {
        const response = await axiosInstance.get("/api/v1/admin/users", {
          params: { name: name || undefined },
        });
        setUsers(response.data.data.result); // Lấy từ result
      } catch (error) {
        console.error("Lỗi tải danh sách user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Sẽ gọi lại API nếu thêm searchTerm vào mảng dependency này

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
        <div className="col-12 mx-auto">
          <div className="d-flex justify-content-between mb-3">
            <h3>Table users</h3>
            <Link to="/admin/user/create" className="btn btn-primary">
              Create a user
            </Link>
          </div>

          <div className="search-filters-section mb-4 d-flex gap-3">
            <div className="search-wrapper flex-grow-1 position-relative">
              <i className="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
              <input
                type="text"
                className="form-control ps-5"
                placeholder="Search by email or fullName"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={handleSearch}
              className="btn btn-light border d-flex align-items-center gap-2"
            >
              <i className="fas fa-filter"></i> Tìm kiếm
            </button>
          </div>

          <hr />

          {loading ? (
            <div>Loading...</div>
          ) : (
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Full Name</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.fullName}</td>
                    <td>
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
                    </td>
                    <td className="d-flex gap-2">
                      <Link
                        to={`/admin/user/${user.id}`}
                        className="btn btn-success btn-sm"
                      >
                        View
                      </Link>
                      <Link
                        to={`/admin/user/update/${user.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Update
                      </Link>
                      <Link
                        to={`/admin/user/delete/${user.id}`}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
