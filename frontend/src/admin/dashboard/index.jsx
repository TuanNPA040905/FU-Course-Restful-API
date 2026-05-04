import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css"; // Nhúng file CSS vừa tạo

const Dashboard = () => {
  // Dữ liệu giả lập y hệt trong ảnh của bạn
  const topCourses = [
    { id: 1, code: "HSF302", sales: 5, revenue: "$4.999.995" },
    { id: 2, code: "CSI106", sales: 5, revenue: "$995.000" },
    { id: 3, code: "PRJ302", sales: 4, revenue: "$3.996.000" },
    { id: 4, code: "DBI201", sales: 4, revenue: "$2.796.000" },
    { id: 5, code: "LAB211 - TuanVM", sales: 3, revenue: "$2.097.000" },
  ];

  return (
    <div
      className="container-fluid px-4 mb-5"
      style={{
        backgroundColor: "#f8f9fc",
        minHeight: "100vh",
        paddingBottom: "30px",
      }}
    >
      {/* Tiêu đề trang */}
      <div className="pt-4 mb-4">
        <h2
          className="fw-bold text-dark mb-1"
          style={{ letterSpacing: "-0.5px" }}
        >
          Admin Dashboard
        </h2>
        <p className="text-muted">Overview of your platform's performance</p>
      </div>

      {/* 4 Thẻ Thống kê */}
      <div className="row g-4 mb-4">
        {/* Users */}
        <div className="col-xl-3 col-md-6">
          <div className="dashboard-card h-100">
            <div className="d-flex justify-content-between align-items-start">
              <div className="icon-wrapper icon-blue">
                <i className="fas fa-users"></i>
              </div>
              <span className="trend-badge trend-up">
                <i className="fas fa-arrow-up"></i> 8.5%
              </span>
            </div>
            <h3 className="stat-number">14</h3>
            <p className="stat-label">Total Users</p>
            <Link to="/admin/user" className="stat-link text-primary">
              View Details &rarr;
            </Link>
          </div>
        </div>

        {/* Courses */}
        <div className="col-xl-3 col-md-6">
          <div className="dashboard-card h-100">
            <div className="d-flex justify-content-between align-items-start">
              <div className="icon-wrapper icon-purple">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <span className="trend-badge trend-down">
                <i className="fas fa-arrow-down"></i> 5.2%
              </span>
            </div>
            <h3 className="stat-number">26</h3>
            <p className="stat-label">Total Courses</p>
            <Link
              to="/admin/course"
              className="stat-link"
              style={{ color: "#b154ec" }}
            >
              View Details &rarr;
            </Link>
          </div>
        </div>

        {/* Orders */}
        <div className="col-xl-3 col-md-6">
          <div className="dashboard-card h-100">
            <div className="d-flex justify-content-between align-items-start">
              <div className="icon-wrapper icon-green">
                <i className="fas fa-shopping-cart"></i>
              </div>
              <span className="trend-badge trend-up">
                <i className="fas fa-arrow-up"></i> 12.3%
              </span>
            </div>
            <h3 className="stat-number">21</h3>
            <p className="stat-label">Total Orders</p>
            <Link to="/admin/order" className="stat-link text-success">
              View Details &rarr;
            </Link>
          </div>
        </div>

        {/* Revenue */}
        <div className="col-xl-3 col-md-6">
          <div className="dashboard-card h-100">
            <div className="d-flex justify-content-between align-items-start">
              <div className="icon-wrapper icon-yellow">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <span className="trend-badge trend-up">
                <i className="fas fa-arrow-up"></i> 6.8%
              </span>
            </div>
            <h3 className="stat-number">22.568.995đ</h3>
            <p className="stat-label">Total Revenue</p>
            <Link to="/admin/order" className="stat-link text-warning">
              View Details &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Bảng Top 5 Khóa học */}
      <div className="dashboard-card mb-4 pt-4">
        <h4 className="fw-bold text-dark mb-1">Top 5 Saled Course</h4>
        <p className="text-muted small mb-4">
          Best performing courses based on number of sales
        </p>
        <div className="top-course-list">
          {topCourses.map((course, index) => (
            <div className="top-course-item" key={course.id}>
              <div className="d-flex align-items-center">
                <div className="rank-circle">{index + 1}</div>
                <div className="course-info">
                  <h6>{course.code}</h6>
                  <small>{course.sales} sales</small>
                </div>
              </div>
              <div className="course-price">{course.revenue}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Khung Biểu đồ (Monthly Trends) */}
      <div className="dashboard-card mb-4 pt-4">
        <h4 className="fw-bold text-dark mb-1">
          Monthly Trends (Last 6 Months)
        </h4>
        <p className="text-muted small mb-4">
          Overview of users, courses, and orders over time
        </p>
        <div
          style={{
            height: "250px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f8f9fc",
            borderRadius: "8px",
            border: "2px dashed #e3e6f0",
          }}
        >
          <span className="text-muted fw-bold">
            <i className="fas fa-chart-line me-2"></i>Khu vực này sau sẽ gắn
            Chart.js vào nhé!
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
