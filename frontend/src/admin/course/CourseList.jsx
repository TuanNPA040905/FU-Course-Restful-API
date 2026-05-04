import React, { useState } from "react";
import { Link } from "react-router-dom";

const CourseList = () => {
  // Dữ liệu mẫu (mock data) thay thế cho ${courses} từ backend
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "C01",
      short_describe: "ReactJS Basic",
      describe_details: "Learn React from scratch",
      price: 1500000,
      active: 1,
    },
    {
      id: 2,
      title: "C02",
      short_describe: "NodeJS",
      describe_details: "Backend with Express",
      price: 2000000,
      active: 1,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  // Hàm format tiền tệ giống thẻ <fmt:formatNumber>
  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN").format(price) + " đ";

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Manage Products</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item">
          <Link to="/admin">Dashboard</Link>
        </li>
        <li className="breadcrumb-item active">Course</li>
      </ol>

      <div className="mt-5">
        <div className="row">
          <div className="col-12 mx-auto">
            <div className="d-flex justify-content-between mb-3">
              <h3>Table Products</h3>
              {/* Nút Create trỏ sang component CourseCreate */}
              <Link to="/admin/course/create" className="btn btn-primary">
                Create a Product
              </Link>
            </div>

            {/* Thanh tìm kiếm */}
            <div className="search-filters-section mb-4 d-flex gap-3">
              <div className="search-wrapper flex-grow-1 position-relative">
                <i className="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Search by course title or short_describe"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="btn btn-light border d-flex align-items-center gap-2">
                <i className="fas fa-filter"></i> Tìm kiếm
              </button>
            </div>

            <hr />

            {/* Bảng dữ liệu */}
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th width="5%">ID</th>
                  <th width="10%">Code</th>
                  <th width="20%">Title</th>
                  <th width="35%">Description</th>
                  <th width="10%">Price</th>
                  <th width="5%">Active</th>
                  <th width="15%">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.id}</td>
                    <td>{course.title}</td>
                    <td>{course.short_describe}</td>
                    <td>{course.describe_details}</td>
                    <td>{formatPrice(course.price)}</td>
                    <td>{course.active === 1 ? "ON" : "OFF"}</td>
                    <td className="d-flex gap-2">
                      <Link
                        to={`/admin/course/${course.id}`}
                        className="btn btn-success btn-sm"
                      >
                        View
                      </Link>
                      <Link
                        to={`/admin/course/update/${course.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Update
                      </Link>
                      <Link
                        to={`/admin/course/delete/${course.id}`}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Phân trang (Giao diện mẫu) */}
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <button className="page-link">&laquo;</button>
                </li>
                <li className="page-item active">
                  <button className="page-link">1</button>
                </li>
                <li className="page-item">
                  <button className="page-link">2</button>
                </li>
                <li className="page-item">
                  <button className="page-link">&raquo;</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
