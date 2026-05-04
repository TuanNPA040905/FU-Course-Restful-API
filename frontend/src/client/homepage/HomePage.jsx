import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [hotCourses, setHotCourses] = useState([]);
  const [freeCourses, setFreeCourses] = useState([]);

  useEffect(() => {
    // Mock Data: Chờ kết nối Spring Boot
    setHotCourses([
      {
        id: 1,
        title: "Lập trình ReactJS Thực Chiến",
        describe_details:
          "Học ReactJS từ cơ bản đến nâng cao xây dựng ứng dụng thực tế.",
        price: 1500000,
        image: "https://via.placeholder.com/400x250?text=ReactJS",
      },
      {
        id: 2,
        title: "Spring Boot cho người mới bắt đầu",
        describe_details: "Làm chủ Backend API với Java Spring Boot.",
        price: 2000000,
        image: "https://via.placeholder.com/400x250?text=Spring+Boot",
      },
      {
        id: 3,
        title: "Làm chủ Cấu trúc dữ liệu & Giải thuật",
        describe_details: "Vượt qua mọi bài phỏng vấn thuật toán dễ dàng.",
        price: 990000,
        image: "https://via.placeholder.com/400x250?text=DSA",
      },
      {
        id: 4,
        title: "Tiếng Anh IT",
        describe_details:
          "Tiếng Anh chuyên ngành dành riêng cho lập trình viên.",
        price: 500000,
        image: "https://via.placeholder.com/400x250?text=English+IT",
      },
    ]);

    setFreeCourses([
      {
        id: 5,
        title: "Nhập môn Lập trình C",
        describe_details: "Khóa học nền tảng bắt buộc cho mọi Developer.",
        price: 0,
        image: "https://via.placeholder.com/400x250?text=C+Programming",
      },
      {
        id: 6,
        title: "HTML & CSS Cơ bản",
        describe_details: "Tự tay cắt HTML giao diện website cực đẹp.",
        price: 0,
        image: "https://via.placeholder.com/400x250?text=HTML+CSS",
      },
    ]);
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN").format(price) + "đ";

  return (
    <div className="client-home-wrapper">
      {/* Background glow blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      {/* ── CAROUSEL ── */}
      <div className="carousel-section">
        <div className="carousel-wrapper-custom">
          <div className="carousel-inner-custom">
            <div
              id="carouselExampleFade"
              className="carousel slide carousel-fade"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleFade"
                  data-bs-slide-to="0"
                  className="active"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleFade"
                  data-bs-slide-to="1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleFade"
                  data-bs-slide-to="2"
                ></button>
              </div>
              <div className="carousel-inner">
                {/* Lưu ý: Đổi ảnh ở đây thành ảnh thật trong folder public/images/carosel/ của bạn */}
                <div className="carousel-item active">
                  <img
                    src="https://via.placeholder.com/1200x420/0d1425/ffffff?text=Slide+Banner+1"
                    alt="Slide 1"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://via.placeholder.com/1200x420/1e3a8a/ffffff?text=Slide+Banner+2"
                    alt="Slide 2"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://via.placeholder.com/1200x420/164e63/ffffff?text=Slide+Banner+3"
                    alt="Slide 3"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── COURSES SECTION ── */}
      <div className="courses-section">
        <div className="section-container">
          {/* HOT COURSES */}
          <div className="section-header">
            <div>
              <div className="section-badge">
                <span className="dot"></span> Nổi bật
              </div>
              <h2 className="section-title-text">
                Khóa học <em>HOT</em>
              </h2>
            </div>
            <Link to="/courses" className="btn-see-all">
              Xem tất cả <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="row g-4">
            {hotCourses.length > 0 ? (
              hotCourses.map((course) => (
                <div
                  className="col-sm-6 col-md-4 col-lg-3 course-col"
                  key={course.id}
                >
                  <div className="course-card">
                    <div className="course-card-img">
                      <img src={course.image} alt={course.title} />
                      <div className="course-card-img-overlay"></div>
                      <span className="course-price-tag">
                        {formatPrice(course.price)}
                      </span>
                    </div>
                    <div className="course-card-body">
                      <Link
                        to={`/course/${course.id}`}
                        className="text-decoration-none"
                      >
                        <div className="course-card-title">{course.title}</div>
                      </Link>
                      <p className="course-card-desc">
                        {course.describe_details}
                      </p>
                    </div>
                    <div className="course-card-footer">
                      <button className="btn-add-cart">
                        <i className="fa fa-shopping-bag"></i> Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <i className="fas fa-graduation-cap"></i>
                <p>Chưa có khóa học nào</p>
              </div>
            )}
          </div>

          {/* DIVIDER */}
          <div className="section-divider"></div>

          {/* FREE COURSES */}
          <div className="section-header">
            <div>
              <div className="section-badge free">
                <span className="dot"></span> Miễn phí
              </div>
              <h2 className="section-title-text">
                Khóa học <em style={{ color: "#6ee7b7" }}>miễn phí</em>
              </h2>
            </div>
          </div>

          <div className="row g-4">
            {freeCourses.length > 0 ? (
              freeCourses.map((course) => (
                <div
                  className="col-sm-6 col-md-4 col-lg-3 course-col"
                  key={course.id}
                >
                  <div className="course-card">
                    <div className="course-card-img">
                      <img src={course.image} alt={course.title} />
                      <div className="course-card-img-overlay"></div>
                      <span className="free-badge">Miễn phí</span>
                      <span className="course-price-tag free-tag">0đ</span>
                    </div>
                    <div className="course-card-body">
                      <Link
                        to={`/course/${course.id}`}
                        className="text-decoration-none"
                      >
                        <div className="course-card-title">{course.title}</div>
                      </Link>
                      <p className="course-card-desc">
                        {course.describe_details}
                      </p>
                    </div>
                    <div className="course-card-footer">
                      <button
                        className="btn-add-cart"
                        style={{
                          borderColor: "rgba(110,231,183,0.3)",
                          color: "#6ee7b7",
                          background: "rgba(110,231,183,0.06)",
                        }}
                      >
                        <i className="fa fa-shopping-bag"></i> Đăng ký ngay
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <i className="fas fa-gift"></i>
                <p>Chưa có khóa học miễn phí</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
