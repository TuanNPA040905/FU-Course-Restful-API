import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import axiosInstance from "../../utils/axiosConfig";
import { toast } from "react-toastify";

const HomePage = () => {
  const [hotCourses, setHotCourses] = useState([]);
  const [freeCourses, setFreeCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/home");

        setHotCourses(res.data.data.hotCourse);
        setFreeCourses(res.data.data.freeCourse);
      } catch (err) {
        console.error("Lỗi tải khóa học:", err);
        setError("Không thể tải khóa học. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN").format(price) + "đ";

  const handleAddToCart = async (courseId) => {
    try {
      const res = await axiosInstance.post(
        `/api/v1/add-course-to-cart/${courseId}`,
      );

      toast.success(res.data);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data || "Có lỗi xảy ra vui lòng thử lại");
    }
  };

  if (loading)
    return (
      <div className="empty-state">
        <i className="fas fa-spinner fa-spin"></i>
        <p>Đang tải...</p>
      </div>
    );

  if (error)
    return (
      <div className="empty-state">
        <i className="fas fa-exclamation-circle"></i>
        <p>{error}</p>
      </div>
    );

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
                <div className="carousel-item active">
                  <img
                    src="https://res.cloudinary.com/dep1nnstf/image/upload/v1778231569/Carosel2_ihkxjz.jpg"
                    alt="Slide 1"
                  />
                </div>

                <div className="carousel-item">
                  <img
                    src="https://res.cloudinary.com/dep1nnstf/image/upload/v1778231569/Carosel1_fpgsth.jpg"
                    alt="Slide 2"
                  />
                </div>

                <div className="carousel-item">
                  <img
                    src="https://res.cloudinary.com/dep1nnstf/image/upload/v1778231569/Carosel3_ncbhog.jpg"
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
                      <img
                        src={
                          course.image ||
                          `https://placehold.co/400x250?text=${encodeURIComponent(
                            course.shortName || course.title,
                          )}`
                        }
                        alt={course.title}
                      />

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

                      <p className="course-card-desc">{course.description}</p>
                    </div>

                    <div className="course-card-footer">
                      <button
                        className="btn-add-cart"
                        onClick={() => handleAddToCart(course.id)}
                      >
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
                      <img
                        src={
                          course.image ||
                          `https://via.placeholder.com/400x250?text=${encodeURIComponent(
                            course.shortName || course.title,
                          )}`
                        }
                        alt={course.title}
                      />

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

                      <p className="course-card-desc">{course.description}</p>
                    </div>

                    <div className="course-card-footer">
                      <button
                        className="btn-add-cart"
                        onClick={() => handleAddToCart(course.id)}
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
