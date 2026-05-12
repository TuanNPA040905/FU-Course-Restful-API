import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();

  // Dữ liệu giả lập (thay thế cho biến ${cartDetails} từ JSP)
  // Bạn sẽ thay thế bằng state gọi từ API backend sau này
  const [cartDetails, setCartDetails] = useState([
    {
      id: 1,
      course: {
        id: 101,
        title: "ReactJS Thực Chiến",
        short_describe: "Khóa học từ cơ bản đến nâng cao",
        price: 1500000,
        image: "https://via.placeholder.com/100", // Link ảnh tạm
      },
    },
    {
      id: 2,
      course: {
        id: 102,
        title: "Spring Boot Căn Bản",
        short_describe: "Xây dựng backend mạnh mẽ với Java",
        price: 1200000,
        image: "https://via.placeholder.com/100",
      },
    },
  ]);

  // Các biến tính toán (thay thế cho ${count} và ${totalPrice})
  const count = cartDetails.length;
  const totalPrice = cartDetails.reduce(
    (sum, item) => sum + item.course.price,
    0,
  );

  // Xử lý xóa khóa học
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa khóa học này?")) {
      // Logic xóa: Lọc ra các item khác với id bị xóa
      setCartDetails(cartDetails.filter((item) => item.id !== id));
      // Sau này bạn sẽ gọi API ở đây: axios.delete(`/api/favorite-course/${id}`)
    }
  };

  // Xử lý chuyển hướng đến trang thanh toán
  const handleCheckout = () => {
    navigate("/check-out");
  };

  return (
    <div className="container">
      {/* Page Header */}
      <div className="page-header" style={{ marginTop: "100px" }}>
        <h1>💖 Khóa Học Yêu Thích</h1>
        <p>Danh sách các khóa học bạn quan tâm</p>
      </div>

      {/* Breadcrumb */}
      <div style={{ marginBottom: "30px" }}>
        <nav className="breadcrumb">
          <Link to="/">
            <i className="fas fa-home"></i> Trang chủ
          </Link>
          <span>/</span>
          <span className="active">Khóa học quan tâm</span>
        </nav>
      </div>

      {/* Hiển thị Empty State nếu giỏ hàng trống */}
      {cartDetails.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <i className="fas fa-heart-broken"></i>
          </div>
          <h2>Chưa có khóa học yêu thích</h2>
          <p>
            Hãy khám phá và thêm các khóa học bạn quan tâm vào danh sách này
          </p>
          <Link to="/courses" className="btn-explore">
            <i className="fas fa-compass"></i> Khám phá khóa học
          </Link>
        </div>
      ) : (
        /* Hiển thị Bảng khóa học nếu có dữ liệu */
        <>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" style={{ color: "white" }}>
                    Sản phẩm
                  </th>
                  <th scope="col" style={{ color: "white" }}>
                    Tên
                  </th>
                  <th scope="col" style={{ color: "white" }}>
                    Giá cả
                  </th>
                  <th scope="col" style={{ color: "white" }}>
                    Xử lý
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartDetails.map((cartDetail) => (
                  <tr key={cartDetail.id}>
                    <th scope="row" className="info-buy">
                      <Link
                        to={`/course/${cartDetail.course.id}`}
                        target="_blank"
                      >
                        <img
                          src={cartDetail.course.image}
                          alt={cartDetail.course.title}
                          className="img-fluid me-5 rounded-circle"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      </Link>
                    </th>
                    <td>
                      <p className="mb-0 mt-4 course_detail">
                        <Link
                          to={`/course/${cartDetail.course.id}`}
                          target="_blank"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          {cartDetail.course.title} -{" "}
                          {cartDetail.course.short_describe}
                        </Link>
                      </p>
                    </td>
                    <td>
                      <p
                        className="mb-0 mt-4"
                        style={{ color: "#4CAF50", fontSize: "large" }}
                      >
                        {cartDetail.course.price.toLocaleString("vi-VN")} đ
                      </p>
                    </td>
                    <td>
                      <button
                        className="btn btn-md rounded-circle bg-light border mt-4"
                        onClick={() => handleDelete(cartDetail.id)}
                      >
                        <i className="fa fa-times text-danger"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Phần Payment Summary */}
          <div className="payment-section">
            <div className="payment-container">
              <div className="payment-card">
                {/* Header */}
                <div className="payment-header">
                  <h2>💳 Thông Tin Thanh Toán</h2>
                </div>

                {/* Payment Info */}
                <div className="payment-info">
                  <div className="info-row">
                    <span className="info-label">
                      <i className="fas fa-book"></i>
                      Tổng số khóa học
                    </span>
                    <span className="info-value">{count}</span>
                  </div>

                  <div className="info-row">
                    <span className="info-label">
                      <i className="fas fa-tag"></i>
                      Tổng giá trị
                    </span>
                    <span className="info-value highlight">
                      {totalPrice.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="payment-total">
                  <div className="total-row">
                    <span className="total-label">Tổng thanh toán:</span>
                    <span className="total-value">
                      {totalPrice.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="btn-payment" onClick={handleCheckout}>
                  <i className="fas fa-shopping-cart"></i>
                  Xác nhận thanh toán
                </button>

                {/* Note */}
                <div className="payment-note">
                  <p>
                    <i className="fas fa-info-circle"></i>
                    Bạn sẽ được chuyển đến trang thanh toán để hoàn tất đơn hàng
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
