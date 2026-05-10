import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";

const CourseCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    shortName: "",
    description: "",
    price: 0,
    semester: 1,
    active: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const multipartData = new FormData();

    const courseData = {
      title: formData.title,
      shortName: formData.shortName,
      description: formData.description,
      price: Number(formData.price),
      semester: Number(formData.semester),
      active: formData.active,
    };

    multipartData.append(
      "data",
      new Blob([JSON.stringify(courseData)], { type: "application/json" }),
    );

    if (imageFile) {
      multipartData.append("image", imageFile);
    }

    try {
      await axiosInstance.post("/api/v1/admin/courses", multipartData);
      alert("Tạo khóa học thành công!");
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
        <li className="breadcrumb-item active">Create</li>
      </ol>

      <div className="mt-5 row">
        <div className="col-md-8 col-12 mx-auto">
          <h3>Create a Course</h3>
          <hr />

          <form
            onSubmit={handleSubmit}
            className="row g-3"
            encType="multipart/form-data"
          >
            {/* TITLE */}
            <div className="col-md-6">
              <label className="form-label">Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                required
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>

            {/* SHORT NAME */}
            <div className="col-md-6">
              <label className="form-label">Short Name:</label>
              <input
                type="text"
                name="shortName"
                value={formData.shortName}
                onChange={handleChange}
                className={`form-control ${errors.shortName ? "is-invalid" : ""}`}
              />
              {errors.shortName && (
                <div className="invalid-feedback">{errors.shortName}</div>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="col-12">
              <label className="form-label">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                rows={4}
              />
            </div>

            {/* PRICE */}
            <div className="col-md-6">
              <label className="form-label">Price (0 = Miễn phí):</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-control"
                min={0}
              />
            </div>

            {/* SEMESTER */}
            <div className="col-md-3">
              <label className="form-label">Semester:</label>
              <input
                type="number"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="form-control"
                min={1}
              />
            </div>

            {/* ACTIVE */}
            <div className="col-md-3 d-flex align-items-end">
              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  name="active"
                  id="active"
                  checked={formData.active}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label htmlFor="active" className="form-check-label">
                  Active
                </label>
              </div>
            </div>

            {/* IMAGE */}
            <div className="col-md-6">
              <label htmlFor="imageFile" className="form-label">
                Image:
              </label>
              <input
                type="file"
                id="imageFile"
                name="imageFile"
                accept=".png, .jpg, .jpeg"
                onChange={handleImageChange}
                className="form-control"
              />
            </div>

            {/* IMAGE PREVIEW */}
            {imagePreview && (
              <div className="col-12">
                <img
                  src={imagePreview}
                  alt="image preview"
                  style={{
                    maxHeight: "200px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            {/* BUTTONS */}
            <div className="col-12 mb-5 mt-4">
              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={submitting}
              >
                {submitting ? "Đang tạo..." : "Create"}
              </button>
              <Link to="/admin/course" className="btn btn-secondary ms-2">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseCreate;
