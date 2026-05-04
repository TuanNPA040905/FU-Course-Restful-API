import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./order.css";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        // const response = await axios.get(`/api/admin/orders/${id}`);

        // --- MOCK DATA ---
        setOrder({
          id: id,
          status: "PAID",
          orderDate: "2023-10-15 14:30:00",
          total_price: 3500000,
          user: { fullName: "Nguyễn Văn A", email: "nguyenvana@gmail.com" },
          courses: [
            { id: 1, title: "ReactJS Basic", price: 1500000 },
            { id: 2, title: "NodeJS Advanced", price: 2000000 },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrderDetail();
  }, [id]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN").format(price) + " đ";

  if (!order) return <div className="p-4">Loading...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Order Detail #{order.id}</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/admin">Dashboard</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/admin/order">Orders</Link>
            </li>
            <li className="breadcrumb-item active">Order Detail</li>
          </ol>
        </nav>
      </div>

      <div className="order-detail-container">
        {/* Info Card */}
        <div className="order-info-card">
          <div className="card-header-custom">
            <i className="fas fa-info-circle"></i> Order Information
          </div>
          <div className="info-row">
            <div className="info-label">Order ID:</div>
            <div className="info-value">ORD-{order.id}</div>
          </div>
          <div className="info-row">
            <div className="info-label">Status:</div>
            <div className="info-value">
              <span className={`status-badge ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
          </div>
          <div className="info-row">
            <div className="info-label">Order Date:</div>
            <div className="info-value">{order.orderDate}</div>
          </div>

          {order.user && (
            <>
              <div className="info-row">
                <div className="info-label">Customer:</div>
                <div className="info-value">{order.user.fullName}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Email:</div>
                <div className="info-value">{order.user.email}</div>
              </div>
            </>
          )}
        </div>

        {/* Courses Card */}
        <div className="courses-card">
          <div className="card-header-custom">
            <i className="fas fa-shopping-cart"></i> Ordered Courses
          </div>
          {order.courses && order.courses.length > 0 ? (
            order.courses.map((course, index) => (
              <div className="course-item" key={course.id || index}>
                <div className="course-header">
                  <div className="course-number">{index + 1}</div>
                  <div className="course-title">
                    <i className="fas fa-graduation-cap"></i> {course.title}
                  </div>
                  <div className="course-price">
                    {formatPrice(course.price)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-courses">
              <div className="empty-icon">
                <i className="fas fa-box-open"></i>
              </div>
              <p>No courses in this order</p>
            </div>
          )}
        </div>

        {/* Total Section */}
        <div className="total-section">
          <div className="total-label">
            <i className="fas fa-calculator"></i> Total Amount
          </div>
          <div className="total-amount">{formatPrice(order.total_price)}</div>
        </div>

        {/* Actions */}
        <div className="action-buttons">
          <Link to="/admin/order" className="btn-custom btn-back">
            <i className="fas fa-arrow-left"></i> Back to Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
