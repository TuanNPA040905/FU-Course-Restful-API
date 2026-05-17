import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./CourseDetail.css";
import axiosInstance from "../../utils/axiosConfig";
import { toast } from "react-toastify";

const CourseDetail = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const fetchCourseDetail = async () => {
      setLoading(true);

      try {
        const res = await axiosInstance.get(`/api/v1/client/courses/${id}`);

        setCourse(res.data.data);
      } catch (err) {
        console.error("Lỗi fetch chi tiết:", err);

        setError(err.response?.data || "Không thể tải thông tin khóa học");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();

    window.scrollTo(0, 0);
  }, [id]);

  const formatPrice = (price) => new Intl.NumberFormat("vi-VN").format(price);

  const handleAddToCart = async (courseId) => {
    try {
      const res = await axiosInstance.post(
        `/api/v1/add-course-to-cart/${courseId}`,
      );

      toast.success(res.data.data.message);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.data?.message ||
          error.response?.data?.message ||
          "Có lỗi xảy ra",
      );
    }
  };

  if (loading)
    return (
      <div className="cd-spinner-wrap">
        <div className="cd-spin-ring"></div>
      </div>
    );

  if (error || !course)
    return (
      <div className="cd-state-error">
        <i className="fas fa-exclamation-triangle"></i>

        <p>{error || "Không tìm thấy khóa học"}</p>

        <Link to="/courses" className="cd-btn-back">
          Quay lại danh sách
        </Link>
      </div>
    );

  return (
    <div className="cd-page">
      {/* Background Blobs */}
      <div className="cd-blob cd-blob-1"></div>
      <div className="cd-blob cd-blob-2"></div>

      {/* HERO / BREADCRUMB */}
      <div className="cd-hero">
        <div className="cd-hero-inner">
          <nav className="cd-breadcrumb">
            <Link to="/">
              <i className="fas fa-home"></i> Trang chủ
            </Link>

            <span>/</span>

            <Link to="/courses">Khóa học</Link>

            <span>/</span>

            <span className="active">Chi tiết</span>
          </nav>
        </div>
      </div>

      <div className="cd-grid">
        {/* MAIN */}
        <main className="cd-main-card">
          <div className="cd-top-section">
            <div className="cd-img-wrap">
              <img
                src={course.image || "/images/course/default.jpg"}
                alt={course.title}
              />
            </div>

            <div className="cd-quick-info">
              <span className="cd-tag">
                <i className="fas fa-graduation-cap"></i> Khóa học
              </span>

              <h1 className="cd-title">{course.title}</h1>

              <p className="cd-short-desc">{course.short_describe}</p>

              <div className="cd-rating-row">
                <span className="cd-stars">★★★★½</span>
                <span className="cd-score">4.9</span>
                <span className="cd-count">(120 đánh giá)</span>
              </div>

              <div className="cd-price-row">
                {course.price === 0 ? (
                  <span className="cd-price-free">Miễn phí</span>
                ) : (
                  <>
                    <span className="cd-price-main">
                      {formatPrice(course.price)}
                    </span>

                    <span className="cd-price-currency">VNĐ</span>
                  </>
                )}
              </div>

              <div className="cd-features">
                <div className="cd-feature-pill">
                  <i className="fas fa-clock"></i> 14 giờ học
                </div>

                <div className="cd-feature-pill">
                  <i className="fas fa-video"></i> 15+ video
                </div>

                <div className="cd-feature-pill">
                  <i className="fas fa-certificate"></i> Chứng chỉ
                </div>

                <div className="cd-feature-pill">
                  <i className="fas fa-infinity"></i> Trọn đời
                </div>
              </div>

              <button
                className="btn-add-cart"
                onClick={() => handleAddToCart(course.id)}
              >
                <i className="fas fa-shopping-cart"></i> Thêm vào giỏ hàng
              </button>
            </div>
          </div>

          {/* TABS */}
          <div className="cd-tabs-wrap">
            <div className="cd-tab-nav">
              {[
                {
                  id: "description",
                  label: "Mô tả",
                  icon: "info-circle",
                },
                {
                  id: "curriculum",
                  label: "Nội dung",
                  icon: "list-ul",
                },
                {
                  id: "reviews",
                  label: "Đánh giá",
                  icon: "star",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`cd-tab-btn ${
                    activeTab === tab.id ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <i className={`fas fa-${tab.icon}`}></i> {tab.label}
                </button>
              ))}
            </div>

            <div className="cd-tab-content">
              {activeTab === "description" && (
                <div className="cd-pane active">
                  <h4 className="cd-tab-title">Về khóa học này</h4>

                  <div className="cd-tab-text">
                    <p>{course.describe_details}</p>

                    <p>
                      Khóa học được thiết kế để giúp bạn nắm vững kiến thức cơ
                      bản và nâng cao với phương pháp thực tế.
                    </p>
                  </div>

                  <div className="cd-mentor-card">
                    <img
                      className="cd-mentor-avatar"
                      src="/images/avatar/mentor.jpg"
                      alt="Mentor"
                    />

                    <div className="cd-mentor-info">
                      <div className="name">Thầy ChungLV</div>

                      <div className="role">Giảng viên chính · FPTU</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "curriculum" && (
                <div className="cd-pane active">
                  <h4 className="cd-tab-title">Nội dung chi tiết</h4>

                  <p className="cd-tab-text">
                    Thông tin nội dung khóa học sẽ được cập nhật sớm.
                  </p>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="cd-pane active">
                  <h4 className="cd-tab-title">Đánh giá từ học viên</h4>

                  <p className="cd-tab-text">
                    Chưa có đánh giá nào cho khóa học này.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* SIDEBAR */}
        <aside className="cd-sidebar">
          <div className="cd-sidebar-card">
            <div className="cd-sidebar-header">
              <i className="fas fa-layer-group"></i>
              <span>Các kỳ học</span>
            </div>

            <ul className="cd-sem-list">
              {[
                "Kỳ 1 — Nền tảng",
                "Kỳ 2 — Trung cấp",
                "Kỳ 3 — Nâng cao",
                "Kỳ 4 — Chuyên sâu",
                "Kỳ 5 — Dự án thực tế",
              ].map((sem, idx) => (
                <li key={idx} className="cd-sem-item">
                  <a href="#!">
                    <div className="cd-sem-left">
                      <div className="cd-sem-icon">
                        <i className="fas fa-graduation-cap"></i>
                      </div>

                      {sem}
                    </div>

                    <span className="cd-sem-count">5</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseDetail;
