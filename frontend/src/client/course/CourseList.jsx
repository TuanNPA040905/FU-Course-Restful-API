import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CourseList.css";
import axiosInstance from "../../utils/axiosConfig";
import { toast } from "react-toastify";

const PAGE_SIZE = 7;

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);

      try {
        const res = await axiosInstance.get(
          `/api/v1/client/courses?page=${currentPage}&size=${PAGE_SIZE}`,
        );

        const meta = res.data.data.meta;
        const result = res.data.data.result || [];

        setCourses(result);
        setTotalPages(meta.pages);
        setTotalElements(meta.total);
      } catch (err) {
        console.error("Lỗi tải khóa học:", err);
        setError("Không thể tải khóa học. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [currentPage]);

  const formatPrice = (price) => new Intl.NumberFormat("vi-VN").format(price);

  const handleAddToCart = async (e, courseId) => {
    e.preventDefault();
    e.stopPropagation();

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

  const goTo = (page) => {
    if (page < 0 || page >= totalPages) return;

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const buildPageNums = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    const pages = [];

    const start = Math.max(0, Math.min(currentPage - 2, totalPages - 5));

    const end = Math.min(totalPages - 1, start + 4);

    if (start > 0) {
      pages.push(0, "...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...", totalPages - 1);
    }

    return pages;
  };

  if (loading)
    return (
      <div className="cl-page">
        <div className="cl-state-center">
          <div className="cl-spinner" />
          <p>Đang tải khóa học...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="cl-page">
        <div className="cl-state-center cl-state-error">
          <i className="fas fa-exclamation-circle" />
          <p>{error}</p>
        </div>
      </div>
    );

  return (
    <div className="cl-page">
      <div className="cl-page-inner">
        {/* HERO */}
        <div className="cl-hero">
          <div className="cl-hero-badge">
            <i className="fas fa-graduation-cap" />
            Học viện FPTU
          </div>

          <h1 className="cl-hero-title">
            Khám phá <em>khóa học</em>
            <br />
            dành cho bạn
          </h1>

          <p className="cl-hero-sub">
            Tìm kiếm và lọc khóa học phù hợp với mục tiêu của bạn
          </p>
        </div>

        <div className="cl-layout">
          {/* FILTER */}
          <aside className="cl-sidebar">
            <div className="cl-filter">
              <div className="cl-filter-head">
                <i className="fas fa-sliders-h" />
                <span>Bộ lọc</span>
              </div>

              <div className="cl-filter-section">
                <div className="cl-filter-label">Danh mục</div>

                {["Kĩ thuật phần mềm", "Toán cao cấp", "Ngôn ngữ"].map(
                  (cat) => (
                    <label className="cl-check" key={cat}>
                      <input type="checkbox" />
                      <span>{cat}</span>
                    </label>
                  ),
                )}
              </div>

              <div className="cl-filter-divider" />

              <div className="cl-filter-section">
                <div className="cl-filter-label">Giá</div>

                <label className="cl-check">
                  <input type="checkbox" />
                  <span>Miễn phí</span>
                </label>
              </div>

              <div className="cl-filter-divider" />

              <div className="cl-filter-section">
                <div className="cl-filter-label">Trình độ</div>

                {["Nền tảng", "Chuyên sâu"].map((lvl) => (
                  <label className="cl-check" key={lvl}>
                    <input type="checkbox" />
                    <span>{lvl}</span>
                  </label>
                ))}
              </div>

              <button className="cl-filter-btn">
                <i className="fas fa-search" />
                Lọc kết quả
              </button>
            </div>
          </aside>

          {/* COURSE LIST */}
          <main>
            {totalElements > 0 && (
              <div className="cl-results-info">
                Hiển thị <strong>{currentPage * PAGE_SIZE + 1}</strong>
                {" – "}
                <strong>
                  {Math.min((currentPage + 1) * PAGE_SIZE, totalElements)}
                </strong>{" "}
                trong <strong>{totalElements}</strong> khóa học
              </div>
            )}

            <div className="cl-list">
              {courses.length > 0 ? (
                courses.map((course, index) => (
                  <Link
                    to={`/courses/${course.id}`}
                    className="cl-card-link"
                    key={course.id}
                    style={{
                      animationDelay: `${index * 0.06}s`,
                    }}
                  >
                    <article className="cl-card">
                      <div className="cl-card-img">
                        <img
                          src={
                            course.image ||
                            `https://placehold.co/210x168/0d1828/63b3ed?text=${encodeURIComponent(
                              course.shortName || course.title,
                            )}`
                          }
                          alt={course.title}
                          loading="lazy"
                        />
                      </div>

                      <div className="cl-card-info">
                        <span className="cl-card-tag">Khóa học</span>

                        <h2 className="cl-card-title">{course.title}</h2>

                        <p className="cl-card-code">{course.shortName}</p>

                        <p className="cl-card-desc">{course.description}</p>

                        <div className="cl-card-rating">
                          <i className="fas fa-star" />
                          <strong>4.9</strong>
                          <span>(120 đánh giá)</span>
                        </div>
                      </div>

                      <div
                        className="cl-card-price"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {course.price === 0 ? (
                          <span className="cl-price-free">Miễn phí</span>
                        ) : (
                          <div className="cl-price-amount">
                            <span className="cl-price-num">
                              {formatPrice(course.price)}
                            </span>

                            <span className="cl-price-unit">VNĐ</span>
                          </div>
                        )}

                        <button
                          className="cl-btn-cart"
                          title="Thêm vào giỏ"
                          onClick={(e) => handleAddToCart(e, course.id)}
                        >
                          <i className="fas fa-cart-plus" />
                        </button>
                      </div>
                    </article>
                  </Link>
                ))
              ) : (
                <div className="cl-empty">
                  <i className="fas fa-graduation-cap" />
                  <p>Không tìm thấy khóa học nào.</p>
                </div>
              )}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="cl-pagination">
                <button
                  className="cl-pg-btn cl-pg-arrow"
                  onClick={() => goTo(currentPage - 1)}
                  disabled={currentPage === 0}
                  title="Trang trước"
                >
                  <i className="fas fa-chevron-left" />
                </button>

                {buildPageNums().map((p, i) =>
                  p === "..." ? (
                    <span className="cl-pg-dots" key={`dots-${i}`}>
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      className={`cl-pg-btn${
                        p === currentPage ? " cl-pg-active" : ""
                      }`}
                      onClick={() => goTo(p)}
                    >
                      {p + 1}
                    </button>
                  ),
                )}

                <button
                  className="cl-pg-btn cl-pg-arrow"
                  onClick={() => goTo(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  title="Trang sau"
                >
                  <i className="fas fa-chevron-right" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
