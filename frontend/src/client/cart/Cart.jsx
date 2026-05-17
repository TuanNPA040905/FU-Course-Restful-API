import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();

  const [cartDetails, setCartDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart từ API
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/cart");

      console.log("CART DATA:", response.data);

      setCartDetails(response.data.data || []);
    } catch (error) {
      console.error("Lỗi lấy cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // Tổng số khóa học
  const count = cartDetails.length;

  // Tổng tiền
  const totalPrice = cartDetails.reduce((sum, item) => sum + item.price, 0);

  // Xóa khóa học khỏi cart
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa khóa học này?");

    if (!confirmDelete) return;

    try {
      // API delete sau này
      // await axiosInstance.delete(`/api/v1/cart/${id}`);

      // Fake delete frontend
      setCartDetails((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Checkout
  const handleCheckout = () => {
    navigate("/check-out");
  };

  if (loading) {
    return (
      <div
        className="container"
        style={{
          marginTop: "120px",
          textAlign: "center",
          color: "white",
        }}
      >
        <h3>Đang tải giỏ hàng...</h3>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header */}
      <div className="page-header" style={{ marginTop: "100px" }}>
        <h1>🛒 Giỏ Hàng</h1>
        <p>Danh sách khóa học bạn muốn mua</p>
      </div>

      {/* Breadcrumb */}
      <div style={{ marginBottom: "30px" }}>
        <nav className="breadcrumb">
          <Link to="/">
            <i className="fas fa-home"></i> Trang chủ
          </Link>
          <span>/</span>
          <span className="active">Giỏ hàng</span>
        </nav>
      </div>

      {/* Empty cart */}
      {cartDetails.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <i className="fas fa-shopping-cart"></i>
          </div>

          <h2>Giỏ hàng đang trống</h2>

          <p>Hãy thêm các khóa học yêu thích vào giỏ hàng</p>

          <Link to="/courses" className="btn-explore">
            <i className="fas fa-compass"></i> Khám phá khóa học
          </Link>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ color: "white" }}>Sản phẩm</th>

                  <th style={{ color: "white" }}>Tên khóa học</th>

                  <th style={{ color: "white" }}>Giá</th>

                  <th style={{ color: "white" }}>Xử lý</th>
                </tr>
              </thead>

              <tbody>
                {cartDetails.map((cartDetail) => (
                  <tr key={cartDetail.id}>
                    {/* IMAGE */}
                    <td className="info-buy">
                      <Link
                        to={`/courses/${cartDetail.course.id}`}
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
                    </td>

                    {/* TITLE */}
                    <td>
                      <p className="mb-0 mt-4 course_detail">
                        <Link
                          to={`/courses/${cartDetail.course.id}`}
                          target="_blank"
                          style={{
                            color: "white",
                            textDecoration: "none",
                          }}
                        >
                          {cartDetail.course.title}
                          {" - "}
                          {cartDetail.course.shortName}
                        </Link>
                      </p>
                    </td>

                    {/* PRICE */}
                    <td>
                      <p
                        className="mb-0 mt-4"
                        style={{
                          color: "#4CAF50",
                          fontSize: "large",
                          fontWeight: "bold",
                        }}
                      >
                        {cartDetail.price.toLocaleString("vi-VN")} đ
                      </p>
                    </td>

                    {/* DELETE */}
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

          {/* Payment Section */}
          <div className="payment-section">
            <div className="payment-container">
              <div className="payment-card">
                {/* Header */}
                <div className="payment-header">
                  <h2>💳 Thông Tin Thanh Toán</h2>
                </div>

                {/* Info */}
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

                {/* Checkout */}
                <button className="btn-payment" onClick={handleCheckout}>
                  <i className="fas fa-credit-card"></i>
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
