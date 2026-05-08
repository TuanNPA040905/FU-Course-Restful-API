import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";

const CourseDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      await axiosInstance.delete(`/api/v1/courses/${id}`);
      alert("Xóa khóa học thành công!");
      navigate("/admin/course");
    } catch (error) {
      if (error.response?.status === 400) {
        alert(error.response.data.message);
      } else {
        console.error(error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Manage Courses</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item">
          <Link to="/admin">Dashboard</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/admin/course">Course</Link>
        </li>
        <li className="breadcrumb-item active">Delete</li>
      </ol>

      <div className="mt-5 row">
        <div className="col-md-6 mx-auto">
          <h3>Delete course with id = {id}</h3>
          <hr />

          <div className="alert alert-danger">
            Are you sure you want to delete this course? This action cannot be
            undone!
          </div>

          <form onSubmit={handleDelete}>
            <button
              type="submit"
              className="btn btn-danger me-2"
              disabled={submitting}
            >
              {submitting ? "Đang xóa..." : "Confirm Delete"}
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
