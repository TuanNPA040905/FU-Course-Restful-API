import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../utils/axiosConfig";

const UserDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      // Tùy theo chuẩn REST của bạn, có thể là DELETE hoặc POST
      // await axios.delete(`http://localhost:8080/api/admin/users/${id}`);

      await axiosInstance.delete(`/api/v1/users/${id}`);
      alert("Xóa người dùng thành công!");
      navigate("/admin/user");
    } catch (error) {
      alert("Lỗi khi xóa người dùng!");
      console.error(error);
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
        <li className="breadcrumb-item active">Delete</li>
      </ol>

      <div className="mt-5 row">
        <div className="col-md-6 mx-auto">
          <div className="d-flex justify-content-between mb-3">
            <h3>Delete the user with id = {id}</h3>
          </div>
          <hr />

          <div className="alert alert-danger">
            Are you sure to delete this user? This action cannot be undone!
          </div>

          <form onSubmit={handleDelete}>
            <button type="submit" className="btn btn-danger me-2">
              Confirm Delete
            </button>
            <Link to="/admin/user" className="btn btn-secondary">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDelete;
