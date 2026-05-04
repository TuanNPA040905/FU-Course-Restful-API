import React, { useState, useEffect } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  // Giả lập gọi API lấy dữ liệu lịch sử đơn hàng
  useEffect(() => {
    setOrders([
      { id: 101, date: "2026-05-01", total: 1500000, status: "PAID" },
    ]);
  }, []);

  return (
    <div className="order-history-container">
      <h2>Lịch sử đơn hàng</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Ngày đặt</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.total.toLocaleString()} đ</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
