import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const CourseDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL

  // State lưu thông tin khóa học. (Thực tế bạn sẽ gọi API fetch data dựa vào id này)
  const [course, setCourse] = useState(null);

  // Giả lập việc gọi API để lấy dữ liệu chi tiết
  useEffect(() => {
    // Fake data - Tưởng tượng đây là dữ liệu trả về từ Node.js
    const fetchedCourse = {
      id: id,
      title: "C01",
      short_describe: "ReactJS Basic",
      price: 1500000,
      image: "default-course.jpg", // Tên ảnh
    };
    setCourse(fetchedCourse);
  }, [id]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN").format(price) + " đ";

  if (!course) return <div className="p-4">Loading...</div>;

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Products</h1>
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
            <h3>Product detail with id = {id}</h3>
            <hr />

            <div className="card" style={{ width: "60%" }}>
              {/* Lưu ý đường dẫn ảnh trong React thường lấy từ public folder hoặc import trực tiếp */}
              <img
                className="card-img-top"
                style={{ width: "250px", padding: "15px" }}
                src={`/images/course/${course.image}`}
                alt="Course avatar"
              />

              <div className="card-header bg-light fw-bold">
                Course information
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>ID:</strong> {course.id}
                </li>
                <li className="list-group-item">
                  <strong>Code:</strong> {course.title}
                </li>
                <li className="list-group-item">
                  <strong>Title:</strong> {course.short_describe}
                </li>
                <li className="list-group-item">
                  <strong>Price:</strong> {formatPrice(course.price)}
                </li>
              </ul>
            </div>

            <Link to="/admin/course" className="btn btn-success mt-3">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
