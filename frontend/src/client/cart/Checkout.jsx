import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  // Mock dữ liệu giỏ hàng. Thực tế bạn sẽ lấy từ Redux, Context hoặc gọi API backend
  const [cartDetails] = useState([
    {
      id: 1,
      price: 1500000,
      course: {
        id: 101,
        title: "ReactJS Thực Chiến",
        price: 1500000,
        image: "https://via.placeholder.com/80",
      },
    },
  ]);

  const totalPrice = cartDetails.reduce((sum, item) => sum + item.price, 0);

  // Xử lý khi click thanh toán VNPay
  const handlePayment = async () => {
    try {
      // 1. Gọi API backend của bạn để tạo phiên thanh toán VNPay
      // const response = await axios.post('/api/vnpay/create-payment', { amount: totalPrice });

      // 2. Lấy URL VNPay trả về từ backend
      // const vnpayUrl = response.data.paymentUrl;

      // 3. Redirect user sang trang của VNPay
      // window.location.href = vnpayUrl;

      alert("Đang chuyển hướng sang cổng thanh toán VNPay...");
    } catch (error) {
      console.error("Lỗi tạo thanh toán:", error);
    }
  };

  return (
    <div className="checkout-dark-wrapper">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>🛒 Xác Nhận Đơn Hàng</h1>
          <p>Kiểm tra lại thông tin trước khi thanh toán</p>
        </div>

        {/* Breadcrumb */}
        <div style={{ marginBottom: "30px" }}>
          <nav className="breadcrumb">
            <Link to="/">
              <i className="fas fa-home"></i> Trang chủ
            </Link>
            <span>/</span>
            <Link to="/cart">Giỏ hàng</Link>
            <span>/</span>
            <span className="active">Xác nhận đơn hàng</span>
          </nav>
        </div>

        {cartDetails.length === 0 ? (
          /* Empty State */
          <div className="empty-state">
            <div className="empty-state-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <h3>Giỏ hàng trống</h3>
            <p>Bạn chưa có khóa học nào trong giỏ hàng</p>
            <Link to="/courses" className="btn-back">
              <i className="fas fa-arrow-left"></i> Quay lại khóa học
            </Link>
          </div>
        ) : (
          /* Order Details */
          <>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Khóa học</th>
                    <th scope="col">Tên khóa học</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {cartDetails.map((cartDetail) => (
                    <tr key={cartDetail.id}>
                      <td>
                        <img
                          src={cartDetail.course.image}
                          className="course-image"
                          alt={cartDetail.course.title}
                        />
                      </td>
                      <td>
                        <Link
                          to={`/course/${cartDetail.course.id}`}
                          target="_blank"
                          className="course-title"
                        >
                          {cartDetail.course.title}
                        </Link>
                      </td>
                      <td>
                        <span className="price-text">
                          {cartDetail.course.price.toLocaleString("vi-VN")} đ
                        </span>
                      </td>
                      <td>
                        <span className="price-text">
                          {cartDetail.price.toLocaleString("vi-VN")} đ
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Section */}
            <div className="summary-section">
              <div className="summary-card">
                <div className="summary-header">
                  <h3>💳 Tổng Thanh Toán</h3>
                </div>

                <div className="summary-total">
                  <div className="total-label">Tổng cộng:</div>
                  <div className="total-value">
                    {totalPrice.toLocaleString("vi-VN")} đ
                  </div>
                </div>

                {/* Nút thanh toán xử lý bằng JavaScript thay vì <form> HTML cũ */}
                <button onClick={handlePayment} className="btn-confirm">
                  <i
                    className="fas fa-check-circle"
                    style={{ marginRight: "8px" }}
                  ></i>
                  Xác nhận thanh toán
                </button>

                <div className="security-note">
                  <p>
                    <i className="fas fa-shield-alt"></i>
                    Giao dịch được bảo mật và mã hóa. Thông tin của bạn được bảo
                    vệ an toàn.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
