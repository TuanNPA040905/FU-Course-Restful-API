import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./PaymentResult.css";

const PaymentResult = () => {
  // Lấy các tham số từ URL do VNPay trả về
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    // VNPay thường trả về vnp_ResponseCode = '00' là thành công
    const responseCode = searchParams.get("vnp_ResponseCode");
    const amountStr = searchParams.get("vnp_Amount");

    // Gán dữ liệu vào state để hiển thị
    setPaymentStatus({
      success: responseCode === "00",
      orderId: searchParams.get("vnp_TxnRef") || "N/A",
      // Số tiền VNPay trả về thường nhân 100, nên cần chia lại cho 100
      amount: amountStr ? parseInt(amountStr) / 100 : 0,
      transactionNo: searchParams.get("vnp_TransactionNo") || "N/A",
      message:
        responseCode === "00"
          ? "Cảm ơn bạn đã mua khóa học. Các khóa học đã được thêm vào tài khoản của bạn."
          : "Giao dịch không thành công hoặc đã bị hủy. Vui lòng thử lại.",
    });
  }, [searchParams]);

  // Nếu chưa load xong params thì có thể render loading (Tùy chọn)
  if (!paymentStatus)
    return <div className="payment-result-wrapper">Đang xử lý...</div>;

  return (
    <div className="payment-result-wrapper">
      <div className="result-container">
        {paymentStatus.success ? (
          /* ✅ TRẠNG THÁI THÀNH CÔNG */
          <>
            <div className="result-icon success">
              <i className="fas fa-check-circle"></i>
            </div>

            <h1 className="result-title success">Thanh Toán Thành Công!</h1>

            <p className="result-message">{paymentStatus.message}</p>

            <div className="order-info">
              <div className="order-info-row">
                <span className="order-info-label">
                  <i className="fas fa-hashtag"></i> Mã đơn hàng
                </span>
                <span className="order-info-value">
                  #{paymentStatus.orderId}
                </span>
              </div>

              <div className="order-info-row">
                <span className="order-info-label">
                  <i className="fas fa-money-bill-wave"></i> Số tiền
                </span>
                <span className="order-info-value highlight">
                  {paymentStatus.amount.toLocaleString("vi-VN")} đ
                </span>
              </div>

              <div className="order-info-row">
                <span className="order-info-label">
                  <i className="fas fa-receipt"></i> Mã giao dịch VNPay
                </span>
                <span className="order-info-value">
                  {paymentStatus.transactionNo}
                </span>
              </div>
            </div>

            <div>
              <Link to="/my-course" className="btn-action">
                <i
                  className="fas fa-book-open"
                  style={{ marginRight: "8px" }}
                ></i>
                Đến khóa học của tôi
              </Link>
              <Link to="/courses" className="btn-action btn-secondary">
                <i
                  className="fas fa-shopping-bag"
                  style={{ marginRight: "8px" }}
                ></i>
                Tiếp tục mua sắm
              </Link>
            </div>
          </>
        ) : (
          /* TRẠNG THÁI THẤT BẠI */
          <>
            <div className="result-icon error">
              <i className="fas fa-times-circle"></i>
            </div>

            <h1 className="result-title error">Thanh Toán Thất Bại!</h1>

            <p className="result-message">{paymentStatus.message}</p>

            <div>
              <Link to="/checkout" className="btn-action">
                <i className="fas fa-redo" style={{ marginRight: "8px" }}></i>
                Thử lại
              </Link>
              <Link to="/" className="btn-action btn-secondary">
                <i className="fas fa-home" style={{ marginRight: "8px" }}></i>
                Về trang chủ
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentResult;
