import React from "react";
import "./Cart.css"; // File CSS riêng để style

const Cart = () => {
  // Dữ liệu giả lập
  const cartItems = [
    { id: 1, title: "ReactJS Thực Chiến", price: 1500000 },
    { id: 2, title: "Spring Boot Căn Bản", price: 0 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-container">
      <h2>Giỏ hàng của bạn</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <span>{item.title}</span>
                <span>{item.price.toLocaleString()} đ</span>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <strong>Tổng cộng: {total.toLocaleString()} đ</strong>
          </div>
          <a href="/checkout" className="btn-checkout">
            Xác nhận thanh toán
          </a>
        </>
      )}
    </div>
  );
};

export default Cart;
