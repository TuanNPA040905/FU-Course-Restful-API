import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./order.css"; // Import file CSS chứa các class như stat-card, status-badge...

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pending: 0,
    paid: 0,
    cancelled: 0,
    failed: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  // State quản lý Modal cập nhật trạng thái
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  // Mô phỏng việc gọi API lấy danh sách đơn hàng
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Thay URL này bằng endpoint Spring Boot của bạn (vd: /api/admin/orders)
        // const response = await axios.get('/api/admin/orders');

        // --- DỮ LIỆU MẪU (MOCK DATA) ---
        setStats({
          totalOrders: 150,
          pending: 20,
          paid: 110,
          cancelled: 15,
          failed: 5,
        });
        setOrders([
          {
            id: 1,
            user: { email: "nguyenvana@gmail.com", fullName: "Nguyễn Văn A" },
            orderDate: "2023-10-15 14:30:00",
            status: "PAID",
            total_price: 3500000,
          },
          {
            id: 2,
            user: { email: "tranb@gmail.com", fullName: "Trần Thị B" },
            orderDate: "2023-10-16 09:15:00",
            status: "PENDING",
            total_price: 1500000,
          },
        ]);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };
    fetchOrders();
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN").format(price) + " đ";

  // Hàm mở modal và set dữ liệu
  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(""); // Reset dropdown
    setShowModal(true);
  };

  // Hàm submit cập nhật trạng thái lên Spring Boot
  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      // Gọi API cập nhật:
      // await axios.put(`/api/admin/orders/${selectedOrder.id}/status`, { status: newStatus });

      alert(`Đã cập nhật đơn hàng #${selectedOrder.id} thành ${newStatus}`);
      setShowModal(false);
      // Gọi lại fetchOrders() ở đây để load lại bảng
    } catch (error) {
      alert("Lỗi khi cập nhật");
    }
  };

  // Helper render badge trạng thái
  const renderStatusBadge = (status) => {
    const statusLower = status.toLowerCase();
    return <span className={`status-badge ${statusLower}`}>{status}</span>;
  };

  return (
    <div className="container-fluid px-4 page-container">
      <div className="page-header">
        <h1 className="page-title">Order Management</h1>
        <p className="page-subtitle">Manage and track all customer orders</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="stats-grid">
        <div className="stat-card active">
          <div className="stat-number">{stats.totalOrders}</div>
          <div className="stat-label">All Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.paid}</div>
          <div className="stat-label">Paid</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.cancelled}</div>
          <div className="stat-label">Cancelled</div>
        </div>
      </div>

      {/* Search Section */}
      <div className="search-filters-section">
        <div className="search-wrapper">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Search by order number, customer name, or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="filter-btn">
          <i className="fas fa-filter"></i> Tìm kiếm
        </button>
      </div>

      {/* Table Section */}
      <div className="mt-5">
        <div className="table-container p-3">
          <h3>Table Orders</h3>
          <hr />
          <div className="table-wrapper">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Order Date</th>
                  <th>Status</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="order-id">#{order.id}</td>
                    <td>
                      <div className="customer-name">{order.user.fullName}</div>
                      <div className="customer-email">{order.user.email}</div>
                    </td>
                    <td className="order-date">{order.orderDate}</td>
                    <td>{renderStatusBadge(order.status)}</td>
                    <td className="order-total">
                      {formatPrice(order.total_price)}
                    </td>
                    <td className="actions-cell">
                      <Link
                        to={`/admin/order/${order.id}`}
                        className="btn btn-success btn-sm"
                      >
                        View
                      </Link>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleOpenModal(order)}
                      >
                        <i className="fas fa-edit"></i> Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Update Status (Chuyển từ Bootstrap JS sang React Conditional Rendering) */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: "12px" }}>
              <div
                className="modal-header"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                }}
              >
                <h5 className="modal-title">
                  <i className="fas fa-edit"></i> Update Order Status
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <form onSubmit={handleUpdateStatus}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      <i className="fas fa-hashtag"></i> Order ID:
                    </label>
                    <p className="text-muted">#{selectedOrder?.id}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      <i className="fas fa-info-circle"></i> Current Status:
                    </label>
                    <div>
                      {selectedOrder
                        ? renderStatusBadge(selectedOrder.status)
                        : "-"}
                    </div>
                  </div>
                  <hr />
                  <div className="mb-0">
                    <label className="form-label fw-bold">
                      <i className="fas fa-sync-alt"></i> New Status{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      required
                    >
                      <option value="">-- Select New Status --</option>
                      <option value="PENDING">Pending</option>
                      <option value="PAID">Paid</option>
                      <option value="CANCELLED">Cancelled</option>
                      <option value="FAILED">Failed</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
