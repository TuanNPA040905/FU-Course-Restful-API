import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";

const CourseUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Load dữ liệu cũ
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/admin/courses/${id}`);
        const json = response.data;

        if (json.statusCode === 200) {
          const course = json.data;
          setFormData({
            title: course.title || "",
            shortName: course.shortName || "",
            description: course.description || "",
            price: course.price || 0,
            semester: course.semester || 1,
            active: course.active ?? true,
          });
          if (course.image) setImagePreview(course.image);
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

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
      await axiosInstance.put(`/api/v1/courses/${id}`, multipartData);
      alert("Cập nhật khóa học thành công!");
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

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error) return <div className="alert alert-danger m-4">{error}</div>;

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
        <li className="breadcrumb-item active">Update</li>
      </ol>

      <div className="mt-5 row">
        <div className="col-md-8 mx-auto">
          <h3>Update course — ID: {id}</h3>
          <hr />

          <form onSubmit={handleSubmit} className="row g-3">
            {/* TITLE */}
            <div className="col-md-6">
              <label className="form-label">Title:</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* SHORT NAME */}
            <div className="col-md-6">
              <label className="form-label">Short Name:</label>
              <input
                type="text"
                className="form-control"
                name="shortName"
                value={formData.shortName}
                onChange={handleChange}
              />
            </div>

            {/* DESCRIPTION */}
            <div className="col-12">
              <label className="form-label">Description:</label>
              <textarea
                className="form-control"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* PRICE */}
            <div className="col-md-6">
              <label className="form-label">Price (0 = Miễn phí):</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min={0}
              />
            </div>

            {/* SEMESTER */}
            <div className="col-md-3">
              <label className="form-label">Semester:</label>
              <select
                className="form-select"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
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
              <label className="form-label">Image:</label>
              <input
                className="form-control"
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleImageChange}
              />
            </div>

            {/* IMAGE PREVIEW */}
            {imagePreview && (
              <div className="col-12">
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxHeight: "200px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            {/* BUTTONS */}
            <div className="col-12 mt-4 mb-5">
              <button
                type="submit"
                className="btn btn-warning px-4 text-white"
                disabled={submitting}
              >
                {submitting ? "Đang cập nhật..." : "Update Course"}
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

export default CourseUpdate;
