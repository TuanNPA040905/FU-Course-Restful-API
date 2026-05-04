import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const CourseDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.preventDefault();
    // Chỗ này bạn sẽ gọi API axios.post(`/api/admin/course/delete/${id}`)
    console.log("Đã xóa khóa học có ID:", id);
    alert("Xóa thành công!");
    navigate("/admin/course"); // Xóa xong thì quay về trang danh sách
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Products</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item">
          <Link to="/admin">Dashboard</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/admin/course">Product</Link>
        </li>
        <li className="breadcrumb-item active">Delete</li>
      </ol>

      <div className="mt-5 row">
        <div className="col-md-6 mx-auto">
          <div className="d-flex justify-content-between mb-3">
            <h3>Delete the product with id = {id}</h3>
          </div>
          <hr />

          <div className="alert alert-danger">
            Are you sure to delete this product? This action cannot be undone!
          </div>

          <form onSubmit={handleDelete}>
            <button type="submit" className="btn btn-danger me-2">
              Confirm Delete
            </button>
            <Link to="/admin/course" className="btn btn-secondary">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseDelete;
