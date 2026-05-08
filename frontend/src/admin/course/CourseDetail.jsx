import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/courses/${id}`);
        const json = response.data;

        if (json.statusCode === 200) {
          setCourse(json.data);
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

  const formatPrice = (price) => {
    if (price === 0 || price === 0.0) return "Miễn phí";
    return new Intl.NumberFormat("vi-VN").format(price) + " đ";
  };

  const formatDate = (isoString) => {
    if (!isoString) return "—";
    return new Date(isoString).toLocaleDateString("vi-VN");
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

  if (!course) return null;

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Courses</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item">
          <Link to="/admin">Dashboard</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/admin/course">Course</Link>
        </li>
        <li className="breadcrumb-item active">View detail</li>
      </ol>

      <div className="container mt-5">
        <div className="row">
          <div className="col-12 mx-auto">
            <h3>Course detail — ID: {id}</h3>
            <hr />

            <div className="card" style={{ width: "60%" }}>
              {course.image ? (
                <img
                  className="card-img-top"
                  style={{
                    width: "250px",
                    padding: "15px",
                    objectFit: "cover",
                  }}
                  src={course.image}
                  alt={course.title}
                />
              ) : (
                <div className="p-3 text-muted">Không có ảnh</div>
              )}

              <div className="card-header bg-light fw-bold">
                Course information
              </div>

              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>ID:</strong> {course.id}
                </li>
                <li className="list-group-item">
                  <strong>Title:</strong> {course.title}
                </li>
                <li className="list-group-item">
                  <strong>Short Name:</strong> {course.shortName || "—"}
                </li>
                <li className="list-group-item">
                  <strong>Description:</strong> {course.description || "—"}
                </li>
                <li className="list-group-item">
                  <strong>Price:</strong> {formatPrice(course.price)}
                </li>
                <li className="list-group-item">
                  <strong>Semester:</strong> {course.semester}
                </li>
                <li className="list-group-item">
                  <strong>Active:</strong>{" "}
                  {course.active ? (
                    <span className="badge bg-success">ON</span>
                  ) : (
                    <span className="badge bg-secondary">OFF</span>
                  )}
                </li>
                <li className="list-group-item">
                  <strong>Created At:</strong> {formatDate(course.createdAt)}
                </li>
                <li className="list-group-item">
                  <strong>Created By:</strong> {course.createdBy || "—"}
                </li>
                <li className="list-group-item">
                  <strong>Updated At:</strong> {formatDate(course.updatedAt)}
                </li>
                <li className="list-group-item">
                  <strong>Updated By:</strong> {course.updatedBy || "—"}
                </li>
              </ul>
            </div>

            <div className="d-flex gap-2 mt-3">
              <Link to="/admin/course" className="btn btn-secondary">
                Back
              </Link>
              <Link
                to={`/admin/course/update/${id}`}
                className="btn btn-warning"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
