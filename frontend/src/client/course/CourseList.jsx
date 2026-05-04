import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CourseList.css";

const CourseList = () => {
  // Giả lập dữ liệu khóa học (Giống project cũ của bạn)
  const [courses] = useState([
    {
      id: 1,
      title: "Lập trình ReactJS Thực Chiến",
      short_describe: "Nắm vững React trong 4 tuần",
      describe_details:
        "Khóa học từ cơ bản đến nâng cao, xây dựng project thực tế.",
      price: 1500000,
      image: "https://via.placeholder.com/300x200?text=ReactJS",
    },
    {
      id: 2,
      title: "Spring Boot Căn Bản",
      short_describe: "Backend Java mạnh mẽ",
      describe_details: "Tạo RESTful API chuẩn doanh nghiệp với Spring Boot 3.",
      price: 0,
      image: "https://via.placeholder.com/300x200?text=Spring+Boot",
    },
    {
      id: 3,
      title: "Toán Cao Cấp Rời Rạc",
      short_describe: "Nền tảng cho lập trình",
      describe_details:
        "Vượt qua môn toán FPTU dễ dàng với phương pháp giải hay.",
      price: 500000,
      image: "https://via.placeholder.com/300x200?text=Math",
    },
  ]);

  const formatPrice = (price) => new Intl.NumberFormat("vi-VN").format(price);

  const handleAddToCart = (e, courseId) => {
    e.preventDefault(); // Ngăn việc chuyển trang khi bấm nút giỏ hàng
    e.stopPropagation();
    alert(`Đã thêm khóa học ID ${courseId} vào giỏ hàng!`);
  };

  return (
    <div className="course-list-page">
      <div className="page-hero">
        <div className="page-hero-eyebrow">
          <i className="fas fa-graduation-cap"></i> Học viện FPTU
        </div>
        <h1>
          Khám phá <span>khóa học</span>
          <br />
          dành cho bạn
        </h1>
        <p>Tìm kiếm và lọc khóa học phù hợp với mục tiêu của bạn</p>
      </div>

      <div className="layout-grid">
        {/* BỘ LỌC TÌM KIẾM */}
        <aside>
          <div className="filter-panel">
            <div className="filter-panel-header">
              <i className="fas fa-sliders-h"></i> <span>Bộ lọc</span>
            </div>

            <div className="filter-group">
              <div className="filter-group-label">
                <i className="fas fa-circle"></i> Danh mục
              </div>
              <div className="filter-check">
                <input type="checkbox" id="cat-se" />
                <label htmlFor="cat-se">Kĩ thuật phần mềm</label>
              </div>
              <div className="filter-check">
                <input type="checkbox" id="cat-math" />
                <label htmlFor="cat-math">Toán cao cấp</label>
              </div>
              <div className="filter-check">
                <input type="checkbox" id="cat-lang" />
                <label htmlFor="cat-lang">Ngôn ngữ</label>
              </div>
            </div>

            <div className="filter-divider"></div>

            <div className="filter-group">
              <div className="filter-group-label">
                <i className="fas fa-circle"></i> Giá
              </div>
              <div className="filter-check">
                <input type="checkbox" id="price-free" />
                <label htmlFor="price-free">Miễn phí</label>
              </div>
            </div>

            <div className="filter-divider"></div>

            <div className="filter-group">
              <div className="filter-group-label">
                <i className="fas fa-circle"></i> Trình độ
              </div>
              <div className="filter-check">
                <input type="checkbox" id="lvl-basic" />
                <label htmlFor="lvl-basic">Nền tảng</label>
              </div>
              <div className="filter-check">
                <input type="checkbox" id="lvl-adv" />
                <label htmlFor="lvl-adv">Chuyên sâu</label>
              </div>
            </div>

            <button className="btn-filter-custom">
              <i className="fas fa-search"></i> Lọc kết quả
            </button>
          </div>
        </aside>

        {/* DANH SÁCH KHÓA HỌC */}
        <main>
          <div className="course-list">
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <Link
                  to={`/course/${course.id}`}
                  className="course-card-link"
                  key={course.id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="course-card">
                    <div className="card-img-col">
                      <img src={course.image} alt={course.title} />
                    </div>
                    <div className="card-info-col">
                      <div>
                        <span className="card-tag">Khóa học</span>
                        <div className="card-title-text mt-1">
                          {course.title}
                        </div>
                        <div className="card-short-desc mt-1">
                          {course.short_describe}
                        </div>
                        <p className="card-desc mt-2">
                          {course.describe_details}
                        </p>
                      </div>
                      <div className="card-rating">
                        <i className="fas fa-star"></i>
                        <span>4.9</span>
                        <span className="reviews">(120 đánh giá)</span>
                      </div>
                    </div>

                    <div
                      className="card-price-col"
                      onClick={(e) => e.preventDefault()}
                    >
                      {course.price === 0 ? (
                        <span className="price-free">Miễn phí</span>
                      ) : (
                        <div className="price-amount">
                          {formatPrice(course.price)}
                          <span className="currency">VNĐ</span>
                        </div>
                      )}

                      <button
                        className="btn-add-cart-list"
                        title="Thêm vào giỏ"
                        onClick={(e) => handleAddToCart(e, course.id)}
                      >
                        <i className="fas fa-cart-plus"></i>
                      </button>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center text-muted mt-5">
                Không tìm thấy khóa học nào.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseList;
